#!/bin/bash

cd ../public
nghttpd -v 3002 --push=/push.html=/images/chaton.png ../keys/server.key ../keys/server.crt
#nghttpd -v 3001 ../keys/server.key ../keys/server.crt
