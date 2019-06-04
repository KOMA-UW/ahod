./build.sh

export ADDR=groups:80
export SENDGRID_API_KEY='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'
export PUSHER_APP_ID=789947
export PUSHER_APP_KEY='170bc70f7f0348119879'
export PUSHER_APP_SECRET='eb11a0511bd5e648f4a9'

ssh -i ~/.ssh/aws-capstone-2019.pem ec2-user@54.191.200.168 'bash -s' << EOF

docker rm -f groups || true
docker rm -f groupsdb || true

docker network create --driver bridge ahodnet || true

docker pull uwkoma/groups
docker run -d --name groupsdb --network ahodnet mongo


sleep 20

docker run -d \
--name groups \
--network ahodnet \
-e ADDR=$ADDR \
-e SENDGRID_API_KEY=$SENDGRID_API_KEY \
-e PUSHER_APP_ID=$PUSHER_APP_ID \
-e PUSHER_APP_KEY=$PUSHER_APP_KEY \
-e PUSHER_APP_SECRET=$PUSHER_APP_SECRET \
uwkoma/groups
EOF