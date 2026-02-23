import type { UploadImage } from '@/domain/usecases/upload-image'

export interface FileStorageRepository {
  save: (
    input: FileStorageRepository.Input,
  ) => Promise<FileStorageRepository.Output>
}

export namespace FileStorageRepository {
  export type Input = UploadImage.Input
  export type Output = UploadImage.Output
}
