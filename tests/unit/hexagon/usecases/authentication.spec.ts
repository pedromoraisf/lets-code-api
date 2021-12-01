import { UserRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForFindUserPort } from '@src/hexagon/ports/driven'
import { AuthenticationUseCase } from '@src/hexagon/usecases/authentication'

const makeFixture = ({ username = 'any_username', password = 'any_password' }: any = {}) => ({
  username,
  password
})

type SutTypes = {
  sut: AuthenticationUseCase
  findUserInMemoryAdapter: ForFindUserPort
}

const makeSut = (): SutTypes => {
  const findUserInMemoryAdapter = new UserRepositoryInMemoryAdapter()

  const sut = new AuthenticationUseCase(findUserInMemoryAdapter)

  return {
    sut,
    findUserInMemoryAdapter
  }
}

describe('Authentication Use Case', () => {
  describe('Find user repository', () => {
    test('should call repository method correctly', async () => {
      const { sut, findUserInMemoryAdapter } = makeSut()

      jest.spyOn(findUserInMemoryAdapter, 'findUser')

      await sut.execute(makeFixture())

      expect(findUserInMemoryAdapter.findUser).toHaveBeenCalledTimes(1)
      expect(findUserInMemoryAdapter.findUser).toHaveBeenCalledWith(makeFixture())
    })

    test('should throw an error if repository throw a low-level error', async () => {
      const { sut, findUserInMemoryAdapter } = makeSut()

      jest
        .spyOn(findUserInMemoryAdapter, 'findUser')
        .mockReturnValueOnce(Promise.reject(new Error('any_low_level_error')))

      const testable = async () => await sut.execute(makeFixture())

      return await expect(testable).rejects.toThrowError(new Error('any_low_level_error'))
    })
  })

  test.todo('should call authentication token generate correctly')

  test.todo('should return authentication token if operation dont have errors')
})
