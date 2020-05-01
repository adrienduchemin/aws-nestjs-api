
import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import * as sqs from '@aws-cdk/aws-sqs'
import { App, Duration, Stack, StackProps } from '@aws-cdk/core'

export class DeploymentStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const queue = new sqs.Queue(this, 'queuee', {
      visibilityTimeout: Duration.seconds(300)
    })

    const topic = new sns.Topic(this, 'topic')

    topic.addSubscription(new subs.SqsSubscription(queue))
  }
}
