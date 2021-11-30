export interface ForStoreKanbanCardPort {
  forStoreKanbanCard: (
    data: ForStoreKanbanCardPort.Params
  ) => Promise<ForStoreKanbanCardPort.Result>
}

export namespace ForStoreKanbanCardPort {
  export type Params = {}

  export type Result = {}
}
