from graphene import Boolean, ObjectType, Field, ResolveInfo
from blenheim.library.dns.zonefile import ZoneFile


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Dns(ObjectType):
    generate = Field(Boolean)

    async def resolve_generate(self, info: ResolveInfo):
        zone_file = ZoneFile()
        print(zone_file.generate_zones())
        return True
