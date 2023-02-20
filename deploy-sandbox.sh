#!/bin/bash

# Load environment variables

set -a
source .env
set +a

# Set production flag to FALSE by default

production=false

# Set production flag to TRUE if -P flag was passed

while getopts ':P' opt; do
  case ${opt} in
    P) production=true
  esac
done

if [[ "$production" = true ]]; then
  
  # Require confirmation for production deployment

  echo "[rsync] Confirm production sandbox deployment by entering 'ok', enter 'no' to cancel:"
  
  read ok_no
  
  if [[ "$ok_no" = "ok" ]]; then

    # Deployment confirmed, deploy to Sitehost

    echo "[rsync] Deploying sandbox to Sitehost..."
    rsync -av --delete ./dist/ $RSYNC_LIVE
  
  else

    # Deployment cancelled

    echo "[rsync] Deployment cancelled"
  
  fi

else

  # Deploy to Sitehost-Test

  echo "[rsync] Deploying sandbox to Sitehost-Test..."
  rsync -av --delete ./dist/ $RSYNC_TEST

fi