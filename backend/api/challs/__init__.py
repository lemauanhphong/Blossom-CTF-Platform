from datetime import datetime

from api.auth.helpers import require_login
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
        chall["solved"] = bool(SolvedLog.find_one({"username": session["username"], "challenge": chall["name"]}))
        chall["solves"] = SolvedLog.count_documents({"challenge": chall["name"]})
        res.append(chall)
    return res


@challs.route("/categories", methods=["GET"])
def get_categories():
    categories = []
    for name in Challenge.distinct("category"):
        category = {"name": name, "total": Challenge.count_documents({"category": name})}

        if "username" in session:
            category["solved"] = SolvedLog.count_documents({"username": session["username"], "category": name})

        categories.append(category)

    return categories


@challs.route("/flag", methods=["POST"])
@require_login
@require_contest_running
def submit_flag():
    name = request.get_json().get("name")
    flag = request.get_json().get("flag")

    if SolvedLog.find_one({"username": session["username"], "challenge": name}):
        CommonLog.insert_one(
            {
                "username": session["username"],
                "challenge": name,
                "flag": flag,
                "status": "duplicated",
                "time": datetime.now(),
            }
        )
        return {"msg": "Already solved"}, 409

    if chall := Challenge.find_one({"name": name}):
        if flag == chall["flag"]:
            SolvedLog.insert_one(
                {
                    "username": session["username"],
                    "challenge": name,
                    "category": chall["category"],
                    "time": datetime.now(),
                }
            )
            User.update_one({"_id": session["_id"]}, {"$inc": {"solves": 1, "score": chall["score"]}})
            return {"msg": "Accepted"}

        CommonLog.insert_one(
            {
                "username": session["username"],
                "challenge": name,
                "flag": flag,
                "status": "wrong",
                "time": datetime.now(),
            }
        )

        return {"msg": "Wrong"}, 422
    else:
        return {"msg": "Challenge not found"}, 404
