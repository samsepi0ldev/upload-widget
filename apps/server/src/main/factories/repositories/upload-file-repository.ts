import { FileStorageServiceRepository } from '@/infra/storage-file-repository'
import { env } from '@/main/config/env'

export const makeUploadFileRepository = () => {
  const fileStorageServiceRepository = new FileStorageServiceRepository(
    env.UPLOAD_DIR,
  )
  return fileStorageServiceRepository
}
