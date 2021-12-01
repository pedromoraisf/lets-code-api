import { ForRemoveKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class RemoveKanbanCardUseCase implements ForRemoveKanbanCardPort {
  async execute(data: ForRemoveKanbanCardPort.Params): Promise<ForRemoveKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    return await Promise.resolve([] as any)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id'])
}
