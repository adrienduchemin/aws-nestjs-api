import { join } from 'path'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'

// to refacto with lerna lib
import { ApiLambdaWithHistoryStack } from '../../../aws-nestjs-generic-deployment/src/stacks/api-lambda-with-history.stack'
import { name } from '../package.json'

const app = new App()
// care when changing the name in package json, it wont destroy the previous stack
// so do it before changing : npm run cdk destroy ${old-name}
new ApiLambdaWithHistoryStack(app, `${name}`, {
    lambdaProps: {
      code: Code.fromAsset(join(__dirname, '../../bundle.zip')),
      handler: 'dist/lambda.handler',
    }
  })