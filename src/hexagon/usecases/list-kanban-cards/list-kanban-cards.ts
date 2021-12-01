import { ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { ForListKanbanCardsPort } from '@src/hexagon/ports/driver'

export class ListKanbanCardsUseCase implements ForListKanbanCardsPort {
  constructor(private readonly forFindAllKanbanCardsPort: ForFindAllKanbanCardsPort) {}

  async execute(): Promise<ForListKanbanCardsPort.Result> {
    return await this.forFindAllKanbanCardsPort.findAllKanbanCards()
  }
}
