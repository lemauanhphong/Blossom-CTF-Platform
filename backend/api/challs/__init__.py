from datetime import datetime

from api.auth.helpers import require_login
from database import Challenge, Log, User
from flask import Blueprint, request, session

challs = Blueprint("challs", __name__)


@challs.route("/challs", methods=["GET"])
def get_challs():
    return list(Challenge.find({}, {"_id": 0, "flag": 0}))


@challs.route("/flag", methods=["POST"])
@require_login
def submit_flag():
    name = request.get_json().get("name")
    flag = request.get_json().get("flag")

    return {"msg": ""}

    # TODO: redesign db

    # if chall := Challenge.find_one({"name": name, "flag": flag}):
    #     if Log.find_one({"username": session['username'], 'challenge': name, 'status': 'accepted'}):
    #         Log.insert_one(
    #                 {"username": session["username"], "challenge": name, 'flag': flag, "status": "duplicated", "time": datetime.now()}
    #         )
    #     else:
    #         Challenge.update_one({'_id': chall['_id']})
    #
    #
    #
    #
    #     , {"$inc": {"solves": 1}}):
    #     # TODO: update score based on formular
    #     # TODO: update team score
    #     User.update_one({"username": name}, {"$inc": {"score": chall["score"]}})
    #     Log.insert_one(
    #             {"username": session["username"], "challenge": name, 'flag': flag, "status": "accepted", "time": datetime.now()}
    #     )
    # else:
    #     Log.insert_one(
    #             {"username": session["username"], "challenge": name, 'flag': flag, "status": "wrong", "time": datetime.now()}
    #     )
