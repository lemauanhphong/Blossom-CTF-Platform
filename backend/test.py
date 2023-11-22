import random
import string
from base64 import b64encode
from pprint import pprint

from requests import Session, delete
from src.database import Challenge

TARGET = "http://localhost:5000"


def randstr():
    return "".join(random.choices(string.printable, k=10))


def register(account):
    r = s.post(TARGET + "/register", json=account)
    return r.json()


def login(account):
    r = s.post(TARGET + "/login", json=account)
    return r.json()


def logout():
    r = s.get(TARGET + "/logout")
    return r.json()


def change_password(password, new_password):
    r = s.post(TARGET + "/change_password", json={"password": password, "new_password": new_password})
    return r.json()


def get_challs():
    r = s.get(TARGET + "/challs")
    return r.json()


def admin_get_challs():
    r = s.get(TARGET + "/admin/challs")
    return r.json()


def add_chall(chall):
    r = s.post(TARGET + "/admin/challs", json=chall)
    return r.json()


def update_chall(chall):
    r = s.put(TARGET + "/admin/challs", json=chall)
    return r.json()


def delete_chall(name):
    r = s.delete(TARGET + "/admin/challs", json={"name": name})
    return r.json()


def get_users():
    r = s.get(TARGET + "/users")
    return r.json()


s = Session()


account = {"username": randstr(), "password": randstr()}
# account["username"] = account["password"] = "admin"

pprint(register(account))
pprint(login(account))
pprint(get_users())

# new_password = randstr()
# print(change_password(account["password"], new_password))
# account["password"] = new_password
# print(account)


chall = {
    "name": randstr(),
    "category": random.choice(["wed", "pown", "4n6", "cry"]),
    "content": randstr(),
    "flag": f"flag{randstr()}",
    "files": {"a.jpg": b64encode(randstr().encode()).decode(), "b.png": b64encode(randstr().encode()).decode()},
    "score": random.randint(0, 1000),
}

chall["name"] = "miniwaf"

pprint(add_chall(chall))
pprint(admin_get_challs())


chall["name"] = "hehe"
chall["_id"] = "655cd81e17cf01ac90d8d87f"

pprint(update_chall(chall))
# pprint(admin_get_challs())

pprint(delete_chall("miniwaf"))
# pprint(admin_get_challs())
