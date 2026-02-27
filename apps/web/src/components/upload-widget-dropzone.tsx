import { motion } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { usePendingUploads, useUploads } from '../store/uploads'
import CircularProgressBar from './ui/circular-progress-bar'

export function UploadWidgetDropzone() {
  const { globalPercentage, isThereAnyPendingUpload } = usePendingUploads()

  const addUploads = useUploads((store) => store.addUploads)
  const amountOfUploads = useUploads((store) => store.uploads.size)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop(acceptedFiles) {
      addUploads(acceptedFiles)
    },
  })
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      className="px-5 flex flex-col gap-2.5"
    >
      <div
        data-active={isDragActive}
        {...getRootProps()}
        className="cursor-pointer text-zinc-400 w-full h-36 flex items-center justify-center bg-zinc-950 border border-dashed border-zinc-700 hover:border-zinc-600 p-5 rounded-lg data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500 data-[active=true]:**:text-indigo-400! data-[active=true]:border-solid transition-colors"
      >
        <input type="file" {...getInputProps()} />
        {isThereAnyPendingUpload ? (
          <div className="flex flex-col items-center gap-2.5">
            <CircularProgressBar
              progress={globalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span className="text-xs">
              Uploading {amountOfUploads} files...
            </span>
          </div>
        ) : (
          <p className="text-xs text-zinc-400 text-center [&_strong]:text-zinc-300 [&_strong]:font-medium [&_strong]:underline">
            Drag & drop your files here or
            <strong className="block">Choose files</strong>
          </p>
        )}
      </div>
      <span className="text-zinc-400 text-xxs">Only PNG and JPG (4mb max)</span>
    </motion.div>
  )
}
