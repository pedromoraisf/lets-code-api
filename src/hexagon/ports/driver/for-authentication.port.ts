import { UserDto } from '@src/hexagon/entities/user'
import { BearerToken } from '@src/hexagon/value-objects'

export interface ForAuthenticationPort {
  execute: (data: ForAuthenticationPort.Params) => Promise<ForAuthenticationPort.Result>
}

export namespace ForAuthenticationPort {
  export type Params = Omit<UserDto, 'id'>

  export type Result = BearerToken
}
