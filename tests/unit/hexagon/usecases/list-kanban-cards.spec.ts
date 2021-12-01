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

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, findAllKanbanCardsInMemoryAdapter } = makeSut()

      jest
        .spyOn(findAllKanbanCardsInMemoryAdapter, 'findAllKanbanCards')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute()

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test.todo('should return kanban cards list if operation dont have errors')
})
