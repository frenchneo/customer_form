FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=Password$13
ENV MYSQL_DATABASE=customerform
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=Password$13
COPY init.sql /docker-entrypoint-initdb.d/
