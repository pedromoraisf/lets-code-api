import { Request, Response } from 'express'
import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'

export class CreateKanbanCardExpressAdapter {
  constructor(private readonly createKanbanCardUseCase: CreateKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    const result = await this.createKanbanCardUseCase.execute({
      ...body,
      ...params,
      ...query
    })

    return res.status(202).send(result)
  }
}
