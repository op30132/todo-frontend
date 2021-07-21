FROM nginxinc/nginx-unprivileged

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT \$HEROKU_APP_BACKEND_URL' < /etc/nginx/conf.d/default.conf   > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'