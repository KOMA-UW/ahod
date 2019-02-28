#!/bin/bash
./build.sh

ssh -i ~/.ssh/aws-capstone-2019.pem ec2-user@34.212.142.226 'bash -s'<< EOF
    
    docker rm -f app-nginx
    docker pull uwkoma/app-nginx


    docker run -d \
    --name app-nginx \
    -p 443:443 \
    -p 80:80 \
    uwkoma/app-nginx

EOF
