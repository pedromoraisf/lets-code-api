import { Request, Response } from 'express'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import { InvalidIdProvidedError } from '@src/hexagon/usecases/errors'

export class RemoveKanbanCardExpressAdapter {
  constructor(private readonly removeKanbanCardUseCase: RemoveKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    try {
      const result = await this.removeKanbanCardUseCase.execute({
        ...body,
        ...params,
        ...query
      })

      return res.status(200).send(result)
    } catch (error) {
      if (error instanceof InvalidIdProvidedError) {
        return res.status(404).send(error.message)
      }

      if (error instanceof Error) {
        console.error(error.message)
        return res.status(500).send('server error')
      }
    }
  }
}
