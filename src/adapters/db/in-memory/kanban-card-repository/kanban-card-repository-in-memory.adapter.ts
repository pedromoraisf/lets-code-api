/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/brace-style */
import { ForStoreKanbanCardPort, ForUpdateKanbanCardPort } from '@src/hexagon/ports/driven'
import { KanbanCard } from '@src/hexagon/entities'

export class KanbanCardRepositoryAdapterInMemory
  implements ForStoreKanbanCardPort, ForUpdateKanbanCardPort
{
  private readonly _kanbanCards: any[] = []

  async storeKanbanCard(
    data: ForStoreKanbanCardPort.Params
  ): Promise<ForStoreKanbanCardPort.Result> {
    const kanbanCard = KanbanCard.create(data)

    this._kanbanCards.push(kanbanCard)

    return await Promise.resolve(kanbanCard)
  }

  async updateKanbanCard(
    data: ForUpdateKanbanCardPort.Params
  ): Promise<ForUpdateKanbanCardPort.Params> {
    const kanbanCardPosition = this._kanbanCards.findIndex(persisted => persisted.id === data.id)

    this._kanbanCards.splice(kanbanCardPosition, 1, data)

    return await Promise.resolve(data)
  }
}
