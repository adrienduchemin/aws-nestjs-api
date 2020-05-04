import { Code } from "@aws-cdk/aws-lambda"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { IFunctionProps } from "../../../../aws-nestjs-generic-deployment/dist/constructs/lambda.construct"
import { ApiLambdaWithHistoryQueueStack } from "../../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda-with-history-queue.stack"
import { ApiLambdaStack } from "../../../../aws-nestjs-generic-deployment/dist/stacks/api-lambda.stack"
import { IApiLambda } from "./interfaces/api-lambda.interface"

// THIS FILE SHOULD MOVE to library
export const build = (app: App, apiLambda: IApiLambda) : void => {
    const { stackName, zipPath, withHistory, handler = 'dist/lambda.handler' } = apiLambda
    const lambdaProps: IFunctionProps = {
        code: Code.fromAsset(zipPath),
        handler,
    }

    if(withHistory) {
        new ApiLambdaWithHistoryQueueStack(app, stackName, {
            lambdaProps,
        })
    } else {
        new ApiLambdaStack(app, stackName, {
            lambdaProps
        })
    }
}