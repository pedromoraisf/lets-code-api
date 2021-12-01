import { ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { ForListKanbanCardsPort } from '@src/hexagon/ports/driver'

export class ListKanbanCardsUseCase implements ForListKanbanCardsPort {
  constructor(private readonly forFindAllKanbanCardsPort: ForFindAllKanbanCardsPort) {}

  async execute(): Promise<ForListKanbanCardsPort.Result> {
    await this.forFindAllKanbanCardsPort.findAllKanbanCards()

    return await Promise.resolve([] as any)
  }
}
