import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'
import { kanbanCardRepositoryInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeCreateKanbanCardUseCase = () =>
  new CreateKanbanCardUseCase(kanbanCardRepositoryInMemoryAdapterSingleton)
