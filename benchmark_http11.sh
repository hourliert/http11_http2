#!/bin/bash

siege -q -c10 -b -r100 https://localhost:3000/Multiplexing.html
