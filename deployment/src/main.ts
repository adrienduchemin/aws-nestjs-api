#!/usr/bin/env node
import { App } from '@aws-cdk/core'

import { name } from '../package.json'
import { DeploymentStack } from './lib/deployment-stack'

const app = new App()
// care when changing the name in package json, it wont destroy the previous stack
// so do it before changing : npm run cdk destroy ${old-name}
new DeploymentStack(app, `${name}`)

// add the path to the lambda code as prop
