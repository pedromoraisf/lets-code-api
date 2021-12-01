import { ListKanbanCardsUseCase } from '@src/hexagon/usecases'
import { kanbanCardRepositoryInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeListKanbanCardsUseCase = () =>
  new ListKanbanCardsUseCase(kanbanCardRepositoryInMemoryAdapterSingleton)
