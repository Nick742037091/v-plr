git checkout master
git merge develop

VERSION=`npx select-version-cli`

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  yarn build

  # commit
  git add .
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish
  git push upstream master
  git push upstream refs/tags/v$VERSION
  git checkout develop
  git rebase master
  git push upstream develop

  npm publish
fi
