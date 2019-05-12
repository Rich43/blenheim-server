import getpass
from os.path import exists

from graphql import GraphQLError


def check_docker_container():
    if not exists('/.dockerenv'):
        raise GraphQLError('You are not running blenheim in a docker container')


def check_root():
    if getpass.getuser() != 'root':
        raise GraphQLError('You need to run this program as a root user')
