import { SynthUtils } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'
import { ApiLambdaWithHistoryStack } from '../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history.stack'
import { ApiLambdaStackProps } from '../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack'
import { name } from '../package.json'

describe('Main', () => {
  let stack: ApiLambdaWithHistoryStack

  beforeAll(()=> {
    const props: ApiLambdaStackProps = {
      lambdaProps: {
        code: Code.fromInline('lambda'),
        handler: 'handler',
      }
    }
    stack = new ApiLambdaWithHistoryStack(new App(), `${name}`, props)
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})