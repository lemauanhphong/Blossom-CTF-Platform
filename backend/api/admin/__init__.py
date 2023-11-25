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


@admin.route("/challs", methods=["POST", "PATCH"])
@require_admin
def add_update_chall():
    data = request.get_json()

    for field in ["name", "category", "flag", "score"]:
        if not data.get(field):
            return {"msg": f"Missing {field}"}, 400

    try:
        files = []
        for f in data.get("files", []):
            files.append({"fileid": uuid4().hex, "filename": f.get("filename"), "data": b64decode(f.get("data"))})
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

    # update chall
    else:
        if not data.get("cid"):
            return {"msg": f"Missing challenge id"}, 400

        try:
            # remove files first
            if not Challenge.update_one(
                {"_id": bson.ObjectId(data["cid"])},
                {"$pull": {"files": {"fileid": {"$in": request.get_json().get("files_remove")}}}},
            ).matched_count:
                return {"msg": "Challenge not found"}, 404

            # then update
            Challenge.update_one(
                {"_id": bson.ObjectId(data["cid"])},
                {
                    "$set": {
                        "name": data["name"],
                        "category": data["category"],
                        "content": data.get("content"),
                        "flag": data["flag"],
                        "score": data["score"],
                    },
                    "$push": {"files": {"$each": files}},
                },
            )

        except InvalidId:
            return {"msg": "Invalid challenge id"}, 400

        except DuplicateKeyError:
            return {"msg": "Challenge name already exists"}, 409

        return {"msg": "Challenge updated"}


@admin.route("/challs/<cid>", methods=["DELETE"])
@require_admin
def delete_chall(cid=None):
    try:
        if not Challenge.delete_one({"_id": cid}).deleted_count:
            return {"msg": "Challenge not found"}, 404
    except InvalidId:
        return {"msg": "Invalid challenge id"}, 400

    return {"msg": "Challenge deleted"}
