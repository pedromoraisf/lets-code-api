import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'

export class KanbanCardRepositoryAdapterInMemory implements ForStoreKanbanCardPort {
  async storeKanbanCard(
    data: ForStoreKanbanCardPort.Params
  ): Promise<ForStoreKanbanCardPort.Result> {
    return await Promise.resolve({
      id: 'any_id',
      title: 'any_title',
      content: 'any_content',
      list: 'any_list'
    })
  }
}
