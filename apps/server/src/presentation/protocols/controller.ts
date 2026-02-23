import type { HttpRequest } from '@/presentation/protocols/http'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpRequest>
}
