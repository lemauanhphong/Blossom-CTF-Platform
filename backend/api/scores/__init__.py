from database import User
from flask import Blueprint
from utils import response_id_to_hex

scores = Blueprint("scores", __name__)


# TODO: maintain rank
@scores.route("/scores", methods=["GET"])
@response_id_to_hex
def scoreboard():
    return list(User.find({"role": "user"}, {"username": 1, "score": 1}))
