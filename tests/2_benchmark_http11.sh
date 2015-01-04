#!/bin/bash

siege -q -c100 -b -r100 https://localhost:3000/Multiplexing.html
