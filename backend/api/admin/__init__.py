import bson
from bson.errors import InvalidId
from database import Challenge
from flask import Blueprint, request
from pymongo.errors import DuplicateKeyError

from .helpers import require_admin

admin = Blueprint("admin", __name__, url_prefix="/admin")

MAXIMUM_FILE_SIZE = 50 * 1024 * 1024


@admin.route("/challs", methods=["GET"])
@require_admin
def get_challs():
    result = []
    for chall in Challenge.find():
        chall["_id"] = str(chall["_id"])
        result.append(chall)
    return result


@admin.route("/challs", methods=["POST", "PUT"])
@require_admin
def add_update_chall():
    data = request.get_json()

    for field in ["name", "category", "flag", "score"]:
        if not data.get(field):
            return {"msg": f"Missing {field}"}, 400

    # TODO: handle file update

    # try:
    #     files = data.get("files", {})
    #     for k, v in files.items():
    #         files[k] = b64decode(v)
    # except:
    #     return {"msg": "Unable to decode file data"}, 400

    # add chall
    if request.method == "POST":
        try:
            Challenge.insert_one(
                {
                    "name": data["name"],
                    "category": data["category"],
                    "content": data.get("content"),
                    "flag": data["flag"],
                    "files": data.get("files"),
                    "score": data["score"],
                    "solves": 0,
                }
            )
        except DuplicateKeyError:
            return {"msg": "Challenge name already exists"}, 409

        return {"msg": "Challenge added"}

    # update chall
    else:
        if not data.get("_id"):
            return {"msg": f"Missing challenge _id"}, 400

        try:
            if not Challenge.update_one(
                {"_id": bson.ObjectId(data["_id"])},
                {
                    "$set": {
                        "name": data["name"],
                        "category": data["category"],
                        "content": data.get("content"),
                        "flag": data["flag"],
                        "files": data.get("files"),
                        "score": data["score"],
                    }
                },
            ).modified_count:
                return {"msg": "Challenge not found"}

        except InvalidId:
            return {"msg": "Invalid challenge _id"}, 400

        except DuplicateKeyError:
            return {"msg": "Challenge name already exists"}, 409

        return {"msg": "Challenge updated"}


@admin.route("/challs", methods=["DELETE"])
@require_admin
def delete_chall():
    if not Challenge.delete_one({"name": request.get_json().get("name")}).deleted_count:
        return {"msg": "Challenge not found"}, 404

    return {"msg": "Challenge deleted"}
