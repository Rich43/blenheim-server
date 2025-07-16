import json
import asyncio
from types import SimpleNamespace
from datetime import datetime, timedelta
from unittest.mock import patch
import builtins

import pytest

from blenheim.config import Config, FILENAME, default_config
from blenheim.library.deploy import check_docker_container, check_root
from blenheim.library.dns.named_conf_local import NamedConfLocal
from blenheim.library.dns.zonefile import ZoneFile
from blenheim.schema.result import Result
from blenheim.schema.authentication.authentication import Authentication, TOKENS, USERS
from blenheim.schema.settings import settings as setmod



def test_config_load_and_update(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        assert cfg['users']['admin']['name'] == 'admin'
        cfg.update({'foo': 'bar'})
        cfg2 = Config()
        assert cfg2['foo'] == 'bar'


def test_deploy_checks():
    with patch('blenheim.library.deploy.exists', return_value=True):
        assert check_docker_container() is None
    with patch('blenheim.library.deploy.exists', return_value=False):
        res = check_docker_container()
        assert isinstance(res, Result)
        assert not res.success

    with patch('blenheim.library.deploy.getpass.getuser', return_value='root'):
        assert check_root() is None
    with patch('blenheim.library.deploy.getpass.getuser', return_value='bob'):
        res = check_root()
        assert isinstance(res, Result)
        assert not res.success


def test_named_conf_and_zonefile(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        cfg['domains'] = {'example.com': [{'subdomain': 'foo'}]}
        cfg.save()
        conf = NamedConfLocal().generate_named_conf_local()
        assert 'zone "example.com"' in conf

        zones = ZoneFile().generate_zones()
        assert zones[0][0] == 'example.com'
        assert 'foo.example.com.' in zones[0][1]


def test_result_codes():
    ok = Result()
    assert ok.success and ok.error == ''
    err = Result('bad')
    assert not err.success and err.error == 'bad'


@pytest.mark.asyncio
async def test_authentication_flow(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        auth = Authentication()
        info_login = SimpleNamespace(context={'request': SimpleNamespace(headers={})})
        details = SimpleNamespace(name='admin', password='Password1')
        token = await auth.resolve_login(info_login, details)
        assert token in Config()[TOKENS]

        user = cfg[USERS]['admin']
        with patch.object(Authentication, 'expire_tokens', lambda: None):
            info = SimpleNamespace(context={'request': SimpleNamespace(headers={'Authorization': token}), 'current_user': user})
            user = await auth.resolve_current_user(info)
            assert user.name == 'admin'

            await auth.resolve_change_password(info, password='Newpass')
            hashed = await Authentication.hash_password('Newpass')
            assert Config()[USERS]['admin']['password'] == hashed

            await auth.resolve_logout(info)
            assert token not in Config()[TOKENS]


@pytest.mark.asyncio
async def test_authentication_expire(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        cfg[TOKENS]['t'] = {'user': 'admin', 'created': (datetime.now() - timedelta(hours=2)).isoformat()}
        cfg.save()
        await Authentication.expire_tokens()
        assert 't' not in Config()[TOKENS]


@patch.object(setmod, 'authenticate', lambda f: f)
def test_settings_mutations(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        token = 'tok'
        cfg[TOKENS][token] = {'user': 'admin', 'created': datetime.now().isoformat()}
        cfg.save()
        info = SimpleNamespace(
            context={'request': SimpleNamespace(headers={'Authorization': token}),
                     'current_user': cfg[USERS]['admin']})
        patcher = patch.object(Authentication, 'expire_tokens', lambda: None)
        patcher.start()

        CreateIPv4 = setmod.create_setting('ipv4')
        res = CreateIPv4().mutate(info, id='1.1.1.1')
        assert res.ipv4[-1] == '1.1.1.1'

        UpdateIPv4 = setmod.update_setting('ipv4')
        res = UpdateIPv4().mutate(info, id='2.2.2.2', index=0)
        assert res.ipv4[0] == '2.2.2.2'

        DeleteIPv4 = setmod.delete_setting('ipv4')
        before = list(res.ipv4)
        res = DeleteIPv4().mutate(info, index=0)
        assert len(res.ipv4) == len(before) - 1

        with patch.object(Authentication, 'expire_tokens', lambda: None):
            CreateDomain = setmod.CreateDomain
            res = CreateDomain().mutate(info, id='ex.com', subdomains=[{'subdomain': 'a'}])
        assert any(d.id == 'ex.com' for d in res)

        UpdateDomain = setmod.UpdateDomain
        res = UpdateDomain().mutate(info, id='ex.com', new_name='ex2.com')
        assert any(d.id == 'ex2.com' for d in res)

        DeleteDomain = setmod.DeleteDomain
        res = DeleteDomain().mutate(info, id='ex2.com')
        assert all(d.id != 'ex2.com' for d in res)

        CreateSubDomain = setmod.CreateSubDomain
        cfg['domains']['base.com'] = []
        cfg.save()
        res = CreateSubDomain().mutate(info, id='base.com', name='sub')
        assert any(s.id == 'sub' for s in res.subdomains)

        UpdateSub = setmod.update_sub_domain_setting('subdomain')
        res = UpdateSub().mutate(info, id='base.com', name='new', index=0)
        assert any(s.id == 'new' for s in res.subdomains)

        DeleteSub = setmod.DeleteSubDomain
        res = DeleteSub().mutate(info, id='base.com', index=0)
        assert res.subdomains == []

        UpdateSubIP = setmod.update_sub_domain_setting('ip_address_v4')
        cfg['domains']['base.com'] = [{'subdomain': 'a'}]
        cfg.save()
        res = UpdateSubIP().mutate(info, id='base.com', name='1.1.1.1', index=0)
        assert any(s.ip_address_v4 == '1.1.1.1' for s in res.subdomains)

        DeleteSubIP = setmod.delete_sub_domain_setting('ip_address_v4')
        res = DeleteSubIP().mutate(info, id='base.com', index=0)
        assert res.subdomains[0].ip_address_v4 is None
        patcher.stop()


def test_zonefile_branch(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        cfg['settings']['ipv4'] = ['1.1.1.1']
        cfg['settings']['ipv6'] = ['a::1', 'a::2']
        cfg['domains'] = {'ex.com': [{'subdomain': 's'}]}
        cfg.save()
        zones = ZoneFile().generate_zones()
        assert zones[0][0] == 'ex.com'
        assert 'ns2' in zones[0][1]

@pytest.mark.asyncio
async def test_settings_resolvers(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        token = 'tok'
        cfg[TOKENS][token] = {'user': 'admin', 'created': datetime.now().isoformat()}
        cfg.save()
        info = SimpleNamespace(context={'request': SimpleNamespace(headers={'Authorization': token}), 'current_user': cfg[USERS]['admin']})
        patcher = patch.object(Authentication, 'expire_tokens', lambda: None)
        patcher.start()
        settings = setmod.Settings()
        assert await settings.resolve_default_subdomains(info) == cfg['settings']['default_subdomains']
        assert await settings.resolve_ipv4(info) == cfg['settings']['ipv4']
        assert await settings.resolve_ipv6(info) == cfg['settings']['ipv6']
        domains = await settings.resolve_domains(info)
        assert domains[0].id in cfg['domains']
        patcher.stop()

from unittest.mock import mock_open
import blenheim.schema.dns.dns as dnsmod


@patch('blenheim.library.dns.zonefile.ZoneFile.generate_zones', return_value=[('ex.com', 'data')])
@patch('blenheim.library.dns.named_conf_local.NamedConfLocal.generate_named_conf_local', return_value='conf')
@patch('blenheim.schema.dns.dns.check_docker_container', return_value=None)
@patch('blenheim.schema.dns.dns.check_root', return_value=None)
@patch('blenheim.schema.dns.dns.from_env')
@patch('builtins.open', new_callable=mock_open)
@pytest.mark.asyncio
async def test_dns_generate(m_open, mock_from_env, mock_root, mock_docker, mock_conf, mock_zone, tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        cfg['domains'] = {'ex.com': [{'subdomain': 'a'}]}
        token = 'tok'
        cfg[TOKENS][token] = {'user': 'admin', 'created': datetime.now().isoformat()}
        cfg.save()
        mock_from_env.return_value = SimpleNamespace(containers=SimpleNamespace(list=lambda filters: [SimpleNamespace(restart=lambda: None)]))
        dns = dnsmod.Dns()
        patcher = patch.object(Authentication, 'expire_tokens', lambda: None)
        patcher.start()
        info = SimpleNamespace(context={'request': SimpleNamespace(headers={'Authorization': token}), 'current_user': cfg[USERS]['admin']})
        result = await dns.resolve_generate(info)
        patcher.stop()
        assert result.success


import blenheim.template.dns as dns_template
import os


def test_get_zonefile():
    path = dns_template.get_zonefile()
    assert path.endswith('zonefile.jinja2')
    assert os.path.isfile(path)

@pytest.mark.asyncio
async def test_dns_generate_errors(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        cfg = Config()
        cfg['domains'] = {'ex.com': []}
        cfg[TOKENS]['t'] = {'user':'admin','created':datetime.now().isoformat()}
        cfg.save()
        info = SimpleNamespace(context={'request': SimpleNamespace(headers={'Authorization':'t'}), 'current_user': cfg[USERS]['admin']})
        with patch.object(Authentication,'expire_tokens', new=lambda: None):
                with patch('blenheim.schema.dns.dns.check_docker_container', return_value=Result('bad')):
                    res = await dnsmod.Dns().resolve_generate(info)
                    assert res.error == 'bad'
                with patch('blenheim.schema.dns.dns.check_docker_container', return_value=None), \
                     patch('blenheim.schema.dns.dns.check_root', return_value=Result('bad2')):
                    res = await dnsmod.Dns().resolve_generate(info)
                    assert res.error == 'bad2'
                orig_open = builtins.open
                def open_side_effect(path, *args, **kwargs):
                    if str(path) == str(cfg_file):
                        return orig_open(path, *args, **kwargs)
                    return mock_open()(path, *args, **kwargs)

                with patch('blenheim.schema.dns.dns.check_root', return_value=None), \
                     patch('builtins.open', side_effect=open_side_effect), \
                     patch('blenheim.library.dns.zonefile.ZoneFile.generate_zones', return_value=[('ex.com','data')]), \
                     patch('blenheim.library.dns.named_conf_local.NamedConfLocal.generate_named_conf_local', return_value='conf'), \
                     patch('blenheim.schema.dns.dns.from_env', return_value=SimpleNamespace(containers=SimpleNamespace(list=lambda filters: []))):
                    res = await dnsmod.Dns().resolve_generate(info)
                    assert res.error == 'Could not find bind9 docker container.'
