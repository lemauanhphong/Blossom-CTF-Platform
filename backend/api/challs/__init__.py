from datetime import datetime

from api.auth.helpers import require_login
from database import Challenge, Log, User
from flask import Blueprint, request, session

challs = Blueprint("challs", __name__)


@challs.route("/challs", methods=["GET"])
@require_login
def get_challs():
    res = []
    for chall in Challenge.find({}, {"_id": 0, "flag": 0}):
        chall["solved"] = User.find_one({"name": session["username", "solved" : chall["name"]]}) != []
        res.append(chall)
    return res


@challs.route("/flag", methods=["POST"])
@require_login
def submit_flag():
    name = request.get_json().get("name")
    flag = request.get_json().get("flag")

    if User.find_one({"username": session["username"], "solved": name}):
        return {"msg": "Already solved"}, 409

    if chall := Challenge.find_one({"name": name}):
        if flag == chall["flag"]:
            User.update_one({"name": session["username"]}, {"$push": {"solved": name}})
            status = "Accepted"
        else:
            status = "Wrong"

        Log.insert_one(
            {
                "username": session["username"],
                "challenge": name,
                "flag": flag,
                "status": status,
                "time": datetime.now(),
            }
        )
        return {"msg": status}, 200 if status == "Accepted" else 422

    else:
        return {"msg": "Challenge not found"}
