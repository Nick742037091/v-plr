if [ "$TRAVIS_BRANCH" = "develop" ]; then
  sudo apt-get update
  sudo apt-get install sshpass
  yarn build:example
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build -t qq742037091/v-plr-test:latest .
  docker push qq742037091/v-plr-test:latest
  sshpass -p $ALI_CLOUD_PASSWORD ssh -o stricthostkeychecking=no $ALI_CLOUD_USER "cd /var/project/v-plr/test && ./docker-update.sh "
fi
if [ "$TRAVIS_BRANCH" = "master" ]; then
  sudo apt-get update
  sudo apt-get install sshpass
  yarn build:example
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build -t qq742037091/v-plr:latest .
  docker push qq742037091/v-plr:latest
  sshpass -p $ALI_CLOUD_PASSWORD ssh -o stricthostkeychecking=no $ALI_CLOUD_USER "cd /var/project/v-plr/prdo && ./docker-update.sh "
fi