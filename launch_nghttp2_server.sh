#!/bin/bash

cd public
nghttpd -v 3001 ../keys/server.key ../keys/server.crt
