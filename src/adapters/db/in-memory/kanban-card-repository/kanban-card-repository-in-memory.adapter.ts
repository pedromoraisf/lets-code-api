/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/brace-style */
import {
  ForFindAllKanbanCardsPort,
  ForStoreKanbanCardPort,
  ForUpdateKanbanCardPort
} from '@src/hexagon/ports/driven'
import { KanbanCard, KanbanCardDto } from '@src/hexagon/entities'

export class KanbanCardRepositoryAdapterInMemory
  implements ForStoreKanbanCardPort, ForUpdateKanbanCardPort, ForFindAllKanbanCardsPort
{
  private readonly _kanbanCards: KanbanCardDto[] = []

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

  async findAllKanbanCards(): Promise<ForFindAllKanbanCardsPort.Result> {
    return await Promise.resolve(this._kanbanCards)
  }
}
