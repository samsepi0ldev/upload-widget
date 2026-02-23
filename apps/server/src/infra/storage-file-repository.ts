import fs from 'fs'
import path from 'path'

import type { FileStorageRepository } from '@/data/protocols/file-storage-repository'
import { MimeType } from '@/domain/entities/mimetype'

export class FileStorageServiceRepository implements FileStorageRepository {
  constructor(private readonly uploadDir: string) {
    this.ensureUploadDirExists()
  }

  private ensureUploadDirExists(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }
  }
  async save({
    baseUrl,
    file,
  }: FileStorageRepository.Input): Promise<FileStorageRepository.Output> {
    const mimeType = new MimeType(file.mimetype)
    const extension = mimeType.getExtension()
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const storedName = `${timestamp}_${random}${extension}`

    const filePath = path.join(this.uploadDir, storedName)

    const data = await file.toBuffer()
    fs.writeFileSync(filePath, data)

    const url = `${baseUrl}/images/${storedName}`

    return { url }
  }
}
