from json import load, dump
from os.path import exists

default_config = {
    "users": {
        "admin": {
            "name": "admin",
            "password": "Password1"
        }
    }
}

FILENAME = "config.json"


class Config(dict):
    def __init__(self):
        super().__init__(self)
        if exists(FILENAME):
            self.update(load(open(FILENAME)))
        else:
            self.update(default_config)

    def __setitem__(self, k, v):
        super().__setitem__(k, v)
        self.save()

    def __delitem__(self, v):
        super().__delitem__(v)
        self.save()

    def update(self, __m, **kwargs):
        super().update(__m, **kwargs)
        self.save()

    def save(self):
        dump(self, open(FILENAME, "w"), indent=4)
