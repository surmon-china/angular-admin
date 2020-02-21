#!/bin/bash

WEB_PATH=$(dirname $0)
cd $WEB_PATH
cd ..

echo "[deploy] pulling source code..."
git fetch --all && git reset --hard origin/master && git pull
git checkout master

cd ./product

echo "[deploy] Delete old files..."
rm -r ./www
echo "[deploy] Decompression tar..."
mkdir www
tar -xvf ./dist.tar.gz -C ./www
echo "[deploy] Finished."
