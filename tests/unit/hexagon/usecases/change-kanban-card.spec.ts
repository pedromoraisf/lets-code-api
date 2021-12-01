import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForUpdateKanbanCardPort } from '@src/hexagon/ports/driven'
import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'

const makeFixture = ({
  id = 'any_id',
  title = 'any_title',
  content = 'any_content',
  list = 'any_list'
}: any = {}) => ({
  id,
  title,
  content,
  list
})

type SutTypes = {
  sut: ChangeKanbanCardUseCase
  updateKanbanCardInMemoryAdapter: ForUpdateKanbanCardPort
}

const makeSut = (): SutTypes => {
  const updateKanbanCardInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()

  const sut = new ChangeKanbanCardUseCase(updateKanbanCardInMemoryAdapter)

  return {
    sut,
    updateKanbanCardInMemoryAdapter
  }
}

describe('Change Kanban Card Use Case', () => {
  test('should validate that id, title, content and list are filled', async () => {
    const { sut } = makeSut()

    const wrongFixture = makeFixture({ id: false })

    const testable = async () => await sut.execute(wrongFixture)

    return await expect(testable).rejects.toThrowError()
  })

  describe('Update kanban card repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, updateKanbanCardInMemoryAdapter } = makeSut()

      jest.spyOn(updateKanbanCardInMemoryAdapter, 'updateKanbanCard')

      await sut.execute(makeFixture())

      expect(updateKanbanCardInMemoryAdapter.updateKanbanCard).toHaveBeenCalledTimes(1)
      expect(updateKanbanCardInMemoryAdapter.updateKanbanCard).toHaveBeenCalledWith(makeFixture())
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, updateKanbanCardInMemoryAdapter } = makeSut()

      jest
        .spyOn(updateKanbanCardInMemoryAdapter, 'updateKanbanCard')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test('should return the changed kanban card if operation dont have errors', async () => {
    const { sut, updateKanbanCardInMemoryAdapter } = makeSut()

    jest
      .spyOn(updateKanbanCardInMemoryAdapter, 'updateKanbanCard')
      .mockReturnValueOnce(Promise.resolve(makeFixture()))

    const testable = await sut.execute(makeFixture())

    expect(testable).toEqual(makeFixture())
  })
})
