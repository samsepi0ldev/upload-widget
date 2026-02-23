import type { FileStorageRepository } from '@/data/protocols/file-storage-repository'
import type { UploadImage } from '@/domain/usecases/upload-image'

export class UploadImageUseCase implements UploadImage {
  constructor(private readonly fileStorageRepository: FileStorageRepository) {}
  async upload({
    file,
    baseUrl,
  }: UploadImage.Input): Promise<UploadImage.Output> {
    const storedImage = await this.fileStorageRepository.save({
      file,
      baseUrl,
    })

    return storedImage
  }
}
