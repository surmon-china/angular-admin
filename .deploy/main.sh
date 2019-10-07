#!/bin/bash

SHELL_PATH=$(dirname $0)
cd $WEB_PATH
cd ..
cd ./product

echo "[deploy] Delete files..."
ls | grep -v dist.tar | xargs rm -r
echo "[deploy] Decompression files..."
tar -xvf dist.tar
echo "[deploy] Finished."
