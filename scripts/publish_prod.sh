#!/bin/bash

# Guard against unintended execution.
if [[ $CIRCLE_BRANCH == "" ]] ; then
    echo "This script is intended to be run from Circle CI. Buh-bye now!"
    exit 0
fi 

if [[ $CIRCLE_BRANCH != "master" ]] ; then
    echo "This script is intended to be run only on master. Buh-bye now!"
    exit 0
fi

# And away we go!
echo "Publishing from $CIRCLE_BRANCH" 

npm publish

if [ $? -eq 0 ]; then
    echo "Dist package updated. Pushing changes back to github."
    # Configure the github credentials
    git config credential.helper 'cache --timeout=120'
    git config user.email "iubot@iu.edu"
    git config user.name "iubot"
    # Stage the change to dist
    git add dist
    git add docs
    git commit -m "Circle CI: update package.json version. [skip ci]"
    # Push quietly to prevent showing the token in log
    echo "Pushing updated package.json to origin..."
    git push -q https://${GH_TOKEN}@github.com/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}.git $CIRCLE_BRANCH
else
    echo "Could not publish to npm. Not adding package.json to github commit or pushing changes."
fi