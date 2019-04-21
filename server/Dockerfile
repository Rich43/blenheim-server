FROM python:latest

RUN apt update
RUN apt install -y bind9

WORKDIR /app

COPY . .

RUN python setup.py bdist_wheel

WORKDIR /app/dist

RUN find -maxdepth 1 -type f -name '*.whl' -exec pip install {} \;

WORKDIR /app

EXPOSE 8000/tcp

ENTRYPOINT [ "./docker.sh" ]
CMD [ "--host", "0.0.0.0", "--workers", "8", "blenheim:app" ]
