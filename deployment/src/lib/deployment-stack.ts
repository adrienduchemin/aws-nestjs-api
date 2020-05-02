
import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaGateway } from './lambda-gateway'

export interface DeploymentStackProps extends StackProps {
  lambdaCodePath: string;
  lambdaHandler?: string;
  timeout?: number;
}

export class DeploymentStack extends Stack {
  constructor(scope: App, id: string, props: DeploymentStackProps) {
    super(scope, id, props)

    const { lambdaCodePath, lambdaHandler = 'dist/lambda.handler', timeout = 30 } = props

    const lambda = new LambdaGateway(this, 'lambda', {
      path: lambdaCodePath,
      handler: lambdaHandler,
      timeout,
    })

    console.log('Lambda ARN', { arn: lambda.functionArn })
    // link lambda to a generic sqs
    // push the log into the generic sqs
    // ce generic sqs implement le sqs with log du tuto youtube
  }
}
