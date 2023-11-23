import bcrypt
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

client = MongoClient("mongo", 27017, username="root", password="123456", serverSelectionTimeoutMS=5000)

db = client["blossom"]

User = db["users"]
Challenge = db["challenges"]

SolvedLog = db["solved_logs"]
CommonLog = db["logs"]

User.create_index("username", unique=True)
Challenge.create_index("name", unique=True)

# TODO: handle admin account
try:
    User.insert_one(
        {"username": "admin", "password": bcrypt.hashpw(b"admin", bcrypt.gensalt()), "role": "admin", "score": 0}
    )
except DuplicateKeyError:
    pass
