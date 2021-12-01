import { Request, Response } from 'express'
import { UseCase } from '@src/hexagon/usecases/protocols'

export class AuthenticationExpressAdapter {
  constructor(private readonly usecase: UseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    const result = await this.usecase.execute({
      ...body,
      ...params,
      ...query
    })

    return res.status(200).send(result)
  }
}
