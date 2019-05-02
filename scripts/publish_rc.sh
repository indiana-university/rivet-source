#!/bin/bash

# Guard against unintended execution.
if [[ $CIRCLE_BRANCH == "" ]] ; then
    echo "This script is intended to be run from Circle CI. Buh-bye now!"
    exit 0
fi 

if [[ $CIRCLE_BRANCH != "release"* ]] && [[ $CIRCLE_BRANCH != "hotfix"* ]] ; then
    echo "This script is intended to be run only on release/hotfix branches. Buh-bye now!"
    exit 0
fi

# And away we go!
echo "Publishing from $CIRCLE_BRANCH" 

# Get the version number from the branch name.
# Ex: release/v1.2.3 => 1.2.3
[[ $CIRCLE_BRANCH =~ [0-9]+\.[0-9]+\.[0-9]+ ]]
VERSION=$BASH_REMATCH

# Set the RC version as a combo of the branch version and the circle build number.
RC_VERSION="$VERSION-rc.$CIRCLE_BUILD_NUM"

# Update package.json with the latest version number
echo "Updating package.json version to $RC_VERSION..."
npm version $RC_VERSION --no-git-tag-version --no-commit-hooks

# Manually build package files
npm run build

# Form the tag with the number of commits to this branch and publish the package.
echo "Publishing package to NPM tag 'rc' with version '$RC_VERSION' ..."
npm publish --tag rc

if [ $? -eq 0 ]; then
    echo "Package.json updated to version $RC_VERSION. Commiting updated package.json..."
    # Configure the github credentials
    git config credential.helper 'cache --timeout=120'
    git config user.email "iubot@iu.edu"
    git config user.name "iubot"
    # Stage the change to package.json
    git add package.json
    git commit -m "Circle CI: update package.json version. [skip ci]"
    # Push quietly to prevent showing the token in log
    echo "Pushing updated package.json to origin..."
    git push -q https://${GH_TOKEN}@github.com/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}.git $CIRCLE_BRANCH
else
    echo "Could not publish to npm. Not adding package.json to github commit or pushing changes."
fi