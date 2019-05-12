import graphene


class UserInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    password = graphene.String()
