export class MimeType {
  private static readonly ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/jpg',
  ]

  constructor(private readonly value: string) {
    if (!value) throw new Error('MimeType not be empty')
  }

  getValue(): string {
    return this.value
  }

  isAllowed(): boolean {
    return MimeType.ALLOWED_IMAGE_TYPES.includes(this.value)
  }

  getExtension(): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
    }
    return map[this.value] || '.bin'
  }
}
