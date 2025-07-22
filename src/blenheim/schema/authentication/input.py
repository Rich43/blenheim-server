from graphene import InputObjectType, String, NonNull


class UserInput(InputObjectType):
    name = String(required=True)
    password = NonNull(String)
