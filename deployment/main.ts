import { App } from "@aws-cdk/core"

import { name } from "../package.json"
import { MyStack } from "./stacks/stack"

const app = new App()

new MyStack(app, name)

export default app