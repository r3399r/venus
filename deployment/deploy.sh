#!/bin/bash
set -e

env=prod
project=venus
subDomain=wedding
domain=celestialstudio.net

echo ====================================================================================
echo env: prod
echo project: $project
echo domain: $subDomain.$domain
echo ====================================================================================

echo deploy backend AWS...
cd ../backend
npm i
npm run richmenu -- $env
npm run pre:deploy
aws cloudformation package --template-file aws/cloudformation/template.yaml --output-template-file packaged.yaml --s3-bucket y-cf-midway-singapore
aws cloudformation deploy --template-file packaged.yaml --stack-name $project-$env-stack --parameter-overrides TargetEnvr=$env Project=$project SubDomain=$subDomain Domain=$domain --no-fail-on-empty-changeset --s3-bucket y-cf-midway-singapore
echo ====================================================================================

echo deploy frontend to S3...
cd ../frontend
export liff=$(aws ssm get-parameter --name $project-$env-liff | jq .Parameter.Value | sed -e 's/^"//' -e 's/"$//')
npm i
npm run build
mkdir -p ./dist/img08150958
cp -R ../backend/public/img08150958 ./dist
aws s3 sync ./dist s3://$project-$env-y --delete --cache-control no-cache
echo ====================================================================================
