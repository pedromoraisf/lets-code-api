import { ForFindUserPort } from '@src/hexagon/ports/driven'
import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'
import { ForAuthenticationPort } from '@src/hexagon/ports/driver'

export class AuthenticationUseCase implements ForAuthenticationPort {
  constructor(
    private readonly forFindUserPort: ForFindUserPort,
    private readonly forGenerateEncryptedCodePort: ForGenerateEncryptedCodePort
  ) {}

  async execute(data: ForAuthenticationPort.Params): Promise<ForAuthenticationPort.Result> {
    const user = await this.forFindUserPort.findUser(data)

    return this.forGenerateEncryptedCodePort.generateEncryptedCode({
      lifetime: 3600,
      toEncrypt: user
    })
  }
}
