import { ForChangeKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class ChangeKanbanCardUseCase implements ForChangeKanbanCardPort {
  async execute(data: ForChangeKanbanCardPort.Params): Promise<ForChangeKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    return await Promise.resolve({} as any)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['id', 'title', 'content', 'list'])
}
