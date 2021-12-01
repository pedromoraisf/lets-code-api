import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForUpdateKanbanCardPort {
  updateKanbanCard: (
    data: ForUpdateKanbanCardPort.Params
  ) => Promise<ForUpdateKanbanCardPort.Result>
}

export namespace ForUpdateKanbanCardPort {
  export type Params = KanbanCardDto

  export type Result = KanbanCardDto
}
