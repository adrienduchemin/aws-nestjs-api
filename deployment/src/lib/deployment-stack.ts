
import { LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { App, Stack, StackProps, Duration } from '@aws-cdk/core'

export interface DeploymentStackProps extends StackProps {
  lambdaCodePath: string;
  lambdaHandler?: string;
}

export class DeploymentStack extends Stack {
  constructor(scope: App, id: string, props: DeploymentStackProps) {
    super(scope, id, props)

    const { lambdaCodePath, lambdaHandler = 'dist/lambda.handler' } = props

    const lambda = new Function(this, 'lambda', {
      runtime: Runtime.NODEJS_12_X,
      //should give a path to a zip file rather than the whole directory
      // the zip file could do the npm i -- prod and only contain the dist and the prod deps
      // and not all the config file like readme, tsconfig etc
      code: Code.fromAsset(lambdaCodePath),
      handler: lambdaHandler,
      timeout: Duration.seconds(30),
    })

    // the id should concatenate the same way lambda id does
    // new LambdaRestApi(this, 'gateway', {
    new LambdaRestApi(this, `${id}-gateway`, {
      handler: lambda
    })

    console.log('Lambda ARN', { arn: lambda.functionArn })
    // link lambda to a generic sqs
    // push the log into the generic sqs
    // ce generic sqs implement le sqs with log du tuto youtube
  }
}
