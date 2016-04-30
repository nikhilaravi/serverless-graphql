# serverless-graphql
Testing out building a serverless graphql app using AWS


- Create amazon account
- Get your access key id and secret access key
- Give your user super access - add administrator acces policy!
- iam create role (trust policy for lambda)
- iam put role policy (access policy for lambda)
- Check the policy has been added
`
aws iam get-role-policy --role-name lambda_execution_role_name --policy-name lambda_execution_access_policy_name
`

-
