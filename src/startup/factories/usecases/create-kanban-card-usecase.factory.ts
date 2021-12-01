import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeKanbanCardRepositoryInMemoryAdapter } from '@src/startup/factories/adapters/db'

export const makeCreateKanbanCardUseCase = () =>
  new CreateKanbanCardUseCase(makeKanbanCardRepositoryInMemoryAdapter())
