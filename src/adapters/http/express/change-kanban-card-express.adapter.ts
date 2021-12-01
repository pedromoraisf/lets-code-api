import { Request, Response } from 'express'
import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'

export class ChangeKanbanCardExpressAdapter {
  constructor(private readonly changeKanbanCardUseCase: ChangeKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    const result = await this.changeKanbanCardUseCase.execute({
      ...body,
      ...params,
      ...query
    })

    return res.status(200).send(result)
  }
}
