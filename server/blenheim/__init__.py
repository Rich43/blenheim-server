import graphene
from graphql.execution.executors.asyncio import AsyncioExecutor
from starlette.applications import Starlette
from starlette.graphql import GraphQLApp
from starlette.middleware.cors import CORSMiddleware

from blenheim.schema.schema import Query, Mutations
from blenheim.schema.settings.settings import SettingsMutations

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'])
# noinspection PyTypeChecker
app.add_route(
    '/',
    GraphQLApp(
        schema=graphene.Schema(
            query=Query,
            mutation=Mutations
        ),
        executor_class=AsyncioExecutor
    )
)
