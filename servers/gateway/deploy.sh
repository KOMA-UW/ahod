#!/bin/bash
./build.sh
../db/build.sh

export TLSCERT=/etc/letsencrypt/live/api.payinpayout.tech/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/api.payinpayout.tech/privkey.pem

export MYSQL_ROOT_PASSWORD=password
export MYSQL_DATABASE=messagesDB
export MYSQL_ADDR=messagesMYSQLDB:3306
export DSN="root:$MYSQL_ROOT_PASSWORD@tcp\(messagesMYSQLDB:3306\)/messagesDB"

export SESSIONKEY="sessionkey"
export REDISSVR=redisServer:6379

export MESSAGESADDR=messaging:80


ssh -i ~/.ssh/aws-capstone-2019.pem ec2-user@54.191.200.168 'bash -s'<< EOF
    

    docker rm -f gateway
    docker rm -f messagesMYSQLDB
    docker rm -f redisServer
    docker rm -f messaging
    docker rm -f mongo

    docker network rm ahod-net

    docker network create ahod-net
    
    docker pull uwkoma/koma-mysql

    

    docker pull uwkoma/gateway


    docker run -d \
    --name mongo \
    --network ahod-net \
    mongo

    docker run -d \
    --name messaging \
    --network ahod-net \
    -e MONGO=mongo:27017 \
    uwkoma/messaging


    docker run -d --name redisServer \
    --network ahod-net \
    redis

    docker run -d \
    --name messagesMYSQLDB \
    --network ahod-net \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e MYSQL_DATABASE=$MYSQL_DATABASE \
    -v /my/own/datadir:/var/lib/mysql \
    uwkoma/koma-mysql

    sleep 20

    docker run -d \
    --name gateway \
    --network ahod-net \
    -p 443:443 \
    -e DSN=$DSN \
    -e REDISADDR=$REDISSVR \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e MESSAGESADDR=$MESSAGESADDR \
    uwkoma/gateway

EOF
