import graphene

from blenheim.schema.authentication.authentication import Authentication


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Query(graphene.ObjectType):
    authentication = graphene.Field(
        Authentication, resolver=lambda x, y: Authentication()
    )
