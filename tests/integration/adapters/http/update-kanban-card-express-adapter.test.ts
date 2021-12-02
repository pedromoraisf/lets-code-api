import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ChangeKanbanCardUseCase } from '@src/hexagon/usecases'
import { ChangeKanbanCardExpressAdapter } from '@src/adapters/http'
import { makeKanbanCardStub } from '@tests/integration/entities/stubs'
import { makeExpressResponseMock } from '@tests/integration/adapters/http/mocks'

const makeFixture = ({ id = 'any_id', ...body }: any = makeKanbanCardStub()): any => ({
  body,
  params: { id },
  query: {}
})

type SutTypes = {
  sut: ChangeKanbanCardExpressAdapter
  kanbanCardRepositoryInMemoryAdapter: KanbanCardRepositoryInMemoryAdapter
}

const makeSut = (): SutTypes => {
  const kanbanCardRepositoryInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()
  const changeKanbanCardUseCase = new ChangeKanbanCardUseCase(kanbanCardRepositoryInMemoryAdapter)

  const sut = new ChangeKanbanCardExpressAdapter(changeKanbanCardUseCase)

  return {
    sut,
    kanbanCardRepositoryInMemoryAdapter
  }
}

describe('Update Kanban Card Express Adapter', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockReturnValueOnce()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return success object with 200 status code if operation dont have any error', async () => {
    const { sut, kanbanCardRepositoryInMemoryAdapter } = makeSut()

    const { id: TESTABLE_ID } = await kanbanCardRepositoryInMemoryAdapter.storeKanbanCard(
      makeKanbanCardStub()
    )

    const toEdit = { ...makeKanbanCardStub(), id: TESTABLE_ID }

    const testable = await sut.handle(makeFixture(toEdit), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 200,
      result: toEdit
    })
  })

  describe('Client errors', () => {
    test.todo('should return error object with 400 status code if operation receive invalid params')

    test.todo('should return error object with 404 status code if operation receive not found id')
  })

  test.todo('should return error object with 500~ status code if operation have server error')
})
