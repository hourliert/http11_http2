#!/bin/bash

siege -q -c10 -b -r1000 https://localhost:3000/Multiplexing.html
