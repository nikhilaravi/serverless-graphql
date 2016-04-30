aws s3api put-object \
  --acl "public-read" \
  --bucket "gql-v1" \
  --key "graphiql/index.html" \
  --body index.html \
  --content-type "text/html"
