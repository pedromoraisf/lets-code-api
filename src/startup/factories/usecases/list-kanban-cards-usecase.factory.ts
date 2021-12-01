import { ListKanbanCardsUseCase } from '@src/hexagon/usecases'
import { makeKanbanCardRepositoryInMemoryAdapter } from '@src/startup/factories/adapters/db'

export const makeListKanbanCardsUseCase = () =>
  new ListKanbanCardsUseCase(makeKanbanCardRepositoryInMemoryAdapter())
