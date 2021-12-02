import { KanbanCardRepositoryInMemoryAdapter } from '@src/adapters/db'
import { CreateKanbanCardExpressAdapter } from '@src/adapters/http'
import { ForStoreKanbanCardPort } from '@src/hexagon/ports/driven'
import { CreateKanbanCardUseCase } from '@src/hexagon/usecases'
import { makeExpressResponseMock } from '@tests/integration/adapters/http/mocks'

const makeFixture = ({
  title = 'any_title',
  content = 'any_content',
  list = 'any_list'
}: any = {}): any => ({
  body: {
    title,
    content,
    list
  },
  params: {},
  query: {}
})

type SutTypes = {
  sut: CreateKanbanCardExpressAdapter
  kanbanCardRepositoryInMemoryAdapter: ForStoreKanbanCardPort
}

const makeSut = (): SutTypes => {
  const kanbanCardRepositoryInMemoryAdapter = new KanbanCardRepositoryInMemoryAdapter()
  const createKanbanCardUseCase = new CreateKanbanCardUseCase(kanbanCardRepositoryInMemoryAdapter)

  const sut = new CreateKanbanCardExpressAdapter(createKanbanCardUseCase)

  return {
    sut,
    kanbanCardRepositoryInMemoryAdapter
  }
}

describe('Create Kanban Card Express Adapter', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockReturnValueOnce()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return success object with 202 status code if operation dont have any error', async () => {
    const { sut } = makeSut()

    const testable = await sut.handle(makeFixture(), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 202,
      result: expect.objectContaining({
        content: 'any_content',
        list: 'any_list',
        title: 'any_title'
      })
    })
  })

  test('should return error object with 400 status code if operation have client error', async () => {
    const { sut } = makeSut()

    const testable = await sut.handle(makeFixture({ title: false }), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 400,
      result: 'wrong parameters were sent'
    })
  })

  test('should return error object with 500~ status code if operation have server error', async () => {
    const { sut, kanbanCardRepositoryInMemoryAdapter } = makeSut()

    jest
      .spyOn(kanbanCardRepositoryInMemoryAdapter, 'storeKanbanCard')
      .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

    const testable = await sut.handle(makeFixture(), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 500,
      result: 'server error'
    })
  })
})
