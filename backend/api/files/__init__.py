import io
from pprint import pprint

from api.auth.helpers import require_login
from database import Challenge
from flask import Blueprint, request, send_file

files = Blueprint("files", __name__)

# TODO: check time before granting access


@files.route("/files", methods=["GET"])
@require_login
def get_file():
    if file := Challenge.find_one({"files.fileid": request.args.get("fileid")}, {"_id": 0, "files.$": 1}):
        file = file["files"][0]
        return send_file(io.BytesIO(file["data"]), download_name=file["filename"])
    return {"msg": "File not found"}, 404
