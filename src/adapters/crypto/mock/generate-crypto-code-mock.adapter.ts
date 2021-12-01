import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'

export class GenerateEncryptedCodeMockAdapter implements ForGenerateEncryptedCodePort {
  generateEncryptedCode(
    data: ForGenerateEncryptedCodePort.Params
  ): ForGenerateEncryptedCodePort.Result {
    return {
      access_token: '1'.repeat(51),
      expires_in: data.lifetime,
      token_type: 'Bearer'
    }
  }
}
