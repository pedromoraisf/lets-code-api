/* eslint-disable @typescript-eslint/no-misused-promises */
import { Express } from 'express'
import {
  makeAuthenticationExpressAdapter,
  makeChangeKanbanCardExpressAdapter,
  makeCreateKanbanCardExpressAdapter,
  makeListKanbanCardsExpressAdapter,
  makeRemoveKanbanCardExpressAdapter
} from '@src/startup/factories/adapters/http'
import { jwtBearerAuthentication } from '@src/startup/middlewares'

export const setupRoutes = (app: Express) => {
  app.post('/login', makeAuthenticationExpressAdapter().handle)
  app.post('/cards', jwtBearerAuthentication, makeCreateKanbanCardExpressAdapter().handle)
  app.put('/cards/:id', jwtBearerAuthentication, makeChangeKanbanCardExpressAdapter().handle)
  app.get('/cards', jwtBearerAuthentication, makeListKanbanCardsExpressAdapter().handle)
  app.delete('/cards/:id', jwtBearerAuthentication, makeRemoveKanbanCardExpressAdapter().handle)
}
