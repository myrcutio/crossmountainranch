#!/usr/bin/env bash

source ./.env

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -p|--password)
    DBPASS="$2"
    shift # past argument
    ;;
    -d|--db)
    DBHOST="$2"
    shift # past argument
    ;;
    *)
    ;;
esac
shift # past argument or value
done

serverless deploy \
--stage dev \
--aws-profile $AWSPROFILE \
--region us-west-2 \
--securitygroup "$LAMBDA_SECURITY_PHYSICAL_ID" \
--subnetid1 $SUBNET_1 \
--subnetid2 $SUBNET_2 \
--subnetid3 $SUBNET_3 \
--host "$DBHOST" \
--pass "$DBPASS" \
--user "admin"
