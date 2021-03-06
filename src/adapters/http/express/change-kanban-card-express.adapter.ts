import { Request, Response } from 'express'
import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'
import { InvalidIdProvidedError, InvalidParamsError } from '@src/hexagon/usecases/errors'

export class ChangeKanbanCardExpressAdapter {
  constructor(private readonly changeKanbanCardUseCase: ChangeKanbanCardUseCase) {}

  handle = async ({ body, params, query }: Request, res: Response) => {
    try {
      const result = await this.changeKanbanCardUseCase.execute({
        ...body,
        ...params,
        ...query
      })

      return res.status(200).send(result)
    } catch (error) {
      if (error instanceof InvalidParamsError) {
        return res.status(400).send(error.message)
      }

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
