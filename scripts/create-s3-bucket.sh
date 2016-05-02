bucket="serverless-graphql-demo-3"
region="eu-west-1"

aws s3api create-bucket \
  --bucket "$bucket" \
  --region "$region" \
  --create-bucket-configuration LocationConstraint="$region" \
  --acl "public-read" \

aws s3api put-bucket-policy \
  --bucket "$bucket" \
  --policy '{
  	"Version": "2012-10-17",
  	"Id": "*******",
  	"Statement": [
  		{
  			"Sid": "*******",
  			"Effect": "Allow",
  			"Principal": "*",
  			"Action": "s3:*",
  			"Resource": "arn:aws:s3:::'"$bucket"'/*"
  		}
  	]
  }'
