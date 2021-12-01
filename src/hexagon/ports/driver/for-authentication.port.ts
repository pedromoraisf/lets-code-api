/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { UserDto } from '@src/hexagon/entities/user'

export interface ForAuthenticationPort {
  execute: (data: ForAuthenticationPort.Params) => Promise<ForAuthenticationPort.Result>
}

export namespace ForAuthenticationPort {
  export type Params = Omit<UserDto, 'id'>

  export type Result = string
}
