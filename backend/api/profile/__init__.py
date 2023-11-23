from api.auth.helpers import require_login
from database import User
from flask import Blueprint, request, session

profile = Blueprint("profile", __name__, url_prefix="/profile")

# TODO: return rank


@profile.route("/", methods=["GET"])
@require_login
def get_current_user_profile():
    return User.find_one({"username": session["username"]}, {"_id": 0, "password": 0, "role": 0})


@profile.route("/", methods=["POST"])
def get_public_profile():
    if user := User.find_one({"username": request.get_json().get("username")}, {"_id": 0, "password": 0, "role": 0}):
        return user

    return {"msg": "User not found"}, 404
