#!/usr/bin/env bash

source ./.deploy-env

serverless deploy \
--stage $STAGE \
--aws-profile $AWSPROFILE \
--region us-west-2 \
--cognitopool "$COGNITO_POOL" \
--securitygroup "$LAMBDA_SECURITY_PHYSICAL_ID" \
--subnetid1 $SUBNET_1 \
--subnetid2 $SUBNET_2 \
--subnetid3 $SUBNET_3 \
--host "$DBHOST" \
--pass "$DBPASS" \
--user "admin"
