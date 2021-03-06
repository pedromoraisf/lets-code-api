import { BearerToken } from '@src/hexagon/value-objects'

export interface ForGenerateEncryptedCodePort {
  generateEncryptedCode: (
    data: ForGenerateEncryptedCodePort.Params
  ) => ForGenerateEncryptedCodePort.Result
}

export namespace ForGenerateEncryptedCodePort {
  export type Params = {
    lifetime: number
    toEncrypt: any
  }

  export type Result = BearerToken
}
