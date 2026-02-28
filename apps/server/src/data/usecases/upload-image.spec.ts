import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'
import { UploadImageUseCase } from './upload-image'
import { FileStorageRepository } from '../protocols/file-storage-repository'
import { faker } from '@faker-js/faker'
import { MultipartFile } from '@fastify/multipart'

const fakeUrl = faker.image.url()

const mockMultipartFile: Partial<MultipartFile> = {
  fieldname: 'image',
  filename: 'test.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  file: {} as any,
  fields: {},
  type: 'file'
}

const request = {
  file: mockMultipartFile as MultipartFile,
  baseUrl: faker.internet.url()
}

describe('UploadImageUseCase', () => {
  let sut: UploadImageUseCase
  let fileStorageRepositoryMock: MockProxy<FileStorageRepository>
  
  beforeAll(() => {
    fileStorageRepositoryMock = mock()
  })

  beforeEach(() => {
    vi.clearAllMocks()

    fileStorageRepositoryMock.save.mockResolvedValue({
      url: fakeUrl
    })

    sut = new UploadImageUseCase(fileStorageRepositoryMock)
  })
  it('should return error if fileStorageRepository fails', async () => {
    const throws = () => {
      throw new Error('any_error')
    }
    fileStorageRepositoryMock.save.mockRejectedValueOnce(throws)

    const response = sut.upload(request)
    await expect(response).rejects.toThrow()
  })

  it('should verify that fileStorageRepository is called with correct parameters', async () => {
    await sut.upload(request)

    expect(fileStorageRepositoryMock.save).toBeCalledWith({
      file: request.file,
      baseUrl: request.baseUrl
    })
    expect(fileStorageRepositoryMock.save).toBeCalledTimes(1)
  })

  it('should handle upload gracefully', async () => {
    const response = await sut.upload(request)

    expect(response).toEqual({
      url: fakeUrl
    })
  })
})