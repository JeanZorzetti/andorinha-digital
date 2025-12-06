import { describe, it, expect, vi, beforeEach } from 'vitest'
import crypto from 'crypto'

// Mock modules before imports
vi.mock('@/lib/prisma', () => ({
  default: {
    apiSettings: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    apiKey: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import {
  getApiSettings,
  updateApiSettings,
  createApiKey,
  deleteApiKey,
  verifyApiKey,
} from '@/lib/actions/api-actions'

describe('API Settings Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getApiSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getApiSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return existing settings', async () => {
      const mockSettings = {
        id: 'singleton',
        enableRateLimiting: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        enableCors: true,
        allowedOrigins: ['*'],
        allowedMethods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        allowCredentials: true,
        requireApiKey: false,
        apiKeyHeaderName: 'X-API-Key',
        enableRequestLogging: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', name: 'Test', email: 'test@example.com' },
      } as any)
      prisma.apiSettings.findUnique.mockResolvedValue(mockSettings)

      const result = await getApiSettings()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
    })

    it('should create default settings if none exist', async () => {
      const mockSettings = {
        id: 'singleton',
        enableRateLimiting: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      prisma.apiSettings.findUnique.mockResolvedValue(null)
      prisma.apiSettings.create.mockResolvedValue(mockSettings)

      const result = await getApiSettings()

      expect(result.success).toBe(true)
      expect(prisma.apiSettings.create).toHaveBeenCalledWith({
        data: { id: 'singleton' },
      })
    })
  })

  describe('updateApiSettings', () => {
    it('should update settings successfully', async () => {
      const updateData = {
        enableRateLimiting: true,
        requestsPerMinute: 100,
        requestsPerHour: 5000,
        enableCors: true,
        allowedOrigins: ['https://example.com'],
        allowedMethods: ['GET', 'POST', 'PUT'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        allowCredentials: true,
        requireApiKey: true,
        apiKeyHeaderName: 'X-API-Key',
        enableRequestLogging: true,
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      prisma.apiSettings.upsert.mockResolvedValue({
        id: 'singleton',
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await updateApiSettings(updateData)

      expect(result.success).toBe(true)
      expect(prisma.apiSettings.upsert).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        update: updateData,
        create: { id: 'singleton', ...updateData },
      })
    })
  })
})

describe('API Key Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createApiKey', () => {
    it('should create API key with hashed value', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      const mockApiKey = {
        id: 'key-123',
        name: 'Test API Key',
        key: 'hashed-key',
        description: 'Test description',
        scopes: ['read:posts'],
        isActive: true,
        customRateLimit: false,
        requestsPerMinute: null,
        requestsPerHour: null,
        lastUsedAt: null,
        usageCount: 0,
        expiresAt: null,
        createdBy: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prisma.apiKey.create.mockResolvedValue(mockApiKey)

      const result = await createApiKey({
        name: 'Test API Key',
        description: 'Test description',
        scopes: ['read:posts'],
      })

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockApiKey)
      expect(result.plainKey).toBeTruthy()
      expect(result.plainKey).toMatch(/^sk_[a-f0-9]{64}$/)
    })

    it('should handle custom rate limiting', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      prisma.apiKey.create.mockResolvedValue({
        id: 'key-123',
        name: 'Custom Rate Limit Key',
        key: 'hashed-key',
        description: null,
        scopes: [],
        isActive: true,
        customRateLimit: true,
        requestsPerMinute: 100,
        requestsPerHour: 5000,
        lastUsedAt: null,
        usageCount: 0,
        expiresAt: null,
        createdBy: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const result = await createApiKey({
        name: 'Custom Rate Limit Key',
        customRateLimit: true,
        requestsPerMinute: 100,
        requestsPerHour: 5000,
      })

      expect(result.success).toBe(true)
      expect(prisma.apiKey.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            customRateLimit: true,
            requestsPerMinute: 100,
            requestsPerHour: 5000,
          }),
        })
      )
    })
  })

  describe('deleteApiKey', () => {
    it('should delete API key if owned by user', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      prisma.apiKey.findUnique.mockResolvedValue({
        createdBy: 'user-123',
      } as any)
      prisma.apiKey.delete.mockResolvedValue({} as any)

      const result = await deleteApiKey('key-123')

      expect(result.success).toBe(true)
      expect(prisma.apiKey.delete).toHaveBeenCalledWith({
        where: { id: 'key-123' },
      })
    })

    it('should reject deletion if not owned by user', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      prisma.apiKey.findUnique.mockResolvedValue({
        createdBy: 'other-user',
      } as any)

      const result = await deleteApiKey('key-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
      expect(prisma.apiKey.delete).not.toHaveBeenCalled()
    })
  })

  describe('verifyApiKey', () => {
    it('should verify valid active API key', async () => {
      const plainKey = 'sk_testkey123'
      const hashedKey = crypto
        .createHash('sha256')
        .update(plainKey)
        .digest('hex')

      prisma.apiKey.findUnique.mockResolvedValue({
        id: 'key-123',
        name: 'Test Key',
        scopes: ['read:posts', 'write:posts'],
        isActive: true,
        expiresAt: null,
        createdBy: 'user-123',
      })
      prisma.apiKey.update.mockResolvedValue({} as any)

      const result = await verifyApiKey(plainKey)

      expect(result.valid).toBe(true)
      expect(result.apiKey).toEqual({
        id: 'key-123',
        name: 'Test Key',
        scopes: ['read:posts', 'write:posts'],
        userId: 'user-123',
      })
      expect(prisma.apiKey.findUnique).toHaveBeenCalledWith({
        where: { key: hashedKey },
        select: expect.any(Object),
      })
    })

    it('should reject inactive API key', async () => {
      const plainKey = 'sk_testkey123'
      const hashedKey = crypto
        .createHash('sha256')
        .update(plainKey)
        .digest('hex')

      prisma.apiKey.findUnique.mockResolvedValue({
        id: 'key-123',
        name: 'Test Key',
        scopes: [],
        isActive: false,
        expiresAt: null,
        createdBy: 'user-123',
      })

      const result = await verifyApiKey(plainKey)

      expect(result.valid).toBe(false)
      expect(result.apiKey).toBeUndefined()
    })

    it('should reject expired API key', async () => {
      const plainKey = 'sk_testkey123'
      const pastDate = new Date(Date.now() - 86400000) // 1 day ago

      prisma.apiKey.findUnique.mockResolvedValue({
        id: 'key-123',
        name: 'Test Key',
        scopes: [],
        isActive: true,
        expiresAt: pastDate,
        createdBy: 'user-123',
      })

      const result = await verifyApiKey(plainKey)

      expect(result.valid).toBe(false)
    })

    it('should update usage statistics on successful verification', async () => {
      const plainKey = 'sk_testkey123'

      prisma.apiKey.findUnique.mockResolvedValue({
        id: 'key-123',
        name: 'Test Key',
        scopes: [],
        isActive: true,
        expiresAt: null,
        createdBy: 'user-123',
      })
      prisma.apiKey.update.mockResolvedValue({} as any)

      await verifyApiKey(plainKey)

      expect(prisma.apiKey.update).toHaveBeenCalledWith({
        where: { id: 'key-123' },
        data: {
          lastUsedAt: expect.any(Date),
          usageCount: { increment: 1 },
        },
      })
    })
  })
})
