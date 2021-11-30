import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForCreateKanbanCardPort {
  execute: (data: ForCreateKanbanCardPort.Params) => Promise<ForCreateKanbanCardPort.Result>
}

export namespace ForCreateKanbanCardPort {
  export type Params = Omit<KanbanCardDto, 'id'>

  export type Result = KanbanCardDto
}
