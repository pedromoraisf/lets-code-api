import { UserDto } from '@src/hexagon/entities/user'

export interface ForFindUserPort {
  findUser: (data: ForFindUserPort.Params) => Promise<ForFindUserPort.Result>
}

export namespace ForFindUserPort {
  export type Params = Omit<UserDto, 'id'>

  export type Result = UserDto
}
