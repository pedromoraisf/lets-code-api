import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'

const makeFixture = ({ id = 'any_id' }: any = {}) => ({
  id
})

type SutTypes = {
  sut: RemoveKanbanCardUseCase
}

const makeSut = (): SutTypes => {
  const sut = new RemoveKanbanCardUseCase()

  return {
    sut
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
    test.todo('should call repository method correctly')

    test.todo('should throw an error if repository throw a low-level error')
  })

  test.todo('should return kanban cards list if operation dont have errors')
})
