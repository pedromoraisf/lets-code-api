import { KanbanCardRepositoryAdapterInMemory } from '@src/adapters/db'
import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'
import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'

const makeFixture = ({
  title = 'any_title',
  content = 'any_content',
  list = 'any_list'
}: any = {}): any => ({
  title,
  content,
  list
})

type SutTypes = {
  sut: CreateKanbanCardUseCase
  storeKanbanCardAdapterInMemory: ForStoreKanbanCardPort
}

const makeSut = (): SutTypes => {
  const storeKanbanCardAdapterInMemory = new KanbanCardRepositoryAdapterInMemory()

  const sut = new CreateKanbanCardUseCase(storeKanbanCardAdapterInMemory)

  return {
    sut,
    storeKanbanCardAdapterInMemory
  }
}

describe('Create Kanban Card Use Case', () => {
  test('should validate that title, content and list are filled', async () => {
    const { sut } = makeSut()

    const wrongFixture = makeFixture({ title: false })

    const testable = async () => await sut.execute(wrongFixture)

    await expect(testable).rejects.toThrowError()
  })

  describe('Create kanban card repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, storeKanbanCardAdapterInMemory } = makeSut()

      jest.spyOn(storeKanbanCardAdapterInMemory, 'storeKanbanCard')

      await sut.execute(makeFixture())

      expect(storeKanbanCardAdapterInMemory.storeKanbanCard).toHaveBeenCalledTimes(1)
      expect(storeKanbanCardAdapterInMemory.storeKanbanCard).toHaveBeenCalledWith({
        title: makeFixture().title,
        content: makeFixture().content,
        list: makeFixture().list
      })
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, storeKanbanCardAdapterInMemory } = makeSut()

      jest
        .spyOn(storeKanbanCardAdapterInMemory, 'storeKanbanCard')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test('should return the created kanban card if operation dont have errors', async () => {
    const { sut, storeKanbanCardAdapterInMemory } = makeSut()

    jest.spyOn(storeKanbanCardAdapterInMemory, 'storeKanbanCard').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        title: 'any_title',
        content: 'any_content',
        list: 'any_list'
      })
    )

    const testable = await sut.execute(makeFixture())

    expect(testable).toEqual({
      id: 'any_id',
      title: 'any_title',
      content: 'any_content',
      list: 'any_list'
    })
  })
})
