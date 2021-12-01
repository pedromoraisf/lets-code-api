import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'

export const makeKanbanCardRepositoryInMemoryAdapter = () =>
  new KanbanCardRepositoryInMemoryAdapter()
