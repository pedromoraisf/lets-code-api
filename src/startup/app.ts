import express from 'express'
import { setupMiddlewares } from '@src/startup/setup'

const app = express()
setupMiddlewares(app)

export { app }
