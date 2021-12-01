import { ChangeKanbanCardExpressAdapter } from '@src/adapters/http'
import { makeChangeKanbanCardUseCase } from '@src/startup/factories/usecases'

export const makeChangeKanbanCardExpressAdapter = () =>
  new ChangeKanbanCardExpressAdapter(makeChangeKanbanCardUseCase())
