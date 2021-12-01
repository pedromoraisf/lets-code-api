import { ForFindUserPort } from '@src/hexagon/ports/driven'
import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'
import { ForAuthenticationPort } from '@src/hexagon/ports/driver'
import { UseCase } from '@src/hexagon/usecases/protocols'

export class AuthenticationUseCase
  implements UseCase<ForAuthenticationPort.Params, ForAuthenticationPort.Result>
{
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
