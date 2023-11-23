from datetime import datetime

from api.auth.helpers import require_login
from database import Challenge, CommonLog, SolvedLog
from flask import Blueprint, request, session

challs = Blueprint("challs", __name__)


@challs.route("/challs", methods=["GET"])
@require_login
def get_challs():
    res = []
    for chall in Challenge.find({}, {"_id": 0, "flag": 0}):
        chall["solved"] = SolvedLog.find_one({"name": session["username"], "challenge": chall["name"]}) != []
        res.append(chall)
    return res


@challs.route("/categories", methods=["GET"])
def get_categories():
    categories = []
    for c in Challenge.distinct("category"):
        categories.append(
            {
                "name": c,
                "total": Challenge.count_documents({"category": c}),
                "solved": SolvedLog.count_documents({"category": c}),
            }
        )
    return categories


@challs.route("/flag", methods=["POST"])
@require_login
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
        return {"msg": "Challenge not found"}
