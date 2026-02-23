export enum HttpStatusCode {
  Created = 201,
  BadRequest = 400,
  ServerError = 500,
}

export interface HttpRequest<T = unknown> {
  data: T
  statusCode: HttpStatusCode
}
