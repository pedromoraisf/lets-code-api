import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeKanbanCardRepositoryInMemoryAdapter } from '@src/startup/factories/adapters/db'

export const makeChangeKanbanCardUseCase = () =>
  new ChangeKanbanCardUseCase(makeKanbanCardRepositoryInMemoryAdapter())
