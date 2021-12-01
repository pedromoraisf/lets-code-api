import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForDeleteKanbanCardPort } from '@src/hexagon/ports/driven'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'

const makeFixture = ({ id = 'any_id' }: any = {}) => ({
  id
})

type SutTypes = {
  sut: RemoveKanbanCardUseCase
  deleteKanbanCardInMemoryAdapter: ForDeleteKanbanCardPort
}

const makeSut = (): SutTypes => {
  const deleteKanbanCardInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()

  const sut = new RemoveKanbanCardUseCase(deleteKanbanCardInMemoryAdapter)

  return {
    sut,
    deleteKanbanCardInMemoryAdapter
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

    test.todo('should throw an error if repository throw a low-level error')
  })

  test.todo('should return kanban cards list if operation dont have errors')
})
