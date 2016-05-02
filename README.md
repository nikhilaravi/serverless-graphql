# Serverless-GraphQL

A Serverless Jukebox app built using AWS Lambda, React, GraphQL, API Gateway and Node.js. You can search for songs using the [Last.fm api](http://www.last.fm/api) and save the names of songs you like to a playlist.

## Technologies
- GraphQL
- AWS Lambda - hosts the GraphQL server
- AWS API Gateway - expose a public HTTP endpoint for the GraphQL lambda
- Node.js

This repo has all the code for the GraphQL Lambda function and creation of an, s3 bucket and API Gateway endpoint connected to the lambda function.

The GraphQL IDE and UI live here: https://github.com/nikhilaravi/serverless-graphql-app

## Before you start
- Create an Amazon account
- Get your access key id and secret access key and export then as environment variables
```sh
export AWS_ACCESS_KEY_ID='your_id_here'
export AWS_SECRET_ACCESS_KEY='your_id_here'
```
- Give your user super access - add an administrator access policy so you can create lambdas, api endpoints etc using the aws-cli

## Start building!

### 1. Create IAM Roles

AWS requires you to specify the permissions which are given to different resources e.g. who can view the objects inside an s3 bucket, who can invoke a lambda function etc.

These permissions are defined as policies and for different IAM roles which can then be assigned to different services or external services like CodeShip.

```sh
npm run create-iam
```

This will create an iam role for the lambda function and print it in the terminal.

***Export this as an environment variable***. This role will be used by the deploy script.

```sh
export AWS_IAM_ROLE="arn:account_id:role_name"
```

### 2. Create an s3 bucket to use as the data store

When a track is added to the playlist, it will be saved as a json file in s3. An s3 bucket needs to be created and given permission to be modified by other AWS services (i.e. permission to allow our Lambda to write and read from it).

Modify the name of the bucket at the top of `./scripts/create-s3-bucket.sh` and also update the bucket name in the `./config.json` file (so the lambda knows which bucket to read and write to).

Create the bucket using the following command:

```sh
npm run create-s3
```

### 3. Create a graphql lambda function and connect it to an api gateway endpoint.

Now time to deploy the lambda function and API! Run the following command in your terminal window (which has all the environment variables set)

```sh
npm run deploy-lambda && npm run create-api
```

The lambda function is uploaded using the `dpl` node module. The components of the function are specified in the `files_to_deploy` key in the `package.json`. The important file is `index.js` which must contain an `exports.handler` function which accepts `event` and `context` parameters. The node modules in the `dependencies` in the `package.json` are also zipped along with any other files that are specified before being uploaded to AWS Lambda (either updating a function or creating a new function if it doesn't exist).

Have a look at the notes in the [dpl npm module docs](https://github.com/numo-labs/aws-lambda-deploy) or ask @nelsonic for more info!

The `aws-cli` is used to create the API Gateway endpoint and link it to the lambda function.

Have a look at the `./scripts/create-api.sh` file for the step by step process.

The last command is a test invocation of the api gateway endpoint to check it has been connected correctly with the lambda. It should print a list of songs which have the name 'Stronger'!

### 4. Enable CORS in the AWS Console and get the invoke URL

> When your API's resources receive requests from a domain other than the API's own domain, you must enable cross-origin resource > sharing (CORS) for selected methods on the resource.

This can be done in the AWS Console.

![enablecors](https://cloud.githubusercontent.com/assets/5912647/14939120/89607546-0f31-11e6-8b3f-37bf4b0c0a4d.png)

Navigate to the stages section and select 'prod'. You can then find the api invoke url. This will be needed to set up the GraphQL IDE (GraphiQL) and for the UI to invoke the lambda function

![invokeurl](https://cloud.githubusercontent.com/assets/5912647/14939122/8e752b30-0f31-11e6-83ee-81665d2f2856.png)


## What's next?

GREAT! Your lambda and api are now ready for the front end!

Head over to https://github.com/nikhilaravi/serverless-graphql-app to learn how to deploy the GraphiQL IDE to query your schema and the UI for the Jukebox app!
