import { ListKanbanCardsUseCase } from '@src/hexagon/usecases'
import { findAllKanbanCardsInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeListKanbanCardsUseCase = () =>
  new ListKanbanCardsUseCase(findAllKanbanCardsInMemoryAdapterSingleton)
