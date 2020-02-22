#!/bin/bash

WEB_PATH=$(dirname $0)
cd $WEB_PATH
cd ..

echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/master && git pull
git checkout master

# decompression
sh ${WEB_PATH}/decompression.sh
