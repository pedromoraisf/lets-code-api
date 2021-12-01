import { GenerateEncryptedCodeMockAdapter } from '@src/adapters/crypto'
import { UserRepositoryInMemoryAdapter } from '@src/adapters/db'
import { ForFindUserPort } from '@src/hexagon/ports/driven'
import { ForGenerateEncryptedCodePort } from '@src/hexagon/ports/driven/crypto'
import { AuthenticationUseCase } from '@src/hexagon/usecases/authentication'

const makeFixture = ({ username = 'any_username', password = 'any_password' }: any = {}) => ({
  username,
  password
})

type SutTypes = {
  sut: AuthenticationUseCase
  findUserInMemoryAdapter: ForFindUserPort
  generateEncryptedCodeMockAdapter: ForGenerateEncryptedCodePort
}

const makeSut = (): SutTypes => {
  const findUserInMemoryAdapter = new UserRepositoryInMemoryAdapter()
  const generateEncryptedCodeMockAdapter = new GenerateEncryptedCodeMockAdapter()

  const sut = new AuthenticationUseCase(findUserInMemoryAdapter, generateEncryptedCodeMockAdapter)

  return {
    sut,
    findUserInMemoryAdapter,
    generateEncryptedCodeMockAdapter
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

  test('should call generate encrypted token correctly', async () => {
    const { sut, findUserInMemoryAdapter, generateEncryptedCodeMockAdapter } = makeSut()

    jest.spyOn(findUserInMemoryAdapter, 'findUser').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        username: 'any_username',
        password: 'any_password'
      })
    )
    jest.spyOn(generateEncryptedCodeMockAdapter, 'generateEncryptedCode')

    await sut.execute(makeFixture())

    expect(generateEncryptedCodeMockAdapter.generateEncryptedCode).toHaveBeenCalledTimes(1)
    expect(generateEncryptedCodeMockAdapter.generateEncryptedCode).toHaveBeenCalledWith({
      lifetime: 3600,
      toEncrypt: {
        id: 'any_id',
        username: 'any_username',
        password: 'any_password'
      }
    })
  })

  test('should return authentication token if operation dont have errors', async () => {
    const { sut } = makeSut()

    const testable = await sut.execute(makeFixture())

    expect(testable).toEqual('any_encrypted_fake_code')
  })
})
