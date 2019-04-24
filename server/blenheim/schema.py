import graphene
from graphql import ResolveInfo

from blenheim.config import Config


class UserInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    password = graphene.String()


class UserType(graphene.ObjectType):
    name = graphene.String()


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, details=UserInput(required=True))

    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    async def resolve_user(self, info: ResolveInfo, details: UserInput):
        user = Config()["users"].get(str(details.name))
        if user and user.get('password') == details.password:
            user_without_password = dict(user)
            del user_without_password['password']
            return UserType(**user_without_password)
