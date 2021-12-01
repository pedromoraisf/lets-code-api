import { ForUpdateKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForChangeKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class ChangeKanbanCardUseCase implements ForChangeKanbanCardPort {
  constructor(private readonly forUpdateKanbanCard: ForUpdateKanbanCardPort) {}

  async execute(data: ForChangeKanbanCardPort.Params): Promise<ForChangeKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    return await this.forUpdateKanbanCard.updateKanbanCard(data)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id', 'title', 'content', 'list'])
}
