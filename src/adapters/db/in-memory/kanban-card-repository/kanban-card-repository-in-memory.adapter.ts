import { KanbanCardDto } from '@src/hexagon/entities'
import { ForCreateKanbanCardPort } from '@src/hexagon/ports/driver'

export class KanbanCardRepositoryInMemory implements ForCreateKanbanCardPort {
  forCreateKanbanCard: (data: ForCreateKanbanCardPort.Params) => Promise<KanbanCardDto>
}
