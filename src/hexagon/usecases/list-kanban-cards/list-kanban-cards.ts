import { ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { ForListKanbanCardsPort } from '@src/hexagon/ports/driver'
import { UseCase } from '@src/hexagon/usecases/protocols'

export class ListKanbanCardsUseCase
  implements UseCase<ForListKanbanCardsPort.Params, ForListKanbanCardsPort.Result>
{
  constructor(private readonly forFindAllKanbanCardsPort: ForFindAllKanbanCardsPort) {}

  async execute(): Promise<ForListKanbanCardsPort.Result> {
    return await this.forFindAllKanbanCardsPort.findAllKanbanCards()
  }
}
