import bcrypt
from database import User
from flask import Blueprint, request, session
from pymongo.errors import DuplicateKeyError

from .helpers import is_strong_password, require_login

auth = Blueprint("auth", __name__)


# TODO: reset password send gmail


@auth.route("/register", methods=["POST"])
def register():
    username = request.get_json().get("username")
    password = request.get_json().get("password")

    if not is_strong_password(password):
        return {"msg": "Password complexity requirements not met"}, 422

    try:
        User.insert_one(
            {
                "username": username,
                "password": bcrypt.hashpw(password.encode(), bcrypt.gensalt()),
                "role": "user",
                "rank": 0,
                "solves": 0,
                "score": 0,
                "totaltime": 0,
            }
        )
    except DuplicateKeyError:
        return {"msg": "Username already exists"}, 409

    return {"msg": "Registered"}


@auth.route("/login", methods=["POST"])
def login():
    username = request.get_json().get("username")
    password = request.get_json().get("password")

    if user := User.find_one({"username": username}):
        if bcrypt.checkpw(password.encode(), user["password"]):
            session["uid"] = user["_id"]
            session["role"] = user["role"]
            return {"msg": "Logged in", "role": user["role"]}

    return {"msg": "Wrong username or password"}, 401


@auth.route("/logout", methods=["GET"])
def logout():
    session.clear()
    return {"msg": "Logged out"}


@auth.route("/change_password", methods=["POST"])
@require_login
def change_password():
    password = request.get_json().get("password")
    new_password = request.get_json().get("new_password")

    if not is_strong_password(new_password):
        return {"msg": "Password complexity requirements not met"}, 422

    if not bcrypt.checkpw(password.encode(), User.find_one({"_id": session["uid"]})["password"]):
        return {"msg": "Wrong password"}, 403

    User.update_one(
        {"_id": session["uid"]},
        {"$set": {"password": bcrypt.hashpw(new_password.encode(), bcrypt.gensalt())}},
    )

    return {"msg": "Password changed successfully"}
