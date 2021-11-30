import { KanbanCardDto } from '@/hexagon/entities'

export interface ForCreateKanbanCardPort {
  forCreateKanbanCard: (
    data: ForCreateKanbanCardPort.Params
  ) => Promise<ForCreateKanbanCardPort.Result>
}

export namespace ForCreateKanbanCardPort {
  export type Params = Omit<KanbanCardDto, 'id'>

  export type Result = KanbanCardDto
}
