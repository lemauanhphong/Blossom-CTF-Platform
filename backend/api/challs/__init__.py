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
