import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForListKanbanCardsPort {
  execute: (data: ForListKanbanCardsPort.Params) => Promise<ForListKanbanCardsPort.Result>
}

export namespace ForListKanbanCardsPort {
  export type Params = any

  export type Result = KanbanCardDto[]
}
