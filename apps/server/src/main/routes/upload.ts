import type { FastifyInstance } from 'fastify'
import { adaptRoute } from '../adapters/route-adapter'
import { makeUploadFileController } from '../factories/controllers/upload-file-controller'

export default async function uploadImageRoute(app: FastifyInstance) {
  app.post('/uploads', adaptRoute(makeUploadFileController()))
}
