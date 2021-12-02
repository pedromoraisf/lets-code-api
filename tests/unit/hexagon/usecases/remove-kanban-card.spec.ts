import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForDeleteKanbanCardPort, ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeKanbanCardStub } from '@tests/unit/hexagon/entities/stubs'

const makeFixture = ({ id = 'any_id' }: any = {}) => ({
  id
})

type SutTypes = {
  sut: RemoveKanbanCardUseCase
  deleteKanbanCardInMemoryAdapter: ForDeleteKanbanCardPort
  findAllKanbanCardsInMemoryAdapter: ForFindAllKanbanCardsPort
}

const makeSut = (): SutTypes => {
  const deleteKanbanCardInMemoryAdapter: ForDeleteKanbanCardPort =
    new KanbanCardRepositoryInMemoryAdapter()
  jest.spyOn(deleteKanbanCardInMemoryAdapter, 'deleteKanbanCard').mockReturnValue(Promise.resolve())
  const findAllKanbanCardsInMemoryAdapter: ForFindAllKanbanCardsPort =
    new KanbanCardRepositoryInMemoryAdapter()

  const sut = new RemoveKanbanCardUseCase(
    deleteKanbanCardInMemoryAdapter,
    findAllKanbanCardsInMemoryAdapter
  )

  return {
    sut,
    deleteKanbanCardInMemoryAdapter,
    findAllKanbanCardsInMemoryAdapter
  }
}

describe('Remove Kanban Card Use Case', () => {
  test('should validate that id is filled', async () => {
    const { sut } = makeSut()

    const wrongFixture = makeFixture({ id: false })

    const testable = async () => await sut.execute(wrongFixture)

    return await expect(testable).rejects.toThrowError()
  })

  describe('Delete kanban card repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, deleteKanbanCardInMemoryAdapter } = makeSut()

      jest.spyOn(deleteKanbanCardInMemoryAdapter, 'deleteKanbanCard')

      await sut.execute(makeFixture())

      expect(deleteKanbanCardInMemoryAdapter.deleteKanbanCard).toHaveBeenCalledTimes(1)
      expect(deleteKanbanCardInMemoryAdapter.deleteKanbanCard).toHaveBeenCalledWith(makeFixture())
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, deleteKanbanCardInMemoryAdapter } = makeSut()

      jest
        .spyOn(deleteKanbanCardInMemoryAdapter, 'deleteKanbanCard')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  describe('Find all kanban cards repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, findAllKanbanCardsInMemoryAdapter } = makeSut()

      jest.spyOn(findAllKanbanCardsInMemoryAdapter, 'findAllKanbanCards')

      await sut.execute(makeFixture())

      expect(findAllKanbanCardsInMemoryAdapter.findAllKanbanCards).toHaveBeenCalledTimes(1)
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, findAllKanbanCardsInMemoryAdapter } = makeSut()

      jest
        .spyOn(findAllKanbanCardsInMemoryAdapter, 'findAllKanbanCards')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test('should return kanban cards list if operation dont have errors', async () => {
    const { sut, findAllKanbanCardsInMemoryAdapter } = makeSut()

    jest
      .spyOn(findAllKanbanCardsInMemoryAdapter, 'findAllKanbanCards')
      .mockReturnValueOnce(
        Promise.resolve([makeKanbanCardStub(), makeKanbanCardStub(), makeKanbanCardStub()])
      )

    const testable = await sut.execute(makeFixture())

    expect(testable).toEqual([makeKanbanCardStub(), makeKanbanCardStub(), makeKanbanCardStub()])
  })
})
