import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForFindAllKanbanCardsPort {
  findAllKanbanCards: () => Promise<ForFindAllKanbanCardsPort.Result>
}

export namespace ForFindAllKanbanCardsPort {
  export type Result = KanbanCardDto[]
}
