interface CompressFileProps {
  file: File
  quality?: number
  maxWidth?: number
}

function convertToWebp(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.')

  if (lastDotIndex === -1) {
    return `${filename}.webp`
  }

  return `${filename.substring(0, lastDotIndex)}.webp`
}

export function compressFile({
  file,
  quality = 0.8,
  maxWidth = 1000,
}: CompressFileProps) {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error to compress file.'))
              return
            }

            const fileCompressed = new File([blob], convertToWebp(file.name), {
              type: file.type,
              lastModified: Date.now(),
            })

            resolve(fileCompressed.size < file.size ? fileCompressed : file)
          },
          file.type,
          quality,
        )
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}
