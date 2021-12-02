import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForFindByIdKanbanCardPort {
  findByIdKanbanCard: (
    data: ForFindByIdKanbanCardPort.Params
  ) => Promise<ForFindByIdKanbanCardPort.Result>
}

export namespace ForFindByIdKanbanCardPort {
  export type Params = {
    id: string
  }

  export type Result = KanbanCardDto
}
