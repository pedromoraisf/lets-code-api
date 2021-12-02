import { AuthenticationUseCase } from '@src/hexagon/usecases/authentication'
import { makeGenerateCryptoCodeJwtAdapter } from '@src/startup/factories/adapters/crypto'
import { makeUserRepositoryInMemoryAdapter } from '@src/startup/factories/adapters/db'

export const makeAuthenticationUseCase = () =>
  new AuthenticationUseCase(makeUserRepositoryInMemoryAdapter(), makeGenerateCryptoCodeJwtAdapter())
