import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import { kanbanCardRepositoryInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeRemoveKanbanCardUseCase = () =>
  new RemoveKanbanCardUseCase(
    kanbanCardRepositoryInMemoryAdapterSingleton,
    kanbanCardRepositoryInMemoryAdapterSingleton
  )
