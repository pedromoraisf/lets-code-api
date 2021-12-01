import { KanbanCard } from '@src/hexagon/entities'

export class KanbanCardMapper {
  static toPersistenceModel(data: KanbanCard): any {
    return {
      id: data?.id,
      title: data?.title,
      content: data?.content,
      list: data?.list
    }
  }
}
