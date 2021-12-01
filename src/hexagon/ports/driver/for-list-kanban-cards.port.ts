import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForListKanbanCardsPort {
  execute: () => Promise<ForListKanbanCardsPort.Result>
}

export namespace ForListKanbanCardsPort {
  export type Result = KanbanCardDto[]
}
