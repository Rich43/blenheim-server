# Project Roadmap

This document outlines the planned development path for **Blenheim Server** and lists the features that are already implemented.

## Completed Features

- GraphQL API for managing DNS settings and zone generation
- Token‑based authentication with login, logout, current user and password change
- Automatic generation of `named.conf.local` and zone files for `bind9`
- Docker container deployment exposing the API on port 8000
- Configuration stored in `config.json` and managed through GraphQL mutations
- Restart of the `bind9` container after zone generation

## Planned Features

1. **Role‑based Access Control** – allow creation of multiple user accounts with distinct permissions.
2. **Web User Interface** – provide a simple front end for domain and subdomain management.
3. **DNSSEC Support** – enable signing of zones and key management.
4. **Automated Certificate Management** – integrate with Let's Encrypt for HTTPS certificates.
5. **Audit Logging** – track configuration changes and authentication events.
6. **Metrics and Monitoring** – expose operational metrics and health checks.
7. **High‑Availability Deployment** – support redundant DNS servers and failover.

These goals are subject to change as development progresses.
