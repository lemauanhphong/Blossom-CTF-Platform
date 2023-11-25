import bcrypt
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

client = MongoClient("mongo", 27017, username="root", password="123456", serverSelectionTimeoutMS=5000, tz_aware=True)

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
        {
            "username": "admin",
            "password": bcrypt.hashpw(b"admin", bcrypt.gensalt()),
            "role": "admin",
            "score": 0,
            "rank": 0,
        }
    )
    User.insert_one(
        {
            "username": "user",
            "password": bcrypt.hashpw(b"user", bcrypt.gensalt()),
            "role": "user",
            "score": 0,
            "rank": 0,
        }
    )
except DuplicateKeyError:
    pass
