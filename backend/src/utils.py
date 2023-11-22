from flask import request

COMMON_FEILD_DATA_TYPE = {"score": int, "files": dict}


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
