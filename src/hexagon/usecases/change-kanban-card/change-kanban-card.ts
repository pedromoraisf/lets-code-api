import { ForUpdateKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForChangeKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'
import { UseCase } from '@src/hexagon/usecases/protocols'
import { InvalidParamsError } from '@src/hexagon/usecases/errors'

export class ChangeKanbanCardUseCase
  implements UseCase<ForChangeKanbanCardPort.Params, ForChangeKanbanCardPort.Result>
{
  constructor(private readonly forUpdateKanbanCard: ForUpdateKanbanCardPort) {}

  async execute(data: ForChangeKanbanCardPort.Params): Promise<ForChangeKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new InvalidParamsError()
    }

    return await this.forUpdateKanbanCard.updateKanbanCard(data)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id', 'title', 'content', 'list'])
}
