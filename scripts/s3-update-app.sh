aws s3api put-object \
  --acl "public-read" \
  --bucket "gql-v1" \
  --key "app/index.html" \
  --body public/app/index.html \
  --content-type "text/html"
