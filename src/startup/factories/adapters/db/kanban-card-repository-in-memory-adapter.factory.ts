import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import {
  ForDeleteKanbanCardPort,
  ForFindAllKanbanCardsPort,
  ForStoreKanbanCardPort,
  ForUpdateKanbanCardPort
} from '@src/hexagon/ports/driven'

const makeKanbanCardRepositoryInMemoryAdapter = () => new KanbanCardRepositoryInMemoryAdapter()

const kanbanCardRepositoryInMemoryAdapterSingleton = makeKanbanCardRepositoryInMemoryAdapter()

export const storeKanbanCardInMemoryAdapterSingleton: ForStoreKanbanCardPort =
  kanbanCardRepositoryInMemoryAdapterSingleton

export const updateKanbanCardInMemoryAdapterSingleton: ForUpdateKanbanCardPort =
  kanbanCardRepositoryInMemoryAdapterSingleton

export const findAllKanbanCardsInMemoryAdapterSingleton: ForFindAllKanbanCardsPort =
  kanbanCardRepositoryInMemoryAdapterSingleton

export const deleteKanbanCardInMemoryAdapterSingleton: ForDeleteKanbanCardPort =
  kanbanCardRepositoryInMemoryAdapterSingleton
