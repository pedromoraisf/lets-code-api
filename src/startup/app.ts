import express from 'express'
import { setupMiddlewares, setupRoutes } from '@src/startup/setup'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export { app }
