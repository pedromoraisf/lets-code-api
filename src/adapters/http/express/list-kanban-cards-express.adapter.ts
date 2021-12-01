import { Request, Response } from 'express'
import { ListKanbanCardsUseCase } from '@src/hexagon/usecases'

export class ListKanbanCardsExpressAdapter {
  constructor(private readonly listKanbanCardsUseCase: ListKanbanCardsUseCase) {}

  handle = async (_: Request, res: Response) => {
    const result = await this.listKanbanCardsUseCase.execute()

    return res.status(200).send(result)
  }
}
