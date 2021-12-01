import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { ListKanbanCardsUseCase } from '@src/hexagon/usecases'

type SutTypes = {
  sut: ListKanbanCardsUseCase
  findAllKanbanCardsInMemoryAdapter: ForFindAllKanbanCardsPort
}

export const makeSut = (): SutTypes => {
  const findAllKanbanCardsInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()

  const sut = new ListKanbanCardsUseCase(findAllKanbanCardsInMemoryAdapter)

  return {
    sut,
    findAllKanbanCardsInMemoryAdapter
  }
}

describe('List Kanban Cards Use Case', () => {
  describe('Find all kanban cards repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, findAllKanbanCardsInMemoryAdapter } = makeSut()

      jest.spyOn(findAllKanbanCardsInMemoryAdapter, 'findAllKanbanCards')

      await sut.execute()

      expect(findAllKanbanCardsInMemoryAdapter.findAllKanbanCards).toHaveBeenCalledTimes(1)
    })

    test.todo('should throw an error if repository throw a low-level error')
  })

  test.todo('should return kanban cards list if operation dont have errors')
})
