import { Injectable } from '@nestjs/common'
import { SQS } from 'aws-sdk'

@Injectable()
export class AppService {
  private _sqs?: SQS

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env.QUEUE_URL!

  get sqs(): SQS {
    if (!this._sqs) {
      this._sqs = new SQS()
    }
    return this._sqs
  }
  
  async getHello(): Promise<string> {
    await this.sqs.sendMessage({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify({ text: 'Hello World!' }),
        MessageGroupId: "helloRequested",
        MessageDeduplicationId: "123",
      })
      .promise()
    return 'Hello World!'
  }
}
