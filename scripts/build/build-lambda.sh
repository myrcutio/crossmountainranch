#!/usr/bin/env bash

cp -R . /tmp
cd /tmp
next build && next export

aws s3 sync ./out s3://crossmountainranch.org --acl public-read --cache-control 60
#aws cloudfront create-invalidation --distribution-id E2QSXIUGWYI6KF --paths "/*"
