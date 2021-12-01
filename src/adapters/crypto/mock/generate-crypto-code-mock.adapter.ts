import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'

export class GenerateCryptoCodeMockAdapter implements ForGenerateEncryptedCodePort {
  generateEncryptedCode(
    data: ForGenerateEncryptedCodePort.Params
  ): ForGenerateEncryptedCodePort.Result {
    return 'any_encrypted_fake_code'
  }
}
