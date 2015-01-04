#!/bin/bash


#REMEMBER to desactivate ssl in nginx !
nghttpx -LINFO --backend=127.0.0.1,3000 --frontend=127.0.0.1,3001 ../keys/proxy.key ../keys/proxy.crt

