/* eslint-disable @typescript-eslint/no-invalid-void-type */
export interface ForDeleteKanbanCardPort {
  deleteKanbanCard: (
    data: ForDeleteKanbanCardPort.Params
  ) => Promise<ForDeleteKanbanCardPort.Result>
}

export namespace ForDeleteKanbanCardPort {
  export type Params = {
    id: string
  }

  export type Result = void
}
