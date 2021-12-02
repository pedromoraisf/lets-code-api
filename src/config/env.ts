import dotenv from 'dotenv'

const isExperimentalRun = ['dev', undefined, false, null]

dotenv.config({
  ...(isExperimentalRun.includes(process.env.NODE_ENV) && {
    path: '.env.example'
  })
})

export const env = {
  CONFIG: {
    HOST: String(process.env.HOST),
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET
  }
}
