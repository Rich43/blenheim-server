from datetime import datetime
from hashlib import sha3_512
from secrets import token_urlsafe
from typing import Union

import graphene
from graphene import ResolveInfo
from graphene import String, Boolean

from blenheim.config import Config
from blenheim.schema.authentication.input import UserInput

TOKENS = 'tokens'
USERS = 'users'


class UserType(graphene.ObjectType):
    name = graphene.String()


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Authentication(graphene.ObjectType):
    login = graphene.Field(String, details=UserInput(required=True))
    logout = graphene.Field(Boolean)
    current_user = graphene.Field(UserType)
    change_password = graphene.Field(
        Boolean, password=String()
    )
    token = graphene.Field(String, token=String())

    @staticmethod
    async def get_user_type_without_password(user):
        user_without_password = dict(user)
        del user_without_password['password']
        return UserType(**user_without_password)

    @staticmethod
    async def hash_password(password: Union[str, bytes, String]):
        return sha3_512(str(password).encode()).hexdigest()

    @staticmethod
    async def expire_tokens():
        config = Config()
        to_delete = []
        for key, value in config[TOKENS].items():
            elapsed = datetime.now() - datetime.fromisoformat(value['created'])
            if elapsed.seconds > 60 * 60:
                to_delete.append(key)
        for key in to_delete:
            del config[TOKENS][key]
        config.save()

    async def resolve_token(self, info: ResolveInfo, token: str):
        await Authentication.expire_tokens()
        config = Config()
        token_data = config[TOKENS].get(token)
        if token_data:
            user = config[USERS][token_data['user']]
            info.context['current_user'] = user
            info.context['current_token'] = token
            return token

    async def resolve_login(self, info: ResolveInfo, details: UserInput):
        config = Config()
        user = config[USERS].get(str(details.name))
        if (user and
                user.get('password') ==
                await Authentication.hash_password(details.password)):
            token = token_urlsafe()
            config[TOKENS][token] = {
                'user': details.name,
                'created': datetime.now().isoformat()
            }
            config.save()
            await Authentication.expire_tokens()
            return token

    async def resolve_logout(self, info: ResolveInfo):
        current_user = info.context.get('current_user')
        if current_user:
            del info.context[TOKENS][info.context['current_token']]

    async def resolve_current_user(self, info: ResolveInfo):
        current_user = info.context.get('current_user')
        if current_user:
            return await Authentication.get_user_type_without_password(
                current_user
            )

    async def resolve_change_password(self, info: ResolveInfo,
                                      password: str):
        current_user = info.context.get('current_user')
        if current_user:
            config = Config()
            config[USERS][current_user['name']]['password'] = (
                await Authentication.hash_password(password)
            )
            config.save()
            return True
        return False
