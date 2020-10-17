#!/bin/bash

WEB_PATH=$(dirname $0)
cd $WEB_PATH
cd ..

cd ./product
echo "[deploy] Delete old files..."
rm -r ./www
echo "[deploy] Decompression tar..."
mkdir www
tar -xvf ./www.tar.gz -C ./www
echo "[deploy] Finished."
