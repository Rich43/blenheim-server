from graphene import ObjectType, List, String, Field

from blenheim.config import Config


class Domain(ObjectType):
    name = String()
    subdomains = List(String)


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Settings(ObjectType):
    default_subdomains = Field(List(String), resolver=lambda x, y:
                               Config()['settings']['default_subdomains'])
    ipv4 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv4'])
    ipv6 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv6'])
    domains = Field(List(Domain), resolver=lambda x, y:
                    [Domain(name=k, subdomains=v)
                     for k, v in Config()['domains'].items()])
