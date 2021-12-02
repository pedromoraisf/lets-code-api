import { env } from '@src/config'
import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'
import jwt from 'jsonwebtoken'

export class GenerateEncryptedCodeJwtAdapter implements ForGenerateEncryptedCodePort {
  generateEncryptedCode({
    lifetime,
    toEncrypt
  }: ForGenerateEncryptedCodePort.Params): ForGenerateEncryptedCodePort.Result {
    const token = jwt.sign(toEncrypt, env.CONFIG.JWT_SECRET, {
      expiresIn: lifetime
    })

    return {
      access_token: token,
      expires_in: lifetime,
      token_type: 'Bearer'
    }
  }
}
