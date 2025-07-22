# Blenheim Server

This repository contains the server component of **Blenheim**, a small DNS management system. The server exposes a GraphQL API for updating zone information and for generating configuration files for `bind9`.

The application is distributed as a Docker container that exposes the API on port `8000`.

## Quick start

1. Install Docker on an Ubuntu host
2. See [blenheim-docker](https://github.com/Rich43/blenheim-docker) for an example deployment

Running the container will start a Starlette application with a GraphQL endpoint available at `/graphql`.

## Protocol

All interactions happen over GraphQL. After starting the server, visit `/graphql` in a browser to open the GraphiQL interface.

### Authentication

The API uses token based authentication. Log in with the `login` mutation and include the returned token in the `Authorization` header for subsequent requests. The default user is `admin` with password `Password1`.

```
mutation {
  authentication {
    login(details: {name: "admin", password: "Password1"})
  }
}
```

Other authentication fields include:

- `logout` – invalidate the current token
- `current_user` – returns the logged in user's name
- `change_password(password: String!)` – change the current user's password

### DNS

```
query {
  dns {
    generate { success error code }
  }
}
```

Calling `generate` creates zone files under `/etc/bind` and restarts the `bind9` container referenced by the configuration.

### Settings

The `settings` query exposes the current DNS configuration. Fields include:

- `default_subdomains: [String!]` – subdomains created for every domain
- `ipv4: [String!]` – IPv4 addresses used for name servers
- `ipv6: [String!]` – IPv6 addresses used for name servers
- `domains: [Domain!]` – configured domains and their sub‑domains

`Domain` objects contain an `id` and a list of `SubDomain` objects. A `SubDomain` has the fields `id`, `ip_address_v4` and `ip_address_v6`.

The `settings` mutation type allows creating, updating and deleting items in these lists. These mutations follow the patterns already defined in the schema, for example `create_domain`, `update_ipv4`, `delete_sub_domain_ip_address_v4` and so on.

## Configuration

Runtime configuration is stored in `config/config.json`. If the file does not exist, it will be created with default values on first run.


## Testing

Install the test dependencies and run the suite with:

```bash
pip install -r requirements-test.txt
pytest
```

The requirements file pins `httpx<0.25` and includes the `pytest-asyncio` plugin used by the async tests.

## 🖥 Setup Instructions

Run the setup script for your operating system:

**Linux:**
```bash
chmod +x setup_linux.sh
./setup_linux.sh
```

**macOS:**
```bash
chmod +x setup_mac.sh
./setup_mac.sh
```

**Windows (PowerShell):**
```powershell
.\setup_windows.ps1
```

After installation:
```bash
poetry shell
```
