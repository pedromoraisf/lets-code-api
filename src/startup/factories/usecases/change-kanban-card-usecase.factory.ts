import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'
import { kanbanCardRepositoryInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeChangeKanbanCardUseCase = () =>
  new ChangeKanbanCardUseCase(kanbanCardRepositoryInMemoryAdapterSingleton)
