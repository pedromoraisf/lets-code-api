import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'
import { storeKanbanCardInMemoryAdapterSingleton } from '@src/startup/factories/adapters/db'

export const makeCreateKanbanCardUseCase = () =>
  new CreateKanbanCardUseCase(storeKanbanCardInMemoryAdapterSingleton)
