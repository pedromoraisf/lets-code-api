import { KanbanCardDto } from '@src/hexagon/entities'

export interface ForRemoveKanbanCardPort {
  execute: (data: ForRemoveKanbanCardPort.Params) => Promise<ForRemoveKanbanCardPort.Result>
}

export namespace ForRemoveKanbanCardPort {
  export type Params = {
    id: string
  }

  export type Result = KanbanCardDto[]
}
