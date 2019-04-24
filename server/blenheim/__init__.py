import graphene
from graphql.execution.executors.asyncio import AsyncioExecutor
from starlette.applications import Starlette
from starlette.graphql import GraphQLApp

from blenheim.schema import Query

users = {
    "admin": {
        "name": "admin",
        "password": "Password1",
        "email": "foo@bar.com",
        "first_name": "foo",
        "last_name": "bar"
    }
}

app = Starlette()
# noinspection PyTypeChecker
app.add_route(
    '/',
    GraphQLApp(
        schema=graphene.Schema(query=Query),
        executor_class=AsyncioExecutor
    )
)
