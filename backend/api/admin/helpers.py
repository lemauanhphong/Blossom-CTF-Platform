from functools import wraps

from api.auth.helpers import require_login
from flask import session


def require_admin(func):
    @wraps(func)
    @require_login
    def wrapper(*args, **kwargs):
        if session.get("role") != "admin":
            return {"msg": "You don't have enough permission to access"}, 401
        return func(*args, **kwargs)

    return wrapper
