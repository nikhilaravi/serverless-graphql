# Serverless-GraphQ

A Serverless app built using AWS Lambda, React, GraphQL, API Gateway and Node.js!

This repo has all the code for the GraphQL Lambda function and creation of an API Gateway endpoint.

The GraphQL IDE and UI live here: https://github.com/nikhilaravi/serverless-graphql-app

## Before you start
- Create an Amazon account
- Get your access key id and secret access key and export then as environment variables
- Give your user super access - add an administrator access policy

## Create a graphql lambda function and connect it to an api gateway endpoint with just one command!

```sh
npm run deploy-lambda && npm run create-api
```

The lambda function is uploaded using the `dpl` node module. The componets of the function are specified in the 'files_to_deploy' key in the package.json. The important file is `index.js` which must contain an `exports.handler` function which accepts `event` and `context` parameters. The node modules in the `dependencies` are also zipped along with any other files that are specifed before being uploaded to AWS Lambda (either updating a function or creating a new function if it doesn't exist).

Have a look at the notes in the [dpl npm module docs](https://github.com/numo-labs/aws-lambda-deploy) or ask @nelsonic for more info!

The `aws-cli` is used to create the API Gateway endpoint and link it to the lambda function.

Have a look at the create-api.sh file for the step by step process.

## Enable CORS in the AWS Console and get the invoke URL

> When your API's resources receive requests from a domain other than the API's own domain, you must enable cross-origin resource > sharing (CORS) for selected methods on the resource.

This can be done in the AWS Console.

![enablecors](https://cloud.githubusercontent.com/assets/5912647/14939120/89607546-0f31-11e6-8b3f-37bf4b0c0a4d.png)

Navigate to the stages section and select 'prod'. You can then find the api invoke url. This will be needed to set up the GraphQL IDE (GraphiQL) and for the UI to invoke the lambda function

![invokeurl](https://cloud.githubusercontent.com/assets/5912647/14939122/8e752b30-0f31-11e6-83ee-81665d2f2856.png)
