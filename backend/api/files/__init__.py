import io

from api.auth.helpers import require_login
from database import Challenge
from flask import Blueprint, send_file
from utils import require_contest_running

files = Blueprint("files", __name__)


@files.route("/files/<fileid>", methods=["GET"])
@require_login
@require_contest_running
def get_file(fileid):
    if file := Challenge.find_one({"files.fileid": fileid}, {"_id": 0, "files.$": 1}):
        file = file["files"][0]
        return send_file(io.BytesIO(file["data"]), download_name=file["filename"])
    return {"msg": "File not found"}, 404
