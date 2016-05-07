#!/bin/bash
role_name='lambda_execution_weekend_test_1'

# IAM trust policy

aws iam create-role \
  --role-name "$role_name" \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "",
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }'

# IAM access policy

aws iam put-role-policy \
  --role-name  "$role_name" \
  --policy-name "lambda_execution_access_policy" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": "arn:aws:logs:*:*:*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "s3:*"
        ],
        "Resource": [
          "arn:aws:s3:::*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "lambda:*"
        ],
        "Resource": [
          "arn:aws:lambda:*:*:*"
        ]
      }
    ]
  }'


AWS_IAM_ROLE=$(aws iam get-role \
 --role-name  "$role_name" \
 --output text \
 --query 'Role.Arn')

echo $AWS_IAM_ROLE

export AWS_IAM_ROLE=$AWS_IAM_ROLE
