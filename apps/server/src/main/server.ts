import { app } from '@/main/config/app'

const PORT = 3333

app.listen({ port: PORT }, (_, pathname) => {
  console.log(`Server running at ${pathname}`)
})
