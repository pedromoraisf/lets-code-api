import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'
import { updateKanbanCardInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeChangeKanbanCardUseCase = () =>
  new ChangeKanbanCardUseCase(updateKanbanCardInMemoryAdapterSingleton)
