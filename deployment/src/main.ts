import { join } from "path"
import { App } from "@aws-cdk/core"
//to refacto with lerna lib
import { IApiLambda } from "./lambdas/interfaces/api-lambda.interface"
import { build } from "./lambdas/lambda"

const app = new App()

const apiLambda: IApiLambda = {
    stackName: 'aws-nestjs-api',
    zipPath: join(__dirname, '../../bundle.zip'),
    withHistory: true,
}

build(app, apiLambda)

export default app