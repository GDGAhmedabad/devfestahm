#!/bin/bash

# Check if an environment argument is provided
if [ -z "$1" ]; then
  echo "Please provide an environment argument (develop or prod)."
  exit 1
fi

# Define the paths to the serviceAccount and firebase files
SERVICE_ACCOUNT_DEVELOP="./local/develop/serviceAccount.json"
SERVICE_ACCOUNT_PROD="./local/production/serviceAccount.json"
FIREBASE_DEVELOP="./local/develop/firebase.json"
FIREBASE_PROD="./local/production/firebase.json"

# Set the deploy command based on the provided environment
if [ "$1" == "develop" ]; then
  cp "$SERVICE_ACCOUNT_DEVELOP" "./serviceAccount.json"
  cp "$FIREBASE_DEVELOP" "./firebase.json"
  echo "Environment: develop"
  cat "./serviceAccount.json"
  echo "Files updated"
  echo "Started build and deploy process for develop"
  npx firebase use devfestahm-develop
  # npm run build && NODE_ENV=development firebase deploy
  BUILD_ENV=development npm run deploy
elif [ "$1" == "prod" ]; then
  cp "$SERVICE_ACCOUNT_PROD" "./serviceAccount.json"
  cp "$FIREBASE_PROD" "./firebase.json"
  echo "Environment: prod"
  cat "./serviceAccount.json"
  echo "Files updated"
  echo "Started build and deploy process for prod"
  npx firebase use devfestahm-master
  # npm run build && NODE_ENV=production firebase deploy
  npm run deploy
else
  echo "Invalid environment argument. Please use 'develop' or 'prod'."
  exit 1
fi
