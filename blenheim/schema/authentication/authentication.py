from datetime import datetime
from hashlib import sha3_512
from secrets import token_urlsafe
from typing import Union

import graphene
from graphene import ResolveInfo, NonNull, Field, ObjectType
from graphene import String, Boolean

from blenheim.config import Config
from blenheim.schema.authentication.input import UserInput

TOKENS = 'tokens'
USERS = 'users'


def authenticate(func):
    def wrapper(*args, **kwargs):
        info = args[0]
        token = info.context['request'].headers['token']
        await Authentication.expire_tokens()
        config = Config()
        token_data = config[TOKENS].get(token)
        if token_data:
            user = config[USERS][token_data['user']]
            info.context['current_user'] = user
            info.context['current_token'] = token
            return func(*args, **kwargs)
        return None
    return wrapper


class UserType(graphene.ObjectType):
    name = graphene.String()


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Authentication(ObjectType):
    login = Field(String, details=UserInput(required=True))
    logout = Field(Boolean)
    current_user = Field(UserType)
    change_password = Field(
        Boolean, password=NonNull(String)
    )

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

    async def resolve_login(self, info: ResolveInfo, details: UserInput):
        await Authentication.expire_tokens()
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
            return token

    @authenticate
    async def resolve_logout(self, info: ResolveInfo):
        current_user = info.context.get('current_user')
        if current_user:
            config = Config()
            del config[TOKENS][info.context['current_token']]
            config.save()

    @authenticate
    async def resolve_current_user(self, info: ResolveInfo):
        current_user = info.context.get('current_user')
        if current_user:
            return await Authentication.get_user_type_without_password(
                current_user
            )

    @authenticate
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
