from os.path import join, sep, abspath
from subprocess import run

from graphene import ObjectType, Field, ResolveInfo

from blenheim.library.deploy import check_docker_container, check_root
from blenheim.library.dns.named_conf_local import NamedConfLocal
from blenheim.library.dns.zonefile import ZoneFile
from blenheim.schema.result import Result


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Dns(ObjectType):
    generate = Field(Result)

    def strip(self, text):
        return '\n'.join([x.lstrip() for x in text.split('\n')])

    async def resolve_generate(self, info: ResolveInfo):
        if info.context.get('current_user'):
            # Check environment
            result = check_docker_container()
            if result:
                return result

            result = check_root()
            if result:
                return result

            # Generate zone file
            zone_file = ZoneFile()
            for domain, template_output in zone_file.generate_zones():
                path = join(abspath(sep), 'etc', 'bind', domain + '.zone')
                try:
                    with open(path, 'w') as f:
                        f.write(self.strip(template_output))
                except IOError:
                    return Result('cannot write to ', extra=path)
            path = join(abspath(sep), 'etc', 'bind', 'named.conf.local')

            # Generate named.conf
            try:
                with open(path, 'w') as f:
                    template_output = (NamedConfLocal()
                                       .generate_named_conf_local())
                    f.write(self.strip(template_output))
            except IOError:
                return Result('cannot write to ', extra=path)

            # Restart bind
            run([join(abspath(sep), 'etc', 'init.d', 'bind9'), 'restart'])
            return Result()
        else:
            return Result('not logged in')
