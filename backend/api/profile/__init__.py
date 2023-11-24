from database import User
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

    if user := User.find_one({"_id": _id}, {"password": 0, "role": 0}):
        return user

    return {"msg": "User not found"}, 404
