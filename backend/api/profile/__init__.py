from pprint import pprint

import bson
from database import Challenge, SolvedLog, User
from flask import Blueprint, session
from utils import response_id_to_hex

profile = Blueprint("profile", __name__, url_prefix="/profile")

# TODO: return rank


@profile.route("/", methods=["GET"])
@profile.route("/<_id>", methods=["GET"])
@response_id_to_hex
def get_profile(_id=None):
    if not _id:
        if "_id" not in session:
            return {"msg": "Please login first"}, 401
        _id = session["_id"]

    if user := User.find_one({"_id": bson.ObjectId(_id)}, {"password": 0, "role": 0}):
        user["solved"] = []
        for log in SolvedLog.find({"username": session["username"]}, {"_id": 0, "username": 0}):
            log["score"] = Challenge.find_one({"name": log["challenge"]}, {"score": 1})["score"]
            user["solved"].append(log)
        return user

    return {"msg": "User not found"}, 404
