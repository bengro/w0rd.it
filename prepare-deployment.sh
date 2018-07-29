#!/usr/bin/env bash

mkdir -p temp-deploy

cp -R backend/ temp-deploy
cp -R ui/dist/ temp-deploy/ui

lpass show --notes w0rd.it-credentials > temp-deploy/db/config.php

