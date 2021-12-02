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

describe('Change Kanban Card Express Adapter', () => {
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
    test('should return error object with 400 status code if operation receive invalid params', async () => {
      const { sut } = makeSut()

      const testable = await sut.handle(makeFixture({ title: false }), makeExpressResponseMock())

      expect(testable).toEqual({
        statusCode: 400,
        result: 'wrong parameters were sent'
      })
    })

    test('should return error object with 404 status code if operation receive not found id', async () => {
      const { sut } = makeSut()

      const NOT_PERSISTED_FIXTURE = makeFixture()

      const testable = await sut.handle(NOT_PERSISTED_FIXTURE, makeExpressResponseMock())

      expect(testable).toEqual({
        statusCode: 404,
        result: 'invalid id provided'
      })
    })
  })

  test('should return error object with 500~ status code if operation have server error', async () => {
    const { sut, kanbanCardRepositoryInMemoryAdapter } = makeSut()

    jest
      .spyOn(kanbanCardRepositoryInMemoryAdapter, 'updateKanbanCard')
      .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

    const testable = await sut.handle(makeFixture(), makeExpressResponseMock())

    expect(testable).toEqual({
      statusCode: 500,
      result: 'server error'
    })
  })
})
