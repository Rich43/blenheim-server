from binascii import crc32

import graphene


class Result(graphene.ObjectType):
    def __init__(self, error="", **kwargs):
        kwargs["success"] = False
        if error == "":
            kwargs["success"] = True
        kwargs["error"] = error
        kwargs["code"] = hex(crc32(error.encode()))[2:]
        super().__init__(**kwargs)

    success = graphene.Boolean()
    error = graphene.String(required=True)
    code = graphene.String(required=True)
    extra = graphene.String()
