from graphene import ObjectType, List, String, Field, Mutation, Int
from graphql import ResolveInfo

from blenheim.config import Config


def create_domain_list(config: Config):
    return [Domain(id=k, subdomains=v) for k, v in config['domains'].items()]


class Domain(ObjectType):
    id = String()
    subdomains = List(String)


# noinspection PyMethodMayBeStatic
class Settings(ObjectType):
    default_subdomains = Field(List(String))
    ipv4 = Field(List(String))
    ipv6 = Field(List(String))
    domains = Field(List(Domain))

    async def resolve_default_subdomains(self, info: ResolveInfo):
        if info.context.get('current_user'):
            return Config()['settings']['default_subdomains']

    async def resolve_ipv4(self, info: ResolveInfo):
        if info.context.get('current_user'):
            return Config()['settings']['ipv4']

    async def resolve_ipv6(self, info: ResolveInfo):
        if info.context.get('current_user'):
            return Config()['settings']['ipv6']

    async def resolve_domains(self, info: ResolveInfo):
        if info.context.get('current_user'):
            return create_domain_list(Config())


def create_setting(setting_id: str):
    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    class CreateSettings(Mutation):
        class Arguments:
            name = String()
        result = List(String)

        def mutate(self, info, name: str):
            if info.context.get('current_user'):
                config = Config()
                setting = config['settings'][setting_id]
                setting.append(name)
                config.save()
                return CreateSettings(result=setting)
    return type('create_' + setting_id, (CreateSettings,), {})


def update_setting(setting_id: str):
    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    class UpdateSettings(Mutation):
        class Arguments:
            name = String()
            index = Int()
        result = List(String)

        def mutate(self, info, name: str, index: int):
            if info.context.get('current_user'):
                config = Config()
                setting = config['settings'][setting_id]
                setting[index] = name
                config.save()
                return UpdateSettings(result=setting)
    return type('update_' + setting_id, (UpdateSettings,), {})


def delete_setting(setting_id: str):
    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    class DeleteSettings(Mutation):
        class Arguments:
            index = Int()
        result = List(String)

        def mutate(self, info, index: int):
            if info.context.get('current_user'):
                config = Config()
                setting = config['settings'][setting_id]
                del setting[index]
                config.save()
                return DeleteSettings(result=setting)
    return type('delete_' + setting_id, (DeleteSettings,), {})


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateDomain(Mutation):
    class Arguments:
        name = String()
        subdomains = List(String)
    result = List(Domain)

    def mutate(self, info, name: str, subdomains: list):
        if info.context.get('current_user'):
            config = Config()
            config['domains'][name] = subdomains
            config.save()
            return CreateDomain(result=create_domain_list(config))


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class UpdateDomain(Mutation):
    class Arguments:
        old_name = String()
        new_name = String()
    result = List(Domain)

    def mutate(self, info, old_name: str, new_name: str):
        if info.context.get('current_user'):
            config = Config()
            config['domains'][new_name] = config['domains'].pop(old_name)
            config.save()
            return UpdateDomain(result=create_domain_list(config))


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class DeleteDomain(Mutation):
    class Arguments:
        name = String()
    result = List(Domain)

    def mutate(self, info, name: str):
        if info.context.get('current_user'):
            config = Config()
            del config['domains'][name]
            config.save()
            return DeleteDomain(result=create_domain_list(config))


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateSubDomain(Mutation):
    class Arguments:
        domain = String()
        name = String()
    Output = Domain

    def mutate(self, info, domain: str, name: str):
        if info.context.get('current_user'):
            config = Config()
            config['domains'][domain].append(name)
            config.save()
            return Domain(id=domain, subdomains=config['domains'][domain])


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class UpdateSubDomain(Mutation):
    class Arguments:
        domain = String()
        name = String()
        index = Int()
    Output = Domain

    def mutate(self, info, domain: str, name: str, index: int):
        if info.context.get('current_user'):
            config = Config()
            config['domains'][domain][index] = name
            config.save()
            return Domain(id=domain, subdomains=config['domains'][domain])


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class DeleteSubDomain(Mutation):
    class Arguments:
        domain = String()
        index = Int()
    Output = Domain

    def mutate(self, info, domain: str, index: int):
        if info.context.get('current_user'):
            config = Config()
            del config['domains'][domain][index]
            config.save()
            return Domain(id=domain, subdomains=config['domains'][domain])


# noinspection PyUnresolvedReferences
class SettingsMutations(ObjectType):
    create_default_sub_domain = create_setting('default_subdomains').Field()
    create_ipv4 = create_setting('ipv4').Field()
    create_ipv6 = create_setting('ipv6').Field()
    update_default_sub_domain = update_setting('default_subdomains').Field()
    update_ipv4 = update_setting('ipv4').Field()
    update_ipv6 = update_setting('ipv6').Field()
    delete_default_sub_domain = delete_setting('default_subdomains').Field()
    delete_ipv4 = delete_setting('ipv4').Field()
    delete_ipv6 = delete_setting('ipv6').Field()
    create_domain = CreateDomain.Field()
    update_domain = UpdateDomain.Field()
    delete_domain = DeleteDomain.Field()
    create_sub_domain = CreateSubDomain.Field()
    update_sub_domain = UpdateSubDomain.Field()
    delete_sub_domain = DeleteSubDomain.Field()
