import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'
import { ForCreateKanbanCardPort } from '@src/hexagon/ports/driver'

export class CreateKanbanCardUseCase implements ForCreateKanbanCardPort {
  constructor(private readonly forStoreKanbanCard: ForStoreKanbanCardPort) {}

  async execute(data: ForCreateKanbanCardPort.Params): Promise<ForCreateKanbanCardPort.Result> {
    if (this.validate(data)) {
      throw new Error()
    }

    await this.forStoreKanbanCard.storeKanbanCard(data)

    return await Promise.resolve({} as any)
  }

  private validate(data: ForCreateKanbanCardPort.Params): boolean {
    const requiredProps = ['title', 'content', 'list']

    const falsyProperty = (prop: string) => !data[prop]

    return requiredProps.some(falsyProperty)
  }
}