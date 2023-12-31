import random
import string
from base64 import b64encode
from pprint import pprint

from requests import Session

TARGET = "http://localhost/api"


def randstr():
    return "".join(random.choices(string.ascii_letters, k=10))


class Api:
    def __init__(self, username="", password=""):
        self.s = Session()
        if not username and not password:
            username = randstr()
            password = randstr()
        self.account = {"username": username, "password": password}

    def register(self):
        r = self.s.post(TARGET + "/register", json=self.account)
        return r.json()

    def login(self):
        r = self.s.post(TARGET + "/login", json=self.account)
        return r.json()

    def logout(self):
        r = self.s.get(TARGET + "/logout")
        return r.json()

    def change_password(self, new_password):
        r = self.s.post(
            TARGET + "/change_password", json={"password": self.account["password"], "new_password": new_password}
        )
        response = r.json()
        self.account["password"] = new_password
        return response

    def get_challs(self):
        r = self.s.get(TARGET + "/challs")
        return r.json()

    def admin_get_challs(self):
        r = self.s.get(TARGET + "/admin/challs")
        return r.json()

    def add_chall(self, chall):
        r = self.s.post(TARGET + "/admin/challs", json=chall)
        return r.json()

    def update_chall(self, chall):
        r = self.s.patch(TARGET + "/admin/challs", json=chall)
        return r.json()

    def delete_chall(self, _id):
        r = self.s.delete(TARGET + "/admin/challs/" + _id)
        return r.json()

    def get_profile(self, uid=""):
        if uid:
            r = self.s.get(TARGET + "/profile/" + uid)
        else:
            r = self.s.get(TARGET + "/profile")
        return r.json()

    def scores(self):
        r = self.s.get(TARGET + "/scores")
        return r.json()

    def get_solves(self, _id):
        r = self.s.get(TARGET + "/solves/" + _id)
        return r.json()

    def categories(self):
        r = self.s.get(TARGET + "/categories")
        return r.json()

    def submit_flag(self, _id, flag):
        r = self.s.post(TARGET + "/flag", json={"_id": _id, "flag": flag})
        return r.json()

    def get_file(self, fileid):
        r = self.s.get(TARGET + "/files", params={"fileid": fileid})
        return r.text


def generate_new_challs():
    return {
        "name": randstr(),
        "category": random.choice(["wed", "pown", "4n6", "cryto"]),
        "content": randstr(),
        "flag": "flag{%s}" % randstr(),
        "files": [
            {"filename": "a.data", "data": b64encode(randstr().encode()).decode()},
            {"filename": "b.mkv", "data": b64encode(randstr().encode()).decode()},
            {"filename": "c.mkv", "data": b64encode(randstr().encode()).decode()},
            {"filename": "d.mkv", "data": b64encode(randstr().encode()).decode()},
            {"filename": "e.mkv", "data": b64encode(randstr().encode()).decode()},
            {"filename": "f.mkv", "data": b64encode(randstr().encode()).decode()},
        ],
        "score": random.randint(0, 1000),
    }


def populate_scoreboard():
    admin = Api("admin", "admin")
    admin.login()

    user = Api("user", "user")
    user.login()

    for _ in range(10):
        pprint(admin.add_chall(generate_new_challs()))

    challs = admin.admin_get_challs()

    for _ in range(20):
        rand_user = Api()
        rand_user.register()
        rand_user.login()
        for x in random.choices(challs, k=random.randint(0, len(challs))):
            pprint(user.submit_flag(x["_id"], x["flag"]))
            pprint(rand_user.submit_flag(x["_id"], x["flag"]))

    pprint(admin.admin_get_challs())


def check_patch():
    admin = Api("admin", "admin")
    admin.login()

    admin.add_chall(generate_new_challs())
    challs = admin.admin_get_challs()
    pprint(challs)

    chall = {
        "_id": "65621191ac55596e60a21ad4",
        "category": "wed",
        "content": "content so mot",
        "files": [],
        "flag": "flag{day la flag}",
        "name": "miniwafhehe",
        "score": 999,
    }
    admin.update_chall(chall)
    pprint(admin.admin_get_challs())


if __name__ == "__main__":
    user = Api("user", "user")
    user.login()
    populate_scoreboard()
    pprint(user.scores())
