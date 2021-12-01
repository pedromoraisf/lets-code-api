import { CreateKanbanCardExpressAdapter } from '@src/adapters/http'
import { makeCreateKanbanCardUseCase } from '@src/startup/factories/usecases'

export const makeCreateKanbanCardExpressAdapter = () =>
  new CreateKanbanCardExpressAdapter(makeCreateKanbanCardUseCase())
