from database import User
from flask import Blueprint

scores = Blueprint("scores", __name__)


# TODO: maintain rank
@scores.route("/scores", methods=["GET"])
def scoreboard():
    return list(User.find({"role": "user"}, {"_id": 0, "username": 1, "score": 1}))
