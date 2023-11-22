import os

from api.admin import admin
from api.auth import auth
from api.challs import challs
from api.users import users
from flask import Flask
from flask_session import Session
from utils import sanitize

app = Flask(__name__)
app.secret_key = os.urandom(32)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app.before_request_funcs = {None: [sanitize]}

app.register_blueprint(admin)
app.register_blueprint(auth)
app.register_blueprint(challs)
app.register_blueprint(users)

app.run("0.0.0.0", debug=True)
