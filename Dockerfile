FROM python:latest

RUN apt update
RUN apt install -y bind9

WORKDIR /app/bind_backup

RUN cp -rfv /etc/bind/* .

WORKDIR /app/server

COPY blenheim.whl .

RUN pip install blenheim.whl

WORKDIR /app

COPY docker.sh .

EXPOSE 8000/tcp
EXPOSE 53/tcp
EXPOSE 53/udp

ENTRYPOINT [ "./docker.sh" ]
CMD [ ]
