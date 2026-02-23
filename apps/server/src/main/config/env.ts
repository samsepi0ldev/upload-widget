import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  UPLOAD_DIR: z
    .string()
    .min(1, '📁 Pasta de upload não pode ser vazia')
    .default('public')
    .describe('📦 Grimório onde as imagens serão guardadas'),
})

const env = envSchema.parse(process.env)

export { env }
