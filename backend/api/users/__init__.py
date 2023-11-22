from database import User
from flask import Blueprint

users = Blueprint("users", __name__)


# TODO: return with team name
@users.route("/users", methods=["GET"])
def get_users():
    return list(User.find({"username": {"$ne": "admin"}}, {"_id": 0, "password": 0, "role": 0}))
