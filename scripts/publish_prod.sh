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

# Manually build package files
npm run build

# And away we go!
echo "Publishing from $CIRCLE_BRANCH" 

npm publish

if [ $? -eq 0 ]; then
    echo "Publishing to npm"
else
    echo "Could not publish to npm"
fi