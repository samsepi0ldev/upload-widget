import { ServerError } from '@/presentation/errors/server-error'
import { type HttpRequest, HttpStatusCode } from '@/presentation/protocols/http'

export const created = (data: unknown): HttpRequest => ({
  data,
  statusCode: HttpStatusCode.Created,
})

export const badRequest = (data: Error): HttpRequest => ({
  data,
  statusCode: HttpStatusCode.BadRequest,
})

export const serverError = (): HttpRequest => ({
  data: new ServerError(),
  statusCode: HttpStatusCode.ServerError,
})
