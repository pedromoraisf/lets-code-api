import { ForDeleteKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForRemoveKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'
import { UseCase } from '@src/hexagon/usecases/protocols'

export class RemoveKanbanCardUseCase
  implements UseCase<ForRemoveKanbanCardPort.Params, ForRemoveKanbanCardPort.Result>
{
  constructor(private readonly forDeleteKanbanCardPort: ForDeleteKanbanCardPort) {}

  async execute(data: ForRemoveKanbanCardPort.Params): Promise<ForRemoveKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    return await this.forDeleteKanbanCardPort.deleteKanbanCard(data)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id'])
}
