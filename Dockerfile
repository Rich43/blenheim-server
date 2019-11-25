FROM python:latest

RUN apt update
RUN apt install -y bind9

WORKDIR /app/bind_backup

RUN cp -rfv /etc/bind/* .

WORKDIR /app/server

COPY server .

RUN rm -rfv config
RUN rm -rfv venv
RUN rm -rfv .idea

RUN python setup.py bdist_wheel

WORKDIR /app/server/dist

RUN find -maxdepth 1 -type f -name '*.whl' -exec pip install {} \;

WORKDIR /app/client

COPY client .

RUN rm -rfv node_modules
RUN rm -rfv .idea

RUN apt install -y npm
RUN npm install -g npm@latest
RUN npm install -g n

RUN n stable

RUN npm i

WORKDIR /app

COPY docker.sh .

EXPOSE 8000/tcp
EXPOSE 3000/tcp
EXPOSE 53/tcp
EXPOSE 53/udp

ENTRYPOINT [ "./docker.sh" ]
CMD [ ]
