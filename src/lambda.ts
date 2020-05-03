import { Server } from 'http'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Handler, Context, APIGatewayProxyEvent } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'

import { AppModule } from './app.module'

const instanceId: string = Math.random()
  .toString(16)
  .slice(2)
console.log('Starting lambda', { instanceId })

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = []
let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule)
    await nestApp.init()
    cachedServer = createServer(nestApp.getHttpAdapter().getInstance(), undefined, binaryMimeTypes)
    return cachedServer
}

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    console.log('Handler called', { event, context, instanceId })
    const server = cachedServer ? cachedServer : await bootstrapServer()
     return proxy(server, event, context, 'PROMISE').promise
}