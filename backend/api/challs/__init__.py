from datetime import datetime

import bson
from api.auth.helpers import require_login
from bson.errors import InvalidId
from database import Challenge, CommonLog, SolvedLog, User
from flask import Blueprint, request, session
from utils import require_contest_running, response_id_to_hex

challs = Blueprint("challs", __name__)


@challs.route("/challs", methods=["GET"])
@require_login
@require_contest_running
@response_id_to_hex
def get_challs():
    res = []
    for chall in Challenge.find({}, {"flag": 0, "files.data": 0}):
        chall["solved"] = bool(SolvedLog.find_one({"uid": session["uid"], "cid": chall["_id"]}))
        chall["solves"] = SolvedLog.count_documents({"cid": chall["_id"]})
        res.append(chall)
    return res


@challs.route("/solves/<cid>", methods=["GET"])
@require_login
@require_contest_running
def get_solves(cid=None):
    try:
        result = []
        for x in SolvedLog.find({"cid": bson.ObjectId(cid)}, {"_id": 0, "uid": 1, "time": 1}):
            result.append(
                {"username": User.find_one({"_id": x["uid"]}, {"username": 1})["username"], "time": x["time"]}
            )
        return result
    except InvalidId:
        return {"msg": "Invalid challenge id"}, 400


@challs.route("/categories", methods=["GET"])
@require_login
def get_categories():
    categories = []
    for name in Challenge.distinct("category"):
        category = {"name": name, "total": Challenge.count_documents({"category": name})}

        if "uid" in session:
            category["solved"] = SolvedLog.count_documents({"uid": session["uid"], "category": name})

        categories.append(category)

    return categories


# maintain total time for ranking
@challs.route("/flag", methods=["POST"])
@require_login
@require_contest_running
def submit_flag():
    _id = request.get_json().get("_id")
    flag = request.get_json().get("flag")

    try:
        _id = bson.ObjectId(_id)
    except InvalidId:
        return {"msg": "Invalid challenge id"}, 400

    if SolvedLog.find_one({"uid": session["uid"], "cid": _id}):
        CommonLog.insert_one(
            {
                "cid": _id,
                "uid": session["uid"],
                "flag": flag,
                "status": "duplicated",
                "time": datetime.now(),
            }
        )
        return {"msg": "Already solved"}, 409

    if chall := Challenge.find_one({"_id": _id}):
        if flag == chall["flag"]:
            SolvedLog.insert_one(
                {
                    "cid": _id,
                    "uid": session["uid"],
                    "category": chall["category"],
                    "time": datetime.now(),
                }
            )
            User.update_one({"_id": session["uid"]}, {"$inc": {"solves": 1, "score": chall["score"]}})

            # update rank
            User.aggregate(
                [
                    {"$setWindowFields": {"sortBy": {"score": -1}, "output": {"rank": {"$denseRank": {}}}}},
                    {"$merge": {"into": "users", "on": "_id", "whenMatched": "replace"}},
                ]
            )

            return {"msg": "Accepted"}

        CommonLog.insert_one(
            {
                "cid": _id,
                "uid": session["uid"],
                "flag": flag,
                "status": "wrong",
                "time": datetime.now(),
            }
        )

        return {"msg": "Wrong"}, 422
    else:
        return {"msg": "Challenge not found"}, 404
