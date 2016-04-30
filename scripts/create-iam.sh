# IAM trust policy

aws iam create-role \
  --role-name "lambda_execution" \
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
  --role-name  "lambda_execution" \
  --policy-name "lambda_execution_access_policy" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [ "logs:*", "dynamo:*", "cloudsearch:*" ],
        "Resource": [
          "arn:aws:logs:*:*:*",
          "arn:aws:dynamodb:*:*:*",
          "arn:aws:cloudsearch:*:*:*"
        ]
      }
    ]
  }'
