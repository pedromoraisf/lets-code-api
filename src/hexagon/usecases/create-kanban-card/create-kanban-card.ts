import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForCreateKanbanCardPort } from '@src/hexagon/ports/driver'
import { validateObjectProperties } from '@src/hexagon/usecases/utils'

export class CreateKanbanCardUseCase implements ForCreateKanbanCardPort {
  constructor(private readonly forStoreKanbanCard: ForStoreKanbanCardPort) {}

  async execute(data: ForCreateKanbanCardPort.Params): Promise<ForCreateKanbanCardPort.Result> {
    if (this.haveFalsyProperty(data)) {
      throw new Error()
    }

    return await this.forStoreKanbanCard.storeKanbanCard(data)
  }

  private readonly haveFalsyProperty = validateObjectProperties(['title', 'content', 'list'])
}
