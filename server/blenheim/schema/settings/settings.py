from graphene import ObjectType, List, String, Field, Mutation, Int

from blenheim.config import Config


class Domain(ObjectType):
    name = String()
    subdomains = List(String)


class Settings(ObjectType):
    default_subdomains = Field(List(String), resolver=lambda x, y:
                               Config()['settings']['default_subdomains'])
    ipv4 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv4'])
    ipv6 = Field(List(String), resolver=lambda x, y:
                 Config()['settings']['ipv6'])
    domains = Field(List(Domain), resolver=lambda x, y:
                    [Domain(name=k, subdomains=v)
                     for k, v in Config()['domains'].items()])


def create_setting(setting_id: str):
    # noinspection PyMethodMayBeStatic,PyUnusedLocal
    class CreateSettings(Mutation):
        class Arguments:
            name = String()
        result = List(String)

        def mutate(self, info, name: str):
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
            config = Config()
            setting = config['settings'][setting_id]
            del setting[index]
            config.save()
            return DeleteSettings(result=setting)
    return type('delete_' + setting_id, (DeleteSettings,), {})


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateDomain(Mutation):
    class Arguments:
        domain = Domain()
    result = List(Domain)

    def mutate(self, info, domain: Domain):
        config = Config()
        config['domain'][domain.name] = domain.subdomains
        config.save()
        return CreateDomain(result=[Domain(name=k, subdomains=v)
                            for k, v in config['domains'].items()])


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
