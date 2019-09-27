FROM nginx

COPY ./dist-example /usr/share/nginx/html

EXPOSE 80