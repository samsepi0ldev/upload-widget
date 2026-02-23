import { UploadImageController } from '@/presentation/controllers/upload-image-controller'
import { makeUploadFileUseCase } from '../usecases/upload-file'

export const makeUploadFileController = () => {
  const uploadFileController = new UploadImageController(
    makeUploadFileUseCase(),
  )
  return uploadFileController
}
