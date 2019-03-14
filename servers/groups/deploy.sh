./build.sh

ssh -i ~/.ssh/aws-capstone-2019.pem ec2-user@54.191.200.168 'bash -s' << EOF

docker pull uwkoma/groups_api

docker rm -f groups_api || true
docker rm -f groupdb || true

docker run -d --name groupdb --network groups mongo

sleep 20 

docker run -d \
--network groups \
--name groups_api \
uwkoma/groups_api

EOF