from requests import Session
import string
from pymongo import MongoClient
import random
uri = "localhost"
db_name = "blossom"
collection_name = "users"

client = MongoClient(uri, username="root", password="123456",
                     serverSelectionTimeoutMS=5000)
# client = MongoClient("mongo", 27017, username="root", password="123456", serverSelectionTimeoutMS=5000)

database = client[db_name]
collection = database[collection_name]


def update_random_scores_for_all_users():
    all_users = list(collection.find())
    print(all_users)

    for user in all_users:
        # Generate a random score (replace this with your logic)
        new_score = random.randint(0, 65535)

        # Update the user's score
        result = collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"score": new_score}}
        )

        print(f"Updated score for user {user['username']}: {new_score}")


TARGET = "http://localhost:5000"

s = Session()


def randstr():
    return "".join(random.choices(string.ascii_letters, k=10))


def register(account):
    r = s.post(TARGET + "/register", json=account)
    return r.json()


for i in range(50):
    account = {"username": randstr(), "password": randstr()}
    register(account)

update_random_scores_for_all_users()
client.close()
