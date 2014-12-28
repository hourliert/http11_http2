#!/bin/bash


trap "sudo killall nginx && exit" SIGINT SIGTERM
sudo nginx -c /home/thomas/developpment/jsProjects/http11_http2/nginx_conf/nginx.conf
while true; do
    sleep 1
done
