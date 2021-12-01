import { KanbanCardRepositoryAdapterInMemory } from '@src/adapters/db'
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
  updateKanbanCardAdapterInMemory: ForUpdateKanbanCardPort
}

const makeSut = (): SutTypes => {
  const updateKanbanCardAdapterInMemory = new KanbanCardRepositoryAdapterInMemory()

  const sut = new ChangeKanbanCardUseCase(updateKanbanCardAdapterInMemory)

  return {
    sut,
    updateKanbanCardAdapterInMemory
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
      const { sut, updateKanbanCardAdapterInMemory } = makeSut()

      jest.spyOn(updateKanbanCardAdapterInMemory, 'updateKanbanCard')

      await sut.execute(makeFixture())

      expect(updateKanbanCardAdapterInMemory.updateKanbanCard).toHaveBeenCalledTimes(1)
      expect(updateKanbanCardAdapterInMemory.updateKanbanCard).toHaveBeenCalledWith(makeFixture())
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, updateKanbanCardAdapterInMemory } = makeSut()

      jest
        .spyOn(updateKanbanCardAdapterInMemory, 'updateKanbanCard')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test('should return the changed kanban card if operation dont have errors', async () => {
    const { sut, updateKanbanCardAdapterInMemory } = makeSut()

    jest
      .spyOn(updateKanbanCardAdapterInMemory, 'updateKanbanCard')
      .mockReturnValueOnce(Promise.resolve(makeFixture()))

    const testable = await sut.execute(makeFixture())

    expect(testable).toEqual(makeFixture())
  })
})
