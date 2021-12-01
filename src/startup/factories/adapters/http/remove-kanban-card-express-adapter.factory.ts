import { RemoveKanbanCardExpressAdapter } from '@src/adapters/http'
import { makeRemoveKanbanCardUseCase } from '@src/startup/factories/usecases'

export const makeRemoveKanbanCardExpressAdapter = () =>
  new RemoveKanbanCardExpressAdapter(makeRemoveKanbanCardUseCase())
