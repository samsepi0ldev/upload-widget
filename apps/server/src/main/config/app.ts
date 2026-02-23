import path from 'node:path'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { fastify } from 'fastify'

import setupRoutes from './routes'

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4 // 4mb

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})
app.register(fastifyMultipart, {
  limits: {
    fileSize: MAXIMUM_FILE_SIZE_IN_BYTES,
  },
})
app.register(fastifyStatic, {
  root: path.join(__dirname, '../../../public'),
  prefix: '/images/',
  decorateReply: true,
  index: false,
  list: false,
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  maxAge: '7d',
  immutable: true,
})

setupRoutes(app)

export { app }
