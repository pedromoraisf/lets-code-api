import {
  ForDeleteKanbanCardPort,
  ForFindAllKanbanCardsPort,
  ForStoreKanbanCardPort,
  ForUpdateKanbanCardPort
} from '@src/hexagon/ports/driven'
import { KanbanCard, KanbanCardDto } from '@src/hexagon/entities'
import { KanbanCardMapper } from '@src/hexagon/mappers'
import { InvalidIdProvidedError } from '@src/hexagon/usecases/errors'

export class KanbanCardRepositoryInMemoryAdapter
  implements
    ForStoreKanbanCardPort,
    ForUpdateKanbanCardPort,
    ForFindAllKanbanCardsPort,
    ForDeleteKanbanCardPort
{
  private readonly _kanbanCards: KanbanCardDto[] = []

  async storeKanbanCard(
    data: ForStoreKanbanCardPort.Params
  ): Promise<ForStoreKanbanCardPort.Result> {
    const kanbanCard = KanbanCardMapper.toPersistenceModel(KanbanCard.create(data))

    this._kanbanCards.push(kanbanCard)

    return await Promise.resolve(kanbanCard)
  }

  async updateKanbanCard(
    data: ForUpdateKanbanCardPort.Params
  ): Promise<ForUpdateKanbanCardPort.Params> {
    const kanbanCardPosition = await this.findKanbanCardIndex(data.id)

    this._kanbanCards.splice(kanbanCardPosition, 1, data)

    return await Promise.resolve(data)
  }

  async findAllKanbanCards(): Promise<ForFindAllKanbanCardsPort.Result> {
    return await Promise.resolve(this._kanbanCards)
  }

  async deleteKanbanCard(
    data: ForDeleteKanbanCardPort.Params
  ): Promise<ForDeleteKanbanCardPort.Result> {
    const kanbanCardPosition = await this.findKanbanCardIndex(data.id)

    this._kanbanCards.splice(kanbanCardPosition, 1)

    return await Promise.resolve()
  }

  private async findKanbanCardIndex(id: string) {
    const kanbanCardIndex = this._kanbanCards.findIndex(persisted => persisted.id === id)

    const NOT_FOUND = -1
    if (kanbanCardIndex === NOT_FOUND) {
      throw new InvalidIdProvidedError()
    }

    return kanbanCardIndex
  }
}
