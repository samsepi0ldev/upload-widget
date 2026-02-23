import type { Image } from '../entities/image'

export interface UploadImage {
  upload: (input: UploadImage.Input) => Promise<UploadImage.Output>
}

export namespace UploadImage {
  export type Input = {
    file: Image
    baseUrl: string
  }
  export type Output = {
    url: string
  }
}
