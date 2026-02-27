import { CanceledError } from 'axios'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/shallow'
import { uploadFileToStorage } from '../http/upload-file-to-storage'
import { compressFile } from '../utils/compress-file'

export interface Upload {
  name: string
  file: File
  abortController?: AbortController
  status: 'progress' | 'success' | 'error' | 'canceled'
  originalSizeInBytes: number
  compressedSizeInBytes?: number
  uploadSizeInBytes: number
  remoteUrl?: string
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
  retryUpload: (uploadId: string) => void
}

enableMapSet()

export const useUploads = create<UploadState, [['zustand/immer', never]]>(
  immer((set, get) => {
    function updateUpload(uploadId: string, data: Partial<Upload>) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      set((store) => {
        store.uploads.set(uploadId, {
          ...upload,
          ...data,
        })
      })
    }

    async function processUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      const fileCompressed = await compressFile({
        file: upload.file,
      })

      const abortController = new AbortController()

      updateUpload(uploadId, {
        file: fileCompressed,
        abortController,
        remoteUrl: undefined,
        status: 'progress',
        uploadSizeInBytes: 0,
        compressedSizeInBytes: fileCompressed.size,
      })

      try {
        const { url } = await uploadFileToStorage(
          {
            file: upload.file,
            onProgress(sizeInBytes) {
              updateUpload(uploadId, {
                uploadSizeInBytes: sizeInBytes,
              })
            },
          },
          {
            signal: abortController.signal,
          },
        )

        updateUpload(uploadId, {
          status: 'success',
          remoteUrl: url,
        })
      } catch (error) {
        if (error instanceof CanceledError) {
          updateUpload(uploadId, {
            status: 'canceled',
          })
          return
        }
        updateUpload(uploadId, {
          status: 'error',
        })
      }
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID()

        const upload: Upload = {
          name: file.name,
          file,
          originalSizeInBytes: file.size,
          uploadSizeInBytes: 0,
          status: 'progress',
          remoteUrl: undefined,
        }

        set((state) => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      upload?.abortController?.abort()

      set((state) => {
        state.uploads.set(uploadId, {
          ...upload,
          status: 'canceled',
        })
      })
    }

    function retryUpload(uploadId: string) {
      processUpload(uploadId)
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
      retryUpload,
    }
  }),
)

export function usePendingUploads() {
  return useUploads(
    useShallow((store) => {
      const uploadsArray = Array.from(store.uploads.values())
      const isThereAnyPendingUpload = uploadsArray.some(
        (upload) => upload.status === 'progress',
      )

      if (!isThereAnyPendingUpload) {
        return { isThereAnyPendingUpload, globalPercentage: 100 }
      }

      const { total, uploaded } = uploadsArray.reduce(
        (acc, cur) => {
          const finalSize = cur.compressedSizeInBytes || cur.originalSizeInBytes

          acc.total += finalSize

          if (cur.status === 'success') {
            acc.uploaded += finalSize
          } else {
            acc.uploaded += Math.min(cur.uploadSizeInBytes || 0, finalSize)
          }

          return acc
        },
        { total: 0, uploaded: 0 },
      )

      const globalPercentage =
        total > 0 ? Math.min(Math.round((uploaded * 100) / total), 100) : 0

      return { isThereAnyPendingUpload, globalPercentage }
    }),
  )
}
