if [ "$TRAVIS_BRANCH" = "develop" -o "$TRAVIS_BRANCH" = "master" ]; then
  sudo apt-get update
  sudo apt-get install sshpass
  yarn build:example
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
fi
if [ "$TRAVIS_BRANCH" = "develop" ]; then
  docker build -t $DOCKER_IMG_TEST .
  docker push $DOCKER_IMG_TEST
  sshpass -p $ALI_CLOUD_PASSWORD ssh -o stricthostkeychecking=no $ALI_CLOUD_USER "cd $SERVER_TEST_PATH && ./docker-update.sh "
fi
if [ "$TRAVIS_BRANCH" = "master" ]; then
  docker build -t $DOCKER_IMG_PROD .
  docker push $DOCKER_IMG_PROD
  sshpass -p $ALI_CLOUD_PASSWORD ssh -o stricthostkeychecking=no $ALI_CLOUD_USER "cd $SERVER_PROD_PATH && ./docker-update.sh "
fi