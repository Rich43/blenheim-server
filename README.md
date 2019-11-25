Blenheim
--------

1. Install docker
2. `docker build .`
3. `docker volume create blenheim_bind`
4. `docker volume create blenheim_config`
5. `docker run -v blenheim_bind:/etc/bind -v blenheim_config:/app/server/config xxxxxxxxxxxx`
