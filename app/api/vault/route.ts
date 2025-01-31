// file: app/api/vault/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { encrypt, decrypt } from '@/lib/encryption'
import { prisma } from '@/lib/db'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Types
interface VaultEntry {
  id: string
  encryptedData: string
  userId: string
  createdAt: Date
}

interface DecryptedVaultEntry extends Omit<VaultEntry, 'encryptedData'> {
  data: string
}

interface VaultPostRequest {
  data: string
}

interface VaultPutRequest {
  id: string
  data: string
}

interface VaultDeleteRequest {
  id: string
}

interface SessionUser {
  id: string
  email?: string
}

// GET: Retrieve all vault entries
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as SessionUser)?.id
    
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const vaultEntries = await prisma.vault.findMany({
      where: { userId },
      select: { 
        id: true,
        encryptedData: true,
        createdAt: true,
        userId: true // Fixed: Added missing userId
      }
    })

    interface OriginalVaultEntry {
      id: string
      userId: string
      createdAt: Date
      encryptedData: string
    }

    interface DecryptedVaultEntryMapper {
      id: string
      userId: string
      createdAt: Date
      data: string
    }

    const decryptedEntries: DecryptedVaultEntry[] = await Promise.all(
      vaultEntries.map(async (entry: OriginalVaultEntry): Promise<DecryptedVaultEntryMapper> => ({
      id: entry.id,
      userId: entry.userId,
      createdAt: entry.createdAt,
      data: await decrypt(entry.encryptedData)
      }))
    )

    return NextResponse.json(decryptedEntries)
  } catch (error) {
    console.error('GET vault entries failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: Create new entry
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as SessionUser)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data }: VaultPostRequest = await req.json()
    
    if (!data || typeof data !== 'string' || data.length > 10000) {
      return NextResponse.json(
        { error: 'Invalid data format or size' },
        { status: 400 }
      )
    }

    const encryptedData = await encrypt(data)
    
    const newEntry = await prisma.vault.create({
      data: {
        encryptedData,
        userId // Added to match interface
      }
    })

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error('POST vault entry failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: Remove entry
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as SessionUser)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id }: VaultDeleteRequest = await req.json()
    
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Valid ID required' }, { status: 400 })
    }

    const entry = await prisma.vault.findUnique({ where: { id } })
    if (entry?.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.vault.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE vault entry failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT: Update entry
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as SessionUser)?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id, data }: VaultPutRequest = await req.json()
    
    if (!id || typeof id !== 'string' || !data || typeof data !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const entry = await prisma.vault.findUnique({ where: { id } })
    if (entry?.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const encryptedData = await encrypt(data)
    const updatedEntry = await prisma.vault.update({
      where: { id },
      data: { 
        encryptedData,
        userId // Maintain consistency
      }
    })

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error('PUT vault entry failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}