import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForDeleteKanbanCardPort {
  deleteKanbanCard: (
    data: ForDeleteKanbanCardPort.Params
  ) => Promise<ForDeleteKanbanCardPort.Result>
}

export namespace ForDeleteKanbanCardPort {
  export type Params = {
    id: string
  }

  export type Result = KanbanCardDto[]
}
