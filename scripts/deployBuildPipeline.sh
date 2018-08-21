#!/usr/bin/env bash

mv ./serverless.yml ./serverless.yml.main
mv ./serverless.build.yml ./serverless.yml

source ./.deploy-env

serverless deploy \
--stage $STAGE \
--aws-profile $AWSPROFILE \
--s3Bucket $DEPLOY_BUCKET \
--distributionId "$CDN_DISTRIBUTION_ID" \
--region us-west-2 \

mv ./serverless.yml ./serverless.build.yml
mv ./serverless.yml.main ./serverless.yml
