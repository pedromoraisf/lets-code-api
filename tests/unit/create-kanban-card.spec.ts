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
  createKanbanCardAdapterInMemory: ForStoreKanbanCardPort
}

const makeSut = (): SutTypes => {
  const createKanbanCardAdapterInMemory = new KanbanCardRepositoryAdapterInMemory()

  const sut = new CreateKanbanCardUseCase(createKanbanCardAdapterInMemory)

  return {
    sut,
    createKanbanCardAdapterInMemory
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
      const { sut, createKanbanCardAdapterInMemory } = makeSut()

      jest.spyOn(createKanbanCardAdapterInMemory, 'storeKanbanCard')

      await sut.execute(makeFixture())

      expect(createKanbanCardAdapterInMemory.storeKanbanCard).toHaveBeenCalledTimes(1)
      expect(createKanbanCardAdapterInMemory.storeKanbanCard).toHaveBeenCalledWith({
        title: makeFixture().title,
        content: makeFixture().content,
        list: makeFixture().list
      })
    })

    test.todo('should throw an error if repository throw a low-level error')
  })

  test.todo('should return the created kanban card if operation dont have errors')
})
