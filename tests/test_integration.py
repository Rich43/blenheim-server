import json
from types import SimpleNamespace
from unittest.mock import patch, mock_open

from starlette.testclient import TestClient

from blenheim import app

def gql(client, query, headers=None):
    response = client.post('/graphql', json={'query': query}, headers=headers)
    assert response.status_code == 200
    return response.json()


def test_graphql_login_and_settings(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        with TestClient(app) as client:
            login_query = (
                'mutation { authentication { login(details:{name:"admin", password:"Password1"}) } }'
            )
            data = gql(client, login_query)
            token = data['data']['authentication']['login']
            assert token

            headers = {'Authorization': token}
            user_query = 'query { authentication { currentUser { name } } }'
            data = gql(client, user_query, headers=headers)
            assert data['data']['authentication']['currentUser']['name'] == 'admin'

            settings_query = 'query { settings { ipv4 } }'
            data = gql(client, settings_query, headers=headers)
            from blenheim.config import Config
            assert data['data']['settings']['ipv4'] == Config()['settings']['ipv4']


def test_graphql_dns_generate(tmp_path):
    cfg_file = tmp_path / 'config.json'
    with patch('blenheim.config.FILENAME', cfg_file):
        with TestClient(app) as client:
            login_query = (
                'mutation { authentication { login(details:{name:"admin", password:"Password1"}) } }'
            )
            token = gql(client, login_query)['data']['authentication']['login']
            headers = {'Authorization': token}

            orig_open = open
            def open_side_effect(path, *args, **kwargs):
                if str(path) == str(cfg_file):
                    return orig_open(path, *args, **kwargs)
                return mock_open()(path, *args, **kwargs)

            with patch('blenheim.schema.dns.dns.from_env') as mock_from_env, \
                 patch('blenheim.schema.dns.dns.check_root', return_value=None), \
                 patch('blenheim.schema.dns.dns.check_docker_container', return_value=None), \
                 patch('blenheim.library.dns.named_conf_local.NamedConfLocal.generate_named_conf_local', return_value='conf'), \
                 patch('blenheim.library.dns.zonefile.ZoneFile.generate_zones', return_value=[('ex.com', 'data')]), \
                 patch('builtins.open', side_effect=open_side_effect):
                mock_from_env.return_value = SimpleNamespace(
                    containers=SimpleNamespace(list=lambda filters: [SimpleNamespace(restart=lambda: None)])
                )
                query = 'query { dns { generate { success error } } }'
                data = gql(client, query, headers=headers)
                assert data['data']['dns']['generate']['success']

