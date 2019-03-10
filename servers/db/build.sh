#!/bin/bash
export MYSQL_IMAGE=uwkoma/koma-mysql
docker build -t $MYSQL_IMAGE .

docker push $MYSQL_IMAGE