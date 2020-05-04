import { join } from "path"
import { Code } from "@aws-cdk/aws-lambda"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { ApiLambdaWithHistoryQueueStack } from "../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history-queue.stack"
import { name } from "../package.json"

const app = new App()

new ApiLambdaWithHistoryQueueStack(app, name, {
    lambdaProps : {
        code: Code.fromAsset(join(__dirname, '../../bundle.zip')), //from env ci
        handler: 'dist/src/lambda.handler',
    },
})

export default app