import { ListKanbanCardsExpressAdapter } from '@src/adapters/http'
import { makeListKanbanCardsUseCase } from '@src/startup/factories/usecases'

export const makeListKanbanCardsExpressAdapter = () =>
  new ListKanbanCardsExpressAdapter(makeListKanbanCardsUseCase())
