from graphene import ObjectType, List, String, Field

from blenheim.config import Config


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Settings(ObjectType):
    subdomains = Field(List(String), resolver=lambda x, y:
                       Config()['settings']['subdomains'])
    ipv4 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv4'])
    ipv6 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv6'])
