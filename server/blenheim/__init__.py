import graphene
from graphql.execution.executors.asyncio import AsyncioExecutor
from starlette.applications import Starlette
from starlette.graphql import GraphQLApp

from blenheim.schema.schema import Query

app = Starlette()
# noinspection PyTypeChecker
app.add_route(
    '/',
    GraphQLApp(
        schema=graphene.Schema(query=Query),
        executor_class=AsyncioExecutor
    )
)
