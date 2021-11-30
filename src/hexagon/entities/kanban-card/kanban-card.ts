import { randomUUID } from 'crypto'

type KanbanCardProps = {
  title: string
  content: string
  list: string
}

export class KanbanCard {
  private constructor(
    private readonly _props: KanbanCardProps,
    private readonly _id: string = randomUUID()
  ) {}

  static create(props: KanbanCardProps, id?: string): KanbanCard {
    return new KanbanCard(props, id)
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._props.title
  }

  get content(): string {
    return this._props.content
  }

  get list(): string {
    return this._props.list
  }
}
