FROM python:latest

WORKDIR /app/server

COPY blenheim_server-0.1-py3-none-any.whl .

RUN pip install blenheim_server-0.1-py3-none-any.whl

WORKDIR /app

COPY docker.sh .

EXPOSE 8000/tcp

ENTRYPOINT [ "./docker.sh" ]
CMD [ ]
