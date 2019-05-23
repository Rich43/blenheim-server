from graphene import Field, ObjectType

from blenheim.schema.authentication.authentication import Authentication
from blenheim.schema.dns.dns import Dns
from blenheim.schema.settings.settings import Settings, SettingsMutations


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Query(ObjectType):
    authentication = Field(
        Authentication, resolver=lambda x, y: Authentication()
    )
    dns = Field(
        Dns, resolver=lambda x, y: Dns()
    )
    settings = Field(
        Settings, resolver=lambda x, y: Settings()
    )


class Mutations(ObjectType):
    settings = Field(
        SettingsMutations, resolver=lambda x, y: SettingsMutations()
    )
