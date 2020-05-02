
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { App, Stack, StackProps } from '@aws-cdk/core'

export interface DeploymentStackProps extends StackProps {
  lambdaCodePath: string;
  lambdaHandler?: string;
}

export class DeploymentStack extends Stack {
  constructor(scope: App, id: string, props: DeploymentStackProps) {
    super(scope, id, props)

    const { lambdaCodePath, lambdaHandler = 'lambda.handler' } = props
    const lambda = new Function(this, 'lambda', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(lambdaCodePath, { exclude: [
        'cdk.out'
      ] }),
      handler: lambdaHandler
    })

    console.log('Lambda ARN', { arn: lambda.functionArn })
    // link lambda to a generic sqs
    // push the log into the generic sqs
    // ce generic sqs implement le sqs with log du tuto youtube
  }
}
