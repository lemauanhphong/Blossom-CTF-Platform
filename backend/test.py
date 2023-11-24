import random
import string
from base64 import b64encode
from pprint import pprint

from requests import Session

TARGET = "http://localhost:5000"


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
        r = self.s.put(TARGET + "/admin/challs", json=chall)
        return r.json()

    def delete_chall(self, name):
        r = self.s.delete(TARGET + "/admin/challs", json={"name": name})
        return r.json()

    def get_current_profile(self):
        r = self.s.get(TARGET + "/profile")
        return r.json()

    def get_public_profile(self, _id):
        r = self.s.get(TARGET + "/profile/" + _id)
        return r.json()

    def scores(self):
        r = self.s.get(TARGET + "/scores")
        return r.json()

    def get_solves(self, challname):
        r = self.s.get(TARGET + "/solves/" + challname)
        return r.json()

    def categories(self):
        r = self.s.get(TARGET + "/categories")
        return r.json()

    def submit_flag(self, name, flag):
        r = self.s.post(TARGET + "/flag", json={"name": name, "flag": flag})
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
        "files": {
            "a.data": b64encode(randstr().encode()).decode(),
            "b.mkv": b64encode(randstr().encode()).decode(),
        },
        "score": random.randint(0, 1000),
    }


def populate_scoreboard():
    admin = Api("admin", "admin")
    admin.login()

    user = Api("user", "user")
    user.login()

    flags = []

    for _ in range(5):
        new_chall = generate_new_challs()
        pprint(admin.add_chall(new_chall))
        flags.append((new_chall["name"], new_chall["flag"]))

    for _ in range(5):
        rand_user = Api()
        rand_user.register()
        rand_user.login()
        for name, flag in random.choices(flags, k=random.randint(0, len(flags))):
            pprint(user.submit_flag(name, flag))
            pprint(rand_user.submit_flag(name, flag))

    pprint(admin.get_challs())


if __name__ == "__main__":
    # populate_scoreboard()
    admin = Api("admin", "admin")
    admin.login()
    pprint(admin.get_challs())
    pprint(admin.get_solves("AJyvdZifPo"))
