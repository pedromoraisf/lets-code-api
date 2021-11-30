import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'

const makeFixture = ({
  title = 'any_title',
  content = 'any_content',
  list = 'any_list'
} = {}): any => ({
  title,
  content,
  list
})

type SutTypes = {
  sut: CreateKanbanCardUseCase
}

const makeSut = (): SutTypes => {
  const sut = new CreateKanbanCardUseCase()

  return {
    sut
  }
}

describe('Create Kanban Card Use Case', () => {
  test('should validate that title, content and list are filled', async () => {
    const { sut } = makeSut()

    const wrongFixture = makeFixture({ title: undefined })

    const testable = async () => await sut.execute(wrongFixture)

    await expect(testable).rejects.toThrowError()
  })

  describe('Create kanban card repository', () => {
    test.todo('should call repository method correctly')

    test.todo('should throw an error if repository throw a low-level error')
  })

  test.todo('should return the created kanban card if operation dont have errors')
})
