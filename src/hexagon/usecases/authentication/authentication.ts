import { ForFindUserPort } from '@src/hexagon/ports/driven'
import { ForAuthenticationPort } from '@src/hexagon/ports/driver'

export class AuthenticationUseCase implements ForAuthenticationPort {
  constructor(private readonly forFindUserPort: ForFindUserPort) {}

  async execute(data: ForAuthenticationPort.Params): Promise<ForAuthenticationPort.Result> {
    await this.forFindUserPort.findUser(data)

    return await Promise.resolve({} as any)
  }
}
