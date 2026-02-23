import { FileStorageServiceRepository } from '@/infra/storage-file-repository'

export const makeUploadFileRepository = () => {
  const fileStorageServiceRepository = new FileStorageServiceRepository(
    'public',
  )
  return fileStorageServiceRepository
}
