npm run build:example
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t qq742037091/v-plr:latest .
docker push qq742037091/v-plr:latest
sshpass -p $ALI_CLOUD_PASSWORD ssh -o stricthostkeychecking=no $ALI_CLOUD_USER "cd /var/project/v-plr/ && ./docker-update.sh "
