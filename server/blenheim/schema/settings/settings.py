from graphene import ObjectType, List, String, Field, Mutation

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


class AbstractCreateSettings(ObjectType):
    class Arguments:
        name = String()

    result = List(String)


def create_settings_mutate(name, setting_id: str):
    config = Config()
    setting = config['settings'][setting_id]
    setting.append(name)
    config.save()
    return AbstractCreateSettings(result=setting)


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateDefaultSubDomain(Mutation, AbstractCreateSettings):
    def mutate(self, info, name):
        return create_settings_mutate(name, 'default_subdomains')


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateIPv4(Mutation, AbstractCreateSettings):
    def mutate(self, info, name):
        return create_settings_mutate(name, 'ipv4')


# noinspection PyMethodMayBeStatic,PyUnusedLocal
class CreateIPv6(Mutation, AbstractCreateSettings):
    def mutate(self, info, name):
        return create_settings_mutate(name, 'ipv6')


class SettingsMutations(ObjectType):
    create_default_sub_domain = CreateDefaultSubDomain.Field()
    create_ipv4 = CreateIPv4.Field()
    create_ipv6 = CreateIPv6.Field()
