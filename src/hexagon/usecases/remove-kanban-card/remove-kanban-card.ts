import { ForDeleteKanbanCardPort, ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { ForRemoveKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'
import { UseCase } from '@src/hexagon/usecases/protocols'
import { InvalidIdProvidedError } from '@src/hexagon/usecases/errors'

export class RemoveKanbanCardUseCase
  implements UseCase<ForRemoveKanbanCardPort.Params, ForRemoveKanbanCardPort.Result>
{
  constructor(
    private readonly forDeleteKanbanCardPort: ForDeleteKanbanCardPort,
    private readonly forFindAllKanbanCardsPort: ForFindAllKanbanCardsPort
  ) {}

  async execute(data: ForRemoveKanbanCardPort.Params): Promise<ForRemoveKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new InvalidIdProvidedError()
    }

    await this.forDeleteKanbanCardPort.deleteKanbanCard(data)

    return await this.forFindAllKanbanCardsPort.findAllKanbanCards()
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id'])
}
