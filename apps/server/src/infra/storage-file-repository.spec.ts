import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { FileStorageServiceRepository } from './storage-file-repository'

vi.mock('fs')
vi.mock('path', async () => {
  const actual = await vi.importActual<typeof import('path')>('path')
  return { ...actual }
})

describe('FileStorageServiceRepository', () => {
  const uploadDir = '/fake/dir'
  const baseUrl = 'http://localhost:3000'
  
  const mockFile = {
    mimetype: 'image/png',
    toBuffer: vi.fn().mockResolvedValue(Buffer.from('any_data')),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create the upload directory if it does not exist on construction', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false)
    
    new FileStorageServiceRepository(uploadDir)

    expect(fs.mkdirSync).toHaveBeenCalledWith(uploadDir, { recursive: true })
  })

  it('should not create the directory if it already exists', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    
    new FileStorageServiceRepository(uploadDir)

    expect(fs.mkdirSync).not.toHaveBeenCalled()
  })

  it('should save the file to disk with a generated name', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync')
    
    const sut = new FileStorageServiceRepository(uploadDir)
    const result = await sut.save({ baseUrl, file: mockFile as any })

    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      expect.stringContaining(uploadDir),
      expect.any(Buffer)
    )

    expect(result.url).toContain(`${baseUrl}/images/`)
    expect(result.url).toEqual(expect.stringMatching(/\.png$/))
  })

  it('should throw if file.toBuffer fails', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    mockFile.toBuffer.mockRejectedValueOnce(new Error('Buffer Error'))
    
    const sut = new FileStorageServiceRepository(uploadDir)
    const promise = sut.save({ baseUrl, file: mockFile as any })

    await expect(promise).rejects.toThrow('Buffer Error')
  })
})