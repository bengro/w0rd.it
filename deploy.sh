#!/usr/bin/env bash

set -e

pushd webapp
npm install
npm run dist
popd

./node_modules/firebase-tools/lib/bin/firebase.js deploy
