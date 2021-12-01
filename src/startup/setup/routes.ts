/* eslint-disable @typescript-eslint/no-misused-promises */
import { Express } from 'express'
import { makeAuthenticationExpressAdapter } from '@src/startup/factories/adapters/http'

export const setupRoutes = (app: Express) => {
  app.post('/login', makeAuthenticationExpressAdapter().handle)
}
