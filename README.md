# Serverless-GraphQL

A Serverless Jukebox app built using AWS Lambda, React, GraphQL, API Gateway and Node.js. You can search for songs using the [Last.fm api](http://www.last.fm/api) and save the names of songs you like to a playlist.

## Technologies
- GraphQL
- AWS Lambda - hosts the GraphQL server
- AWS API Gateway - expose a public HTTP endpoint for the GraphQL lambda
- Node.js

## Architecture

![architecture](https://cloud.githubusercontent.com/assets/5912647/15094803/deb865aa-14a7-11e6-870f-1fe552ead186.png)

This repo has all the code for the GraphQL Lambda function and creation of an s3 bucket and API Gateway endpoint connected to the lambda function.

In addition to the GraphQL Lambda there are three other lambda functions

* [**song-suggester**](https://github.com/nikhilaravi/song-suggester) - Queries the Last.fm api to retrieve song suggestions
* [**s3-save**](https://github.com/nikhilaravi/s3-save) - Saves a selected song to an s3 bucket
* [**s3-get**](https://github.com/nikhilaravi/s3-get) - Retrieves all songs from an s3 bucket

The GraphQL IDE and UI live here: https://github.com/nikhilaravi/serverless-graphql-app

## Before you start
- Create an account on [Amazon](https://aws.amazon.com/console/)
- Get your access key id and secret access key. Give your user super access - add an administrator access policy so you can create lambdas, api endpoints etc using the aws-cli.
- Install the [aws-cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-bundle-other-os) and configure it with your credentials by typing `aws configure` and pressing Enter. This interactive command will prompt you for your access keys and region.
- Get a last.fm api key by creating an account [https://secure.last.fm/login?next=/api/account/create](https://secure.last.fm/login?next=/api/account/create)

Add the following environment variables to a .env file
```sh
AWS_ACCOUNT_ID=[your_account_id_here]
AWS_ACCESS_KEY_ID=[your_key_here]
AWS_SECRET_ACCESS_KEY=[your_secret_here]
AWS_REGION=[aws_region] (e.g. 'eu-west-1')
API_KEY=[lastfm_api_key]
```

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

Modify the name of the bucket at the top of `./scripts/create-s3-bucket.sh` and also update the bucket name in the `.env` file (so the lambda knows which bucket to read and write to).

Create the bucket using the following command:

```sh
npm run create-s3
```

and to the `.env` file add:

``
S3_BUCKET='name of bucket'
``

### 3. Create the microservices

There are three microservices apart from the GraphQL microservice.

Clone the following repos and run `npm run deploy` for each one.

* [**song-suggester**](https://github.com/nikhilaravi/song-suggester) - Queries the Last.fm api to retrieve song suggestions (requires an `API_KEY` as an environment variable)
* [**s3-save**](https://github.com/nikhilaravi/s3-save) - Saves a selected song to an s3 bucket
* [**s3-get**](https://github.com/nikhilaravi/s3-get) - Retrieves all songs from an s3 bucket

The lambda functions are zipped and uploaded to AWS using the `dpl` node module. The components of the function are specified in the `files_to_deploy` key in the `package.json`. The important file is `index.js` which must contain an `exports.handler` function which accepts `event` and `context` parameters. The node modules in the `dependencies` in the `package.json` are also zipped along with any other files that are specified before being uploaded to AWS Lambda (either updating a function or creating a new function if it doesn't exist).

`dpl` names the lambda using the name in the `package.json` with the major version number suffixed e.g. _'serverless-graphql-v1'_.

Have a look at the notes in the [dpl npm module docs](https://github.com/numo-labs/aws-lambda-deploy) or ask @nelsonic for more info!

Then save the following three environment variables to the `.env` file in this repo - this will be used by the graphql lambda to call the correct microservice.

```sh
LAMBDA_SONG_SUGGESTER=song-suggester-v1
LAMBDA_S3_SAVE=s3-save-v1
LAMBDA_S3_GET=s3-get-v1
```

### 4. Create a GraphQL lambda function and connect it to an API GATEWAY endpoint.

Now time to deploy the GraphQL lambda function and connect it to the API endpoint!

To modify the name of the API you can edit the `./scripts/create-api.sh` file. You need to set the name of the lambda function at the top of this file.
Run the following command in your terminal window (which has all the environment variables set)

```sh
npm run deploy-app
```

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


## What about tests?

There are some example tests in the test folder for the GraphQL schema and services. You can run the tests with

```sh
npm test
```

The coverage isn't 100% yet but i'll be adding more tests soon!!

## TODO

* [ ] Add more notes on the AWS configuration and setting up of credentials and the cli
* [ ] Update the 'create-api' script to update the gateway endpoint if it has already been created
* [ ] Add a script to Enable CORS from the command line
