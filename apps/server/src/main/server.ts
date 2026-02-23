import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen({ port: env.PORT }, (_, pathname) => {
  console.log(`Server running at ${pathname}`)
})
