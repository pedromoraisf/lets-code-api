import { Request, Response } from 'express'
import { AuthenticationUseCase } from '@src/hexagon/usecases/authentication'

export class AuthenticationExpressAdapter {
  constructor(private readonly authenticationUseCase: AuthenticationUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    const result = await this.authenticationUseCase.execute({
      ...body,
      ...params,
      ...query
    })

    return res.status(200).send(result)
  }
}
