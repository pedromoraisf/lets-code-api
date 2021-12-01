/* eslint-disable @typescript-eslint/no-misused-promises */
import { Express } from 'express'
import {
  makeAuthenticationExpressAdapter,
  makeChangeKanbanCardExpressAdapter,
  makeCreateKanbanCardExpressAdapter
} from '@src/startup/factories/adapters/http'

export const setupRoutes = (app: Express) => {
  app.post('/login', makeAuthenticationExpressAdapter().handle)
  app.post('/cards', makeCreateKanbanCardExpressAdapter().handle)
  app.put('/cards/:id', makeChangeKanbanCardExpressAdapter().handle)
}
