import os

from api.admin import admin
from api.auth import auth
from api.challs import challs
from api.files import files
from api.profile import profile
from api.scores import scores
from flask import Flask
from flask_cors import CORS
from flask_session import Session
from utils import config_timezone, sanitize

config_timezone()

app = Flask(__name__)
app.secret_key = os.urandom(32)
app.config["SESSION_TYPE"] = "filesystem"

Session(app)
CORS(app, supports_credentials=True)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers["Cache-Control"] = "public, max-age=0"
    return response


app.before_request_funcs = {None: [sanitize]}

app.register_blueprint(admin)
app.register_blueprint(auth)
app.register_blueprint(challs)
app.register_blueprint(profile)
app.register_blueprint(scores)
app.register_blueprint(files)


if __name__ == "__main__":
    app.run("0.0.0.0")
