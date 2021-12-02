import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { RemoveKanbanCardExpressAdapter } from '@src/adapters/http'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeExpressResponseMock } from '@tests/integration/adapters/http/mocks'
import { makeKanbanCardStub } from '@tests/integration/entities/stubs'

const makeFixture = ({ id = 'any_id' }: any = {}): any => ({
  body: {},
  params: { id },
  query: {}
})

type SutTypes = {
  sut: RemoveKanbanCardExpressAdapter
  kanbanCardRepositoryInMemoryAdapter: KanbanCardRepositoryInMemoryAdapter
}

const makeSut = async (): Promise<SutTypes> => {
  const kanbanCardRepositoryInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()
  const removeKanbanCardUseCase = new RemoveKanbanCardUseCase(
    kanbanCardRepositoryInMemoryAdapter,
    kanbanCardRepositoryInMemoryAdapter
  )

  const sut = new RemoveKanbanCardExpressAdapter(removeKanbanCardUseCase)

  return {
    sut,
    kanbanCardRepositoryInMemoryAdapter
  }
}

describe('Remove Kanban Card Express Adapter', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockReturnValueOnce()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return success object with 200 status code if operation dont have any error', async () => {
    const { sut, kanbanCardRepositoryInMemoryAdapter } = await makeSut()

    const { id: EXPECTED_ID } = await kanbanCardRepositoryInMemoryAdapter.storeKanbanCard(
      makeKanbanCardStub()
    )
    const { id: TESTABLE_ID } = await kanbanCardRepositoryInMemoryAdapter.storeKanbanCard(
      makeKanbanCardStub()
    )

    const testable = await sut.handle(makeFixture({ id: TESTABLE_ID }), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 200,
      result: [
        {
          id: EXPECTED_ID,
          content: makeKanbanCardStub().content,
          list: makeKanbanCardStub().list,
          title: makeKanbanCardStub().title
        }
      ]
    })
  })

  test.todo('should return error object with 404 status code if operation have client error')

  test.todo('should return error object with 500~ status code if operation have server error')
})
