import * as Progress from '@radix-ui/react-progress'
import { Download, ImageUp, Link2, RefreshCcw, X } from 'lucide-react'
import { motion } from 'motion/react'
import { type Upload, useUploads } from '../store/uploads'
import { downloadUrl } from '../utils/download-url'
import { formatFileSize } from '../utils/format-file-size'
import { Button } from './ui/button'

interface UploadWidgetUploadItemProps {
  upload: Upload
  uploadId: string
}

export function UploadWidgetUploadItem({
  upload,
  uploadId,
}: UploadWidgetUploadItemProps) {
  const cancelUpload = useUploads((store) => store.cancelUpload)
  const retryUpload = useUploads((store) => store.retryUpload)

  const progress = Math.min(
    Math.round((upload.uploadSizeInBytes * 100) / upload.originalSizeInBytes),
    100,
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
      className="rounded-xl shadow-shape-content bg-white/2 p-3 flex flex-col gap-3 relative"
    >
      <div>
        <div className="flex items-center gap-1">
          <ImageUp strokeWidth={1.5} className="size-3 text-zinc-300" />
          <span className="text-xs font-medium text-white">{upload.name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xxs text-zinc-400 ">
          <span className="line-through">
            {formatFileSize(upload.originalSizeInBytes)}
          </span>

          <span>
            {' '}
            {formatFileSize(upload.compressedSizeInBytes ?? 0)}
            {upload.compressedSizeInBytes && (
              <span className="text-green-400 ml-1">
                -
                {Math.round(
                  ((upload.originalSizeInBytes - upload.compressedSizeInBytes) *
                    100) /
                    upload.originalSizeInBytes,
                )}
                %
              </span>
            )}
          </span>
          <div className="w-px h-2.5 block bg-zinc-700" />
          {upload.status === 'success' && (
            <span className="text-green-400">Upload finished</span>
          )}
          {upload.status === 'progress' && <span>{progress}%</span>}
          {upload.status === 'error' && (
            <span className="text-red-400">Upload failed</span>
          )}
          {upload.status === 'canceled' && (
            <span className="text-yellow-400">Upload canceled</span>
          )}
        </div>
      </div>
      <Progress.Root
        value={progress}
        data-status={upload.status}
        className="h-1 bg-zinc-800 rounded-full overflow-hidden group"
      >
        <Progress.Indicator
          className="h-1 bg-indigo-500 group-data-[status=success]:bg-green-400 group-data-[status=error]:bg-red-400 group-data-[status=canceled]:bg-yellow-400 transition-all"
          style={{
            width: upload.status === 'progress' ? `${progress}%` : '100%',
          }}
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button
          aria-disabled={!upload.remoteUrl}
          onClick={() => {
            if (upload.remoteUrl) {
              downloadUrl(upload.remoteUrl)
            }
          }}
          size="icon-sm"
        >
          <Download strokeWidth={1.5} className="size-3.5 text-zinc-400" />
          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button
          disabled={!upload.remoteUrl}
          size="icon-sm"
          onClick={() => {
            upload.remoteUrl && navigator.clipboard.writeText(upload.remoteUrl)
          }}
        >
          <Link2 strokeWidth={1.5} className="size-3.5 text-zinc-400" />
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button
          disabled={!['canceled', 'error'].includes(upload.status)}
          size="icon-sm"
          onClick={() => retryUpload(uploadId)}
        >
          <RefreshCcw strokeWidth={1.5} className="size-3.5 text-zinc-400" />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== 'progress'}
          size="icon-sm"
          onClick={() => cancelUpload(uploadId)}
        >
          <X strokeWidth={1.5} className="size-3.5 text-zinc-400" />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </motion.div>
  )
}
