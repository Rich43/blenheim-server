import getpass
from os.path import exists

from blenheim.schema.result import Result


def check_docker_container():
    if not exists('/.dockerenv'):
        return Result('You are not running blenheim in a docker container')


def check_root():
    if getpass.getuser() != 'root':
        return Result('You need to run this program as a root user')
