import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'

const makeKanbanCardRepositoryInMemoryAdapter = () => new KanbanCardRepositoryInMemoryAdapter()

export const kanbanCardRepositoryInMemoryAdapterSingleton =
  makeKanbanCardRepositoryInMemoryAdapter()
