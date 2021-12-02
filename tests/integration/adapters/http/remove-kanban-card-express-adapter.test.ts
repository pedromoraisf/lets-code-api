import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { RemoveKanbanCardExpressAdapter } from '@src/adapters/http'
import { ForDeleteKanbanCardPort, ForFindAllKanbanCardsPort } from '@src/hexagon/ports/driven'
import { RemoveKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeExpressResponseMock } from '@tests/integration/adapters/http/mocks'
import { makeKanbanCardStub } from '@tests/integration/entities/stubs'

const makeFixture = ({ id = 'any_id' }: any = {}): any => ({
  body: {},
  params: { id },
  query: {}
})

const makeKanbanCardRepositoryInMemoryAdapter = async () => {
  const inMemory = new KanbanCardRepositoryInMemoryAdapter()

  await inMemory.storeKanbanCard(makeKanbanCardStub())
  await inMemory.storeKanbanCard(makeKanbanCardStub())

  return inMemory
}

type SutTypes = {
  sut: RemoveKanbanCardExpressAdapter
  deleteKanbanCardRepositoryInMemoryAdapter: ForDeleteKanbanCardPort
  findAllKanbanCardsRepositoryInMemoryAdapter: ForFindAllKanbanCardsPort
}

const makeSut = async (): Promise<SutTypes> => {
  const kanbanCardRepositoryInMemoryAdapter = makeKanbanCardRepositoryInMemoryAdapter()

  const deleteKanbanCardRepositoryInMemoryAdapter: ForDeleteKanbanCardPort =
    await kanbanCardRepositoryInMemoryAdapter
  const findAllKanbanCardsRepositoryInMemoryAdapter: ForFindAllKanbanCardsPort =
    await kanbanCardRepositoryInMemoryAdapter
  const removeKanbanCardUseCase = new RemoveKanbanCardUseCase(
    deleteKanbanCardRepositoryInMemoryAdapter,
    findAllKanbanCardsRepositoryInMemoryAdapter
  )

  const sut = new RemoveKanbanCardExpressAdapter(removeKanbanCardUseCase)

  return {
    sut,
    deleteKanbanCardRepositoryInMemoryAdapter,
    findAllKanbanCardsRepositoryInMemoryAdapter
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
    const { sut } = await makeSut()

    const testable = await sut.handle(makeFixture(), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 200,
      result: [
        expect.objectContaining({
          content: makeKanbanCardStub().content,
          list: makeKanbanCardStub().list,
          title: makeKanbanCardStub().title
        })
      ]
    })
  })

  test.todo('should return error object with 404 status code if operation have client error')

  test.todo('should return error object with 500~ status code if operation have server error')
})
