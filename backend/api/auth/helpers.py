from functools import wraps

from flask import session


def require_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not session.get("username"):
            return {"msg": "Please login first"}, 401
        return func(*args, **kwargs)

    return wrapper


# TODO: add more check
def is_strong_password(password):
    return len(password) >= 8
