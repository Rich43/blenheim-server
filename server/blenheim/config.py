from hashlib import sha3_512
from json import load, dump
from os.path import exists

default_config = {
    'users': {
        'admin': {
            'name': 'admin',
            'password': sha3_512(b'Password1').hexdigest()
        }
    },
    'tokens': {
    },
    'domains': {
    },
    'settings': {
        'ipv4': [
            '111.111.111.111',
            '111.111.111.111'
        ],
        'ipv6': [
            '2001:0:53aa:64c:2867:5478:a053:193c',
            '2001:0:53aa:64c:2867:5478:a053:193c'
        ],
        'default_subdomains': [
            'www',
            'ftp',
            'imap',
            'pop',
            'smtp'
        ]
    }
}

FILENAME = 'config.json'


class Config(dict):
    def __init__(self):
        super().__init__(self)
        if exists(FILENAME):
            self.update(load(open(FILENAME)))
        else:
            self.update(default_config)

    def update(self, __m, **kwargs):
        super().update(__m, **kwargs)
        self.save()

    def save(self):
        dump(self, open(FILENAME, 'w'), indent=4)
