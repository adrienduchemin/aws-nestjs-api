
import { LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { Duration, Construct } from '@aws-cdk/core'

export interface LambdaGatewayProps {
  path: string;
  handler: string;
  timeout: number;
}

export class LambdaGateway extends Function {
  constructor(scope: Construct, id: string, props: LambdaGatewayProps) {
    const { path, handler, timeout } = props

    super(scope, id, {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path),
      handler,
      timeout: Duration.seconds(timeout),
    })

    // the id should concatenate the same way lambda id does
    // new LambdaRestApi(this, 'gateway', {
    new LambdaRestApi(this, `${id}-gateway`, {
      handler: this
    })
  }
}
