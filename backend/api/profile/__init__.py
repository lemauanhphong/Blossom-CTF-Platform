import bson
from bson.errors import InvalidId
from database import Challenge, SolvedLog, User
from flask import Blueprint, session
from utils import response_id_to_hex

profile = Blueprint("profile", __name__, url_prefix="/profile")

# TODO: return rank


@profile.route("/", methods=["GET"])
@profile.route("/<uid>", methods=["GET"])
@response_id_to_hex
def get_profile(uid=None):
    if not uid:
        if "uid" not in session:
            return {"msg": "Please login first"}, 401
        uid = session["uid"]
    else:
        try:
            uid = bson.ObjectId(uid)
        except InvalidId:
            return {"msg": "Invalid user id"}, 400

    if user := User.find_one({"_id": uid}, {"password": 0, "role": 0}):
        user["solved"] = []
        for log in SolvedLog.find({"uid": uid}, {"_id": 0, "uid": 0, "username": 0}):
            chall = Challenge.find_one({"_id": log["cid"]}, {"name": 1, "score": 1})
            del log["cid"]

            log["challenge"] = chall["name"]
            log["score"] = chall["score"]

            user["solved"].append(log)

        return user

    return {"msg": "User not found"}, 404
