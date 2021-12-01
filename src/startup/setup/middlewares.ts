import express, { Express } from 'express'

export const setupMiddlewares = (app: Express) => {
  app.use(express.json())
}
