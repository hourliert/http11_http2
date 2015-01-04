#!/bin/bash


#REMEMBER to desactivate ssl in nginx !
nghttpx --http2-bridge -LINFO --backend=127.0.0.1,3002 --frontend=127.0.0.1,3001 ../keys/proxy.key ../keys/proxy.crt

