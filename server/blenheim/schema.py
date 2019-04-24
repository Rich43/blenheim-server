import graphene
from graphql import ResolveInfo

from blenheim import users


class UserInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    password = graphene.String()


class UserType(graphene.ObjectType):
    name = graphene.String()
    email = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, details=UserInput(required=True))

    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    async def resolve_user(self, info: ResolveInfo, details: UserInput):
        user = users.get(str(details.name))
        if user and user.get('password') == details.password:
            user_without_password = dict(user)
            del user_without_password['password']
            return UserType(**user_without_password)
