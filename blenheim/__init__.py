from graphene import Schema
from starlette.applications import Starlette
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from starlette.middleware.cors import CORSMiddleware

from blenheim.schema.schema import Query, Mutations
from blenheim.schema.settings.settings import SettingsMutations

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['*'],
                   allow_methods=["POST"])
# noinspection PyTypeChecker
app.mount(
    '/graphql',
    GraphQLApp(
        schema=Schema(
            query=Query,
            mutation=Mutations
        ),
        on_get=make_graphiql_handler()
    )
)
