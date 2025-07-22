from graphene import Field, ObjectType, NonNull

from blenheim.schema.authentication.authentication import Authentication
from blenheim.schema.dns.dns import Dns
from blenheim.schema.settings.settings import Settings, SettingsMutations


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Query(ObjectType):
    authentication = Field(
        NonNull(Authentication), resolver=lambda x, y: Authentication()
    )
    dns = Field(NonNull(Dns), resolver=lambda x, y: Dns())
    settings = Field(NonNull(Settings), resolver=lambda x, y: Settings())


class Mutations(ObjectType):
    authentication = Field(
        NonNull(Authentication), resolver=lambda x, y: Authentication()
    )
    settings = Field(
        NonNull(SettingsMutations), resolver=lambda x, y: SettingsMutations()
    )
