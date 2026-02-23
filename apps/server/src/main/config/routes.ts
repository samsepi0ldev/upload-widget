import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { FastifyInstance } from 'fastify'

export default async (app: FastifyInstance): Promise<void> => {
  const routesPath = join(__dirname, '../routes')
  const routeFiles = readdirSync(routesPath)

  const validFiles = routeFiles.filter((file) => !file.endsWith('.map'))

  for (const file of validFiles) {
    const routeModule = await import(`../routes/${file}`)
    const routeFunction = routeModule.default

    if (routeFunction && typeof routeFunction === 'function') {
      await routeFunction(app)
    }
  }
}
