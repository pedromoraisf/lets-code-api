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
}

const makeSut = (): SutTypes => {
  const sut = new ChangeKanbanCardUseCase()

  return {
    sut
  }
}

describe('Change Kanban Card Use Case', () => {
  test('should validate that id, title, content and list are filled', async () => {
    const { sut } = makeSut()

    const wrongFixture = makeFixture({ id: false })

    const testable = async () => await sut.execute(wrongFixture)

    return await expect(testable).rejects.toThrowError()
  })
})
