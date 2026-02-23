import { makeUploadFileUseCase } from '@/main/factories/usecases/upload-file'
import { UploadImageController } from '@/presentation/controllers/upload-image-controller'

export const makeUploadFileController = () => {
  const uploadFileController = new UploadImageController(
    makeUploadFileUseCase(),
  )
  return uploadFileController
}
