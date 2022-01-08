# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: aws-node
stage: dev
region: us-east-1
stack: aws-node-dev
resources: 6
functions:
  api: aws-node-dev-hello
layers:
  None
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v2.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

### Serverless Offline

install offline modules 
```json
 "dependencies": {
    "uuid": "^2.0.3"
  },
  "devDependencies": {
    "serverless-dynamodb-local": "^0.2.39",
    "serverless-offline": "^6.8.0"
  }
```

### Add Plugin in serverless.yml

```yml
plugins:
  - serverless-dynamodb-local
  - serverless-offline
custom:
  dynamodb:
    stages:
      - ${self:provider.stage}
    start:
      port: 8000
      inMemory: true
      migrate: true # create tables on start  
```  

### Finally Start application offline 
```
➜ sls dynamodb install
➜ serverless offline start
Serverless: To ensure safe major version upgrades ensure "frameworkVersion" setting in service configuration (recommended setup: "frameworkVersion: ^2.28.0")

Serverless: Load command interactiveCli
Serverless: Load command config
Serverless: Load command config:credentials
Serverless: Load command config:tabcompletion
Serverless: Load command config:tabcompletion:install
Serverless: Load command config:tabcompletion:uninstall

h-dynamodb-dev-update/invoke-async/
* POST http://localhost:3002/2014-11-13/functions/serverless-rest-api-with-dynamodb-dev-delete/invoke-async/

   ┌────────────────────────────────────────────────────────────────────────────┐
   │                                                                            │
   │   POST   | http://localhost:3000/dev/todos                                 │
   │   POST   | http://localhost:3000/2015-03-31/functions/create/invocations   │
   │   GET    | http://localhost:3000/dev/todos                                 │
   │   POST   | http://localhost:3000/2015-03-31/functions/list/invocations     │
   │   GET    | http://localhost:3000/dev/todos/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/get/invocations      │
   │   PUT    | http://localhost:3000/dev/todos/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/update/invocations   │
   │   DELETE | http://localhost:3000/dev/todos/{id}                            │
   │   POST   | http://localhost:3000/2015-03-31/functions/delete/invocations   │
   │                                                                            │
   └────────────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://localhost:3000 🚀
offline: 
offline: Enter "rp" to replay the last request
```

### Access DynamoDB from Code 

```
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
})
```


