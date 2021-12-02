import { env } from '@src/config'
import { app } from '@src/startup/app'

app.listen(env.CONFIG.PORT, env.CONFIG.HOST, () =>
  console.log(`Online at ${env.CONFIG.HOST}/${env.CONFIG.PORT}`)
)
