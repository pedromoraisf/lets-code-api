import { Request, Response } from 'express'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'

export class RemoveKanbanCardExpressAdapter {
  constructor(private readonly removeKanbanCardUseCase: RemoveKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    const result = await this.removeKanbanCardUseCase.execute({
      ...body,
      ...params,
      ...query
    })

    return res.status(200).send(result)
  }
}
