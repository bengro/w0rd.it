#!/usr/bin/env bash

./node_modules/.bin/firebase functions:config:get
./node_modules/.bin/firebase functions:config:set app.recaptcha_secret=???