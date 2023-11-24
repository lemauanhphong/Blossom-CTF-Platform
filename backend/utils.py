from datetime import datetime
from functools import wraps

from config import END_TIME, START_TIME, TIMEZONE
from flask import request
from zoneinfo import ZoneInfo

COMMON_FEILD_DATA_TYPE = {"score": int, "files": dict, "files_remove": list}


def sanitize():
    if not request.is_json:
        return

    for key, value in request.get_json().items():
        if not isinstance(key, str) or "$" in key:
            return {"msg": f"Malformed input field {key}"}

        if key in COMMON_FEILD_DATA_TYPE:
            if not isinstance(value, COMMON_FEILD_DATA_TYPE[key]):
                return {"msg": f"{key} must be {COMMON_FEILD_DATA_TYPE[key]}"}

            if key == "files":
                for filename, filedata in value.items():
                    if not isinstance(filename, str) and not isinstance(filedata, str):
                        return {"msg": f"Mailformed file"}

        elif not isinstance(value, str):
            return {"msg": f"{key} must be str"}


def response_id_to_hex(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)

        if isinstance(result, list):
            for i, obj in enumerate(result):
                if "_id" in obj:
                    result[i]["_id"] = str(obj["_id"])
        else:
            if "_id" in result:
                result["_id"] = str(result["_id"])

        return result

    return wrapper


def require_contest_running(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            now = datetime.now(ZoneInfo(TIMEZONE)).timestamp()
            if datetime.fromisoformat(START_TIME).replace(tzinfo=ZoneInfo(TIMEZONE)).timestamp() > now:
                return {"msg": "Contest has not started yet"}
            if datetime.fromisoformat(END_TIME).replace(tzinfo=ZoneInfo(TIMEZONE)).timestamp() < now:
                return {"msg": "Contest has ended"}
        except ValueError:
            return {"msg": "Invalid contest time"}, 500

        return func(*args, **kwargs)

    return wrapper
