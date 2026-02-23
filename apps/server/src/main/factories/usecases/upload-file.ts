import { UploadImageUseCase } from '@/data/usecases/upload-image'
import { makeUploadFileRepository } from '@/main/factories/repositories/upload-file-repository'

export const makeUploadFileUseCase = () => {
  const uploadFile = new UploadImageUseCase(makeUploadFileRepository())
  return uploadFile
}
