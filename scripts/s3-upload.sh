aws s3api put-object \
  --acl "public-read" \
  --bucket "serverless-graphql-demo" \
  --key "file.json" \
  --body "./scripts/test.json" \
  --content-type "application/json"
