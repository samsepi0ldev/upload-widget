import { useUploads } from '../store/uploads'
import { UploadWidgetUploadItem } from './upload-widget-upload-item'

export function UploadWidgetUploadList() {
  const uploads = useUploads((store) => store.uploads)
  const isUploadListEmpty = uploads.size === 0

  return (
    <div className="px-5 pb-4 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files <span className="text-zinc-400">(2)</span>
      </span>
      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">
          No uploads added to the queue
        </span>
      ) : (
        <div className="space-y-2">
          {Array.from(uploads.entries()).map(([uploadId, upload]) => (
            <UploadWidgetUploadItem
              key={uploadId}
              upload={upload}
              uploadId={uploadId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
