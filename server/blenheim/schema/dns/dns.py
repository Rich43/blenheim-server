from os.path import join, sep, abspath

from graphene import Boolean, ObjectType, Field, ResolveInfo
from graphql import GraphQLError

from blenheim.library.deploy import check_docker_container, check_root
from blenheim.library.dns.zonefile import ZoneFile
from subprocess import run


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Dns(ObjectType):
    generate = Field(Boolean)

    async def resolve_generate(self, info: ResolveInfo):
        check_docker_container()
        check_root()
        zone_file = ZoneFile()
        for domain, template_output in zone_file.generate_zones():
            path = join(abspath(sep), 'etc', 'bind', domain + ".zone")
            try:
                with open(path, 'w') as f:
                    f.write(template_output)
            except IOError:
                raise GraphQLError('cannot write to ' + path)
        run([join(abspath(sep), 'etc', 'init.d', 'bind9'), 'restart'])
        return True
