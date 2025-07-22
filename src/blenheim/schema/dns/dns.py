from os import environ
from os.path import join, sep, abspath

from docker import from_env
from graphene import ObjectType, Field, ResolveInfo, NonNull

from blenheim.library.deploy import check_docker_container, check_root
from blenheim.library.dns.named_conf_local import NamedConfLocal
from blenheim.library.dns.zonefile import ZoneFile
from blenheim.schema.authentication.authentication import authenticate
from blenheim.schema.result import Result

BIND_NAME = environ.get("BIND_NAME")


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class Dns(ObjectType):
    generate = Field(NonNull(Result))

    def strip(self, text):
        return "\n".join([x.lstrip() for x in text.split("\n")])

    @authenticate
    async def resolve_generate(self, info: ResolveInfo):
        if info.context.get("current_user"):
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
                path = join(abspath(sep), "etc", "bind", domain + ".zone")
                try:
                    with open(path, "w") as f:
                        f.write(self.strip(template_output))
                except IOError:
                    return Result("cannot write to ", extra=path)
            path = join(abspath(sep), "etc", "bind", "named.conf.local")

            # Generate named.conf
            try:
                with open(path, "w") as f:
                    template_output = NamedConfLocal().generate_named_conf_local()
                    f.write(self.strip(template_output))
            except IOError:
                return Result("cannot write to ", extra=path)

            # Restart bind
            client = from_env()
            bind_containers = client.containers.list(
                filters={"name": "bind9" if BIND_NAME is None else BIND_NAME}
            )
            if len(bind_containers) == 0:
                return Result("Could not find bind9 docker container.")
            for bind_container in bind_containers:
                bind_container.restart()
            return Result()
        else:
            return Result("not logged in")
