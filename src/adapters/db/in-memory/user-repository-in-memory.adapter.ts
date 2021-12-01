import { randomUUID } from 'crypto'
import { UserDto } from '@src/hexagon/entities/user'
import { ForFindUserPort } from '@src/hexagon/ports/driven'

export class UserRepositoryInMemoryAdapter implements ForFindUserPort {
  private readonly _users: UserDto[] = [
    { id: randomUUID(), username: 'any_username', password: 'any_password' }
  ]

  async findUser(data: ForFindUserPort.Params): Promise<ForFindUserPort.Result> {
    const bySameCredentials = persisted =>
      persisted.username === data.username && persisted.password === data.password

    const user = this._users.find(bySameCredentials)

    if (!user) {
      throw new Error()
    }

    return await Promise.resolve(user)
  }
}
