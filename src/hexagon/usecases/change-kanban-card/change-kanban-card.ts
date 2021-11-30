import { ForChangeKanbanCardPort } from '@src/hexagon/ports/driver'

export class ChangeKanbanCardUseCase implements ForChangeKanbanCardPort {
  async execute(data: ForChangeKanbanCardPort.Params): Promise<ForChangeKanbanCardPort.Result> {
    if (this.validate(data)) {
      throw new Error()
    }

    return await Promise.resolve({} as any)
  }

  private validate(data: ForChangeKanbanCardPort.Params): boolean {
    const requiredProps = ['id', 'title', 'content', 'list']

    const falsyProperty = (prop: string) => !data[prop]

    return requiredProps.some(falsyProperty)
  }
}
