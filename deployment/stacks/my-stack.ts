import { join } from "path"
import { Code } from "@aws-cdk/aws-lambda"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { ApiLambdaStack } from "../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack"

// todo put back after fix from cdk on delete Table
// export class MyStack extends ApiLambdaWithHistoryQueueStack {
export class MyStack extends ApiLambdaStack {
    constructor(scope: App, id: string) {
        super(scope, id, {
            lambdaProps : {
                code: Code.fromAsset(join(__dirname, '../../../bundle.zip')), //from env ci
                handler: 'dist/src/lambda.handler',
            },
            // todo delete after test on pings, by default one
            warmLambdaProps: {
                lambdaNumberWarmup: 1 // try 1 and 2 too and see how many lambdas created + pings
            }
        })
    }
}