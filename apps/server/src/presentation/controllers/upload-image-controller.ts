import type { Image } from '@/domain/entities/image'
import type { UploadImage } from '@/domain/usecases/upload-image'
import { ServerError } from '@/presentation/errors/server-error'
import {
  badRequest,
  created,
  serverError,
} from '@/presentation/helpers/http-helper'
import type { Controller } from '@/presentation/protocols/controller'
import type { HttpRequest } from '@/presentation/protocols/http'
import { promise } from '@/utils/promise'

type Request = {
  file: Image
  baseUrl: string
}

export class UploadImageController implements Controller {
  constructor(private readonly uploadImage: UploadImage) {}
  async handle({ file, baseUrl }: Request): Promise<HttpRequest> {
    const [data, error] = await promise(
      this.uploadImage.upload({ file, baseUrl }),
    )

    if (error) {
      if (error instanceof ServerError) {
        return serverError()
      }
      return badRequest(error)
    }
    return created(data)
  }
}
