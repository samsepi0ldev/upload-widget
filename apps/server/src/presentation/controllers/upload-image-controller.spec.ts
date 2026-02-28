import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'
import { faker } from '@faker-js/faker'
import { MultipartFile } from '@fastify/multipart'

import { UploadImageController } from './upload-image-controller'
import { UploadImage } from '@/domain/usecases/upload-image'
import { ServerError } from '../errors/server-error'
import { badRequest, created, serverError } from '../helpers/http-helper'


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


describe('Test UploadImageController', () => {
  let sut: UploadImageController
  let uploadImageMock: MockProxy<UploadImage>
  
  beforeAll(() => {
    uploadImageMock = mock()
  })
  beforeEach(() => {
    vi.clearAllMocks()
    uploadImageMock.upload.mockResolvedValue({
      url: fakeUrl
    })
    sut = new UploadImageController(uploadImageMock)
  })
  it('should return 500 server error when upload throws ServerError', async () => {
    const serverErrorInstance = new ServerError()
    uploadImageMock.upload.mockRejectedValue(serverErrorInstance)

    const response = await sut.handle(request)

    expect(response).toEqual(serverError())
    expect(uploadImageMock.upload).toHaveBeenCalledTimes(1)
    expect(uploadImageMock.upload).toHaveBeenCalledWith({
      file: request.file,
      baseUrl: request.baseUrl
    })
  })

   it('should return 400 bad request when upload throws generic error', async () => {
    const genericError = new Error('Invalid image format')
    uploadImageMock.upload.mockRejectedValue(genericError)

    const response = await sut.handle(request)

    expect(response).toEqual(badRequest(genericError))
    expect(uploadImageMock.upload).toHaveBeenCalledTimes(1)
    expect(uploadImageMock.upload).toHaveBeenCalledWith({
      file: request.file,
      baseUrl: request.baseUrl
    })
  })

    it('should verify that upload is called with correct parameters', async () => {
    await sut.handle(request)

    expect(uploadImageMock.upload).toHaveBeenCalledWith({
      file: request.file,
      baseUrl: request.baseUrl
    })
    expect(uploadImageMock.upload).toHaveBeenCalledTimes(1)
  })

  it('should handle request gracefully', async () => {
    const response = await sut.handle(request)

    expect(response).toStrictEqual(created({ url: fakeUrl }))
  });
})