//file:lib/db.ts
import { PrismaClient } from '@prisma/client'
import { env } from '@/env.mjs'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientConfig = {
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

export const prisma = global.prisma || new PrismaClient(prismaClientConfig)

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export class DatabaseError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message)
    this.name = 'DatabaseError'
    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

export async function withDb<T>(
  operation: (client: PrismaClient) => Promise<T>
): Promise<T> {
  try {
    return await operation(prisma)
  } catch (error) {
    console.error('Database operation failed:', error)
    throw new DatabaseError(
      error instanceof Error ? error.message : 'Database operation failed',
      error instanceof Error ? error.stack : undefined
    )
  }
}

export default prisma