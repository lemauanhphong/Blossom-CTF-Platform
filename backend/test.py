import random
import string
from base64 import b64encode
from pprint import pprint

from requests import Session

TARGET = "http://localhost:5000"


def randstr():
    return "".join(random.choices(string.ascii_letters, k=10))


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


def get_current_profile():
    r = s.get(TARGET + "/profile")
    return r.json()


def get_public_profile(username):
    r = s.get(TARGET + "/profile", params={"username": username})
    return r.json()


def scores():
    r = s.get(TARGET + "/scores")
    return r.json()


def categories():
    r = s.get(TARGET + "/categories")
    return r.json()


def submit_flag(name, flag):
    r = s.post(TARGET + "/flag", json={"name": name, "flag": flag})
    return r.json()


def get_file(fileid):
    r = s.get(TARGET + "/files", params={"fileid": fileid})
    return r.text


s = Session()


account = {"username": randstr(), "password": randstr()}
account = {"username": "admin", "password": "admin"}
print(account)

pprint(register(account))
pprint(login(account))
print(s.cookies)

chall = {
    "name": randstr(),
    "category": random.choice(["wed", "pown", "4n6", "cryto"]),
    "content": randstr(),
    "flag": "flag{%s}" % randstr(),
    "files": {
        "a.txt": b64encode(randstr().encode()).decode(),
        "b.txt": b64encode(randstr().encode()).decode(),
    },
    "score": random.randint(0, 1000),
}

pprint(add_chall(chall))
pprint(get_challs())
pprint(categories())

# pprint(submit_flag(chall["name"], chall["flag"]))
pprint(get_challs())
pprint(categories())
