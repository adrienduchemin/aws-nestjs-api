import { CloudAssembly } from '@aws-cdk/cx-api'
import app from '../../deployment/main'

describe('Main', () => {
  let synth: CloudAssembly

  beforeAll(()=> {
    synth = app.synth()
  })

  it('should not have changed', () => {
    expect(synth.getStackByName('aws-nestjs-api').name).toEqual('aws-nestjs-api')
  })

  it('should not have changed', () => {
    expect(synth).toMatchSnapshot()
  })
})