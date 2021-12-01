import { AuthenticationExpressAdapter } from '@src/adapters/http'
import { makeAuthenticationUseCase } from '@src/startup/factories/usecases'

export const makeAuthenticationExpressAdapter = () =>
  new AuthenticationExpressAdapter(makeAuthenticationUseCase())
