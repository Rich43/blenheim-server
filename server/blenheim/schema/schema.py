import graphene

from blenheim.schema.authentication.authentication import Authentication
from blenheim.schema.dns.dns import Dns
from blenheim.schema.settings.settings import Settings


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Query(graphene.ObjectType):
    authentication = graphene.Field(
        Authentication, resolver=lambda x, y: Authentication()
    )
    dns = graphene.Field(
        Dns, resolver=lambda x, y: Dns()
    )
    settings = graphene.Field(
        Settings, resolver=lambda x, y: Settings()
    )
