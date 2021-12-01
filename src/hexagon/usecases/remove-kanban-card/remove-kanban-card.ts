import { ForDeleteKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForRemoveKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class RemoveKanbanCardUseCase implements ForRemoveKanbanCardPort {
  constructor(private readonly forDeleteKanbanCardPort: ForDeleteKanbanCardPort) {}

  async execute(data: ForRemoveKanbanCardPort.Params): Promise<ForRemoveKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    await this.forDeleteKanbanCardPort.deleteKanbanCard(data)

    return await Promise.resolve([] as any)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id'])
}
