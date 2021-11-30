import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForChangeKanbanCardPort {
  execute: (data: ForChangeKanbanCardPort.Params) => Promise<ForChangeKanbanCardPort.Result>
}

export namespace ForChangeKanbanCardPort {
  export type Params = KanbanCardDto

  export type Result = KanbanCardDto
}
