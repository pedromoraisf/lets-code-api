import { env } from '@src/config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const jwtBearerAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({
      error: 'no token informed'
    })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).send({
      error: 'token error'
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      error: 'poorly formatted token'
    })
  }

  jwt.verify(token, env.CONFIG.JWT_SECRET, err => {
    if (err) return res.status(401).send({ error: 'expired token' })

    return next()
  })
}
