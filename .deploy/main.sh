#!/bin/bash

SHELL_PATH=$(dirname $0)
cd $WEB_PATH
cd ..
cd ./product

echo "[deploy] Delete files..."
ls | grep -v dist.tar | xargs rm -r
echo "[deploy] Decompression dist.tar..."
tar -xvf dist.tar -C ./
echo "[deploy] Delete dist.tar..."
rm dist.tar
echo "[deploy] Finished."
