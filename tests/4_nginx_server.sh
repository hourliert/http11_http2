#!/bin/bash


trap "sudo killall nginx && exit" SIGINT SIGTERM
sudo nginx -c /home/thomas/developpment/jsProjects/http11_http2/nginx_conf/nginx2.conf
while true; do
    sleep 1
done
