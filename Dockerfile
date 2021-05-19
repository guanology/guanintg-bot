FROM postgres
LABEL maintainer="himself65@outlook.com"

EXPOSE 5432

ENV POSTGRES_USER=bread
ENV POSTGRES_DB=bread
ENV POSTGRES_PASSWORD=123456

COPY ./scripts/github.sql /docker-entrypoint-initdb.d/
COPY ./scripts/telegram.sql /docker-entrypoint-initdb.d/
