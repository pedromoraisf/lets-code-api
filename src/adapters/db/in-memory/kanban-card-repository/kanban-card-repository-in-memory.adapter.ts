import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'
import { KanbanCard } from '@src/hexagon/entities'

export class KanbanCardRepositoryAdapterInMemory implements ForStoreKanbanCardPort {
  private readonly _kanbanCards: any[] = []

  async storeKanbanCard(
    data: ForStoreKanbanCardPort.Params
  ): Promise<ForStoreKanbanCardPort.Result> {
    const kanbanCard = KanbanCard.create(data)

    this._kanbanCards.push(kanbanCard)

    return await Promise.resolve(kanbanCard)
  }
}
