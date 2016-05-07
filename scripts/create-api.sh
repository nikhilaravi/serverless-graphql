#!/bin/bash

api_name='serverless-graphql-demo-fac'
api_description="Graphql endpoint"
root_path=/
resource_path=graphql
stage_name=prod
region=$AWS_REGION
account_id=$AWS_ACCOUNT_ID
lambda_function="serverless-graphql-v2"
random_id1=$[(RANDOM+RANDOM)*100000]
random_id2=$[(RANDOM+RANDOM)*100000]

# create API

api_id=$(aws apigateway create-rest-api \
  --region "$region" \
  --name "$api_name" \
  --description "$api_description" \
  --output text \
  --query 'id')

echo api_id=$api_id

# Get resource id of root path

parent_id=$(aws apigateway get-resources \
  --region "$region" \
  --rest-api-id "$api_id" \
  --output text \
  --query 'items[?path==`'$root_path'`].[id]')
echo parent_id=$parent_id

# Get resource id of resource path

resource_id=$(aws apigateway create-resource \
  --rest-api-id "$api_id"  \
  --parent-id "$parent_id" \
  --path-part "$resource_path" \
  --output text \
  --query 'id')
  echo resource_id=${resource_id}

# create a post method on the resource path

aws apigateway put-method \
  --region "$region" \
  --rest-api-id "$api_id" \
  --resource-id "$resource_id" \
  --http-method POST \
  --authorization-type NONE

# create integration with lambda function

aws apigateway put-integration \
  --rest-api-id "$api_id" \
  --resource-id "$resource_id" \
  --http-method POST \
  --type AWS \
  --integration-http-method POST \
  --uri arn:aws:apigateway:$region:lambda:path/2015-03-31/functions/arn:aws:lambda:$region:$account_id:function:$lambda_function/invocations

# set the POST method response to JSON

aws apigateway put-method-response \
  --rest-api-id "$api_id" \
  --resource-id "$resource_id" \
  --http-method POST \
  --status-code 200 \
  --response-models "{\"application/json\": \"Empty\"}" \
  --response-parameters '{"method.response.header.Access-Control-Allow-Origin":true}'

# set the POST method integration response to JSON. This is the response type that Lambda function returns.

aws apigateway put-integration-response \
  --rest-api-id "$api_id" \
  --resource-id "$resource_id" \
  --http-method POST \
  --status-code 200 \
  --response-templates "{\"application/json\": \"\"}" \
  --response-parameters '{"method.response.header.Access-Control-Allow-Origin":"'"'*'"'"}'

# add permissions to lambda to call api gateway

aws lambda add-permission \
  --function-name "$lambda_function" \
  --statement-id $random_id1 \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$region:$account_id:$api_id/prod/POST/$resource_path"

# # grant the Amazon API Gateway service principal (apigateway.amazonaws.com) permissions to invoke your Lambda function

aws lambda add-permission \
  --function-name "$lambda_function" \
  --statement-id $random_id2 \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:$region:$account_id:$api_id/*/POST/$resource_path"

# deploy the API

deployment_id=$(aws apigateway create-deployment \
  --region "$region" \
  --rest-api-id "$api_id" \
  --description "$api_name deployment" \
  --stage-name "$stage_name" \
  --stage-description "$api_name $stage_name" \
  --output text \
  --query 'id')

echo deployment_id=$deployment_id

# test invoke

aws apigateway test-invoke-method \
  --rest-api-id "$api_id"  \
  --resource-id "$resource_id" \
  --http-method POST \
  --path-with-query-string "" \
  --body '{"query":"query($query: String){\n  suggestions(query:$query) {\n    name\n  }\n}","variables":"{\n  \"query\": \"stronger\"\n}"}'
