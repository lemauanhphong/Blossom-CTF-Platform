from database import User
from flask import Blueprint, request, session

profile = Blueprint("profile", __name__, url_prefix="/profile")

# TODO: return rank


@profile.route("/", methods=["GET"])
def get_profile():
    username = request.args.get("username")
    if not username:
        if "username" not in session:
            return {"msg": "Please login first"}, 401

        username = session["username"]

    if user := User.find_one({"username": username}, {"_id": 0, "password": 0, "role": 0}):
        return user

    return {"msg": "User not found"}, 404
