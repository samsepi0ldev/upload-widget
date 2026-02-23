import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Controller } from '@/presentation/protocols/controller'

type Adapt = (
  controller: Controller,
) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>

export const adaptRoute: Adapt = (controller: Controller) => {
  return async (req, reply) => {
    const file = await req.file()
    const baseUrl = `${req.protocol}://${req.host}`

    const requestData = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      ...(req.headers ? { headers: req.headers } : {}),
      file,
      baseUrl,
    }

    const { data, statusCode } = await controller.handle(requestData)
    if (statusCode >= 200 && statusCode <= 299) {
      return reply.status(statusCode).send(data)
    } else {
      return reply.status(statusCode).send({
        error: data?.message || 'Unknown Error',
      })
    }
  }
}
