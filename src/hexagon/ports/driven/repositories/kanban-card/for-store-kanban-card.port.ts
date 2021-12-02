import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForStoreKanbanCardPort {
  storeKanbanCard: (data: ForStoreKanbanCardPort.Params) => Promise<ForStoreKanbanCardPort.Result>
}

export namespace ForStoreKanbanCardPort {
  export type Params = Omit<KanbanCardDto, 'id'>

  export type Result = KanbanCardDto
}
