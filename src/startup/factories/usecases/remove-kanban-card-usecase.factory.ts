import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import {
  deleteKanbanCardInMemoryAdapterSingleton,
  findAllKanbanCardsInMemoryAdapterSingleton
} from '@src/startup/factories/adapters/db'

export const makeRemoveKanbanCardUseCase = () =>
  new RemoveKanbanCardUseCase(
    deleteKanbanCardInMemoryAdapterSingleton,
    findAllKanbanCardsInMemoryAdapterSingleton
  )
