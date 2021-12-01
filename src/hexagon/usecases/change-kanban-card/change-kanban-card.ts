import { ForUpdateKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForChangeKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class ChangeKanbanCardUseCase implements ForChangeKanbanCardPort {
  constructor(private readonly forUpdateKanbanCard: ForUpdateKanbanCardPort) {}

  async execute(data: ForChangeKanbanCardPort.Params): Promise<ForChangeKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    await this.forUpdateKanbanCard.updateKanbanCard(data)

    return await Promise.resolve({} as any)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id', 'title', 'content', 'list'])
}
