FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD='Password$13'
ENV MYSQL_USER='user'
ENV MYSQL_PASSWORD='Password$13'
ENV PORT=3307
EXPOSE 3307
VOLUME /var/lib/mysql
COPY ./init.sql /docker-entrypoint-initdb.d/