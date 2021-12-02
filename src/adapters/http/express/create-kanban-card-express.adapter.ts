import { Request, Response } from 'express'
import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'
import { InvalidParamsError } from '@src/hexagon/usecases/errors'

export class CreateKanbanCardExpressAdapter {
  constructor(private readonly createKanbanCardUseCase: CreateKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    try {
      const result = await this.createKanbanCardUseCase.execute({
        ...body,
        ...params,
        ...query
      })

      return res.status(202).send(result)
    } catch (error) {
      if (error instanceof InvalidParamsError) {
        return res.status(400).send(error.message)
      }
    }
  }
}
