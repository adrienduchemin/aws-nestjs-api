import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaGateway } from './lambda-gateway'

export interface DeploymentStackProps extends StackProps {
  lambdaCodePath: string;
  lambdaHandler?: string;
  lambdaTimeout?: number;
}

export class DeploymentStack extends Stack {
  constructor(scope: App, id: string, props: DeploymentStackProps) {
    super(scope, id, props)

    const { lambdaCodePath, lambdaHandler = 'dist/lambda.handler', lambdaTimeout = 30 } = props

    const lambda = new LambdaGateway(this, {
      path: lambdaCodePath,
      handler: lambdaHandler,
      timeout: lambdaTimeout,
    })

    console.log('ARN lambda', { lambda: lambda.functionArn })

    // should create a RDS and link the lambda as write access to it
    // creer un autre repo de deploiement + lambda avec le SQS qui a le droit de publier dans un dynamo (tuto youtube)
  }
}
