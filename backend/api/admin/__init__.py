from base64 import b64decode
from uuid import uuid4

import bson
from bson.errors import InvalidId
from database import Challenge
from flask import Blueprint, request
from pymongo.errors import DuplicateKeyError
from utils import response_id_to_hex

from .helpers import require_admin

admin = Blueprint("admin", __name__, url_prefix="/admin")

MAXIMUM_FILE_SIZE = 50 * 1024 * 1024


@admin.route("/challs", methods=["GET"])
@require_admin
@response_id_to_hex
def get_challs():
    return list(Challenge.find({}, {"files.data": 0}))


@admin.route("/challs", methods=["POST", "PUT"])
@require_admin
def add_update_chall():
    data = request.get_json()

    for field in ["name", "category", "flag", "score"]:
        if not data.get(field):
            return {"msg": f"Missing {field}"}, 400

    try:
        files = []
        for filename, filedata in data.get("files", {}).items():
            f = {"fileid": uuid4().hex, "filename": filename, "data": b64decode(filedata)}
            files.append(f)
    except:
        return {"msg": "Unable to decode file data"}, 400

    # add chall
    if request.method == "POST":
        try:
            Challenge.insert_one(
                {
                    "name": data["name"],
                    "category": data["category"],
                    "content": data.get("content"),
                    "flag": data["flag"],
                    "files": files,
                    "score": data["score"],
                    "solves": 0,
                }
            )
        except DuplicateKeyError:
            return {"msg": "Challenge name already exists"}, 409

        return {"msg": "Challenge added"}

    # TODO: handle file update
    # update chall
    else:
        if not data.get("_id"):
            return {"msg": f"Missing challenge id"}, 400

        try:
            if not Challenge.update_one(
                {"_id": bson.ObjectId(data["_id"])},
                {
                    "$set": {
                        "name": data["name"],
                        "category": data["category"],
                        "content": data.get("content"),
                        "flag": data["flag"],
                        "score": data["score"],
                    },
                    "$push": {"files": files},
                },
            ).modified_count:
                return {"msg": "Challenge not found"}, 404

            Challenge.update_one(
                {"_id": bson.ObjectId(data["_id"])},
                {"$pull": {"files.fileid": {"$in": [request.get_json().get("files_remove")]}}},
            )

        except InvalidId:
            return {"msg": "Invalid challenge id"}, 400

        except DuplicateKeyError:
            return {"msg": "Challenge name already exists"}, 409

        return {"msg": "Challenge updated"}


@admin.route("/challs/<_id>", methods=["DELETE"])
@require_admin
def delete_chall(_id=None):
    try:
        if not Challenge.delete_one({"_id": _id}).deleted_count:
            return {"msg": "Challenge not found"}, 404
    except InvalidId:
        return {"msg": "Invalid challenge id"}, 400

    return {"msg": "Challenge deleted"}
