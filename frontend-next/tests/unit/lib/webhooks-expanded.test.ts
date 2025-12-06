import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { dispatchWebhook, WebhookHelpers } from '@/lib/webhooks'

// Mock prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    webhookSubscription: {
      findMany: vi.fn(),
    },
    webhookLog: {
      create: vi.fn(),
    },
  },
}))

// Mock fetch
global.fetch = vi.fn()

import prisma from '@/lib/prisma'

describe('Webhook Dispatch System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('dispatchWebhook', () => {
    it('should not send webhooks when no active subscriptions exist', async () => {
      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue([])

      await dispatchWebhook('USER_CREATED', { userId: '123' })

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'USER_CREATED',
          },
        },
      })
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should send webhook to active subscriptions', async () => {
      const mockSubscription = {
        id: 'sub-123',
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
        secret: 'test-secret',
        events: ['USER_CREATED'],
        isActive: true,
      }

      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue([
        mockSubscription as any,
      ])
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        text: vi.fn().mockResolvedValue('{"success":true}'),
      } as any)
      vi.mocked(prisma.webhookLog.create).mockResolvedValue({} as any)

      await dispatchWebhook('USER_CREATED', { userId: '123', name: 'Test' })

      // Wait for async operations
      await vi.runAllTimersAsync()

      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/webhook',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Webhook-Event': 'USER_CREATED',
            'User-Agent': 'Andorinha-Webhooks/1.0',
          }),
        })
      )
    })

    it('should create webhook log after sending', async () => {
      const mockSubscription = {
        id: 'sub-123',
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
        secret: 'test-secret',
        events: ['USER_CREATED'],
        isActive: true,
      }

      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue([
        mockSubscription as any,
      ])
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        text: vi.fn().mockResolvedValue('OK'),
      } as any)
      vi.mocked(prisma.webhookLog.create).mockResolvedValue({} as any)

      await dispatchWebhook('USER_CREATED', { userId: '123' })
      await vi.runAllTimersAsync()

      expect(prisma.webhookLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          subscriptionId: 'sub-123',
          event: 'USER_CREATED',
          success: true,
          statusCode: 200,
        }),
      })
    })

    it('should handle webhook send failures', async () => {
      const mockSubscription = {
        id: 'sub-123',
        name: 'Test Webhook',
        url: 'https://example.com/webhook',
        secret: 'test-secret',
        events: ['USER_CREATED'],
        isActive: true,
      }

      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue([
        mockSubscription as any,
      ])
      vi.mocked(global.fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: vi.fn().mockResolvedValue('Server Error'),
      } as any)
      vi.mocked(prisma.webhookLog.create).mockResolvedValue({} as any)

      await dispatchWebhook('USER_CREATED', { userId: '123' })
      await vi.runAllTimersAsync()

      expect(prisma.webhookLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          success: false,
          statusCode: 500,
          error: expect.stringContaining('500'),
        }),
      })
    })

    it('should send webhooks to multiple subscriptions', async () => {
      const mockSubscriptions = [
        {
          id: 'sub-1',
          name: 'Webhook 1',
          url: 'https://example.com/webhook1',
          secret: 'secret1',
          events: ['USER_CREATED'],
          isActive: true,
        },
        {
          id: 'sub-2',
          name: 'Webhook 2',
          url: 'https://example.com/webhook2',
          secret: 'secret2',
          events: ['USER_CREATED'],
          isActive: true,
        },
      ]

      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue(
        mockSubscriptions as any
      )
      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        text: vi.fn().mockResolvedValue('OK'),
      } as any)
      vi.mocked(prisma.webhookLog.create).mockResolvedValue({} as any)

      await dispatchWebhook('USER_CREATED', { userId: '123' })
      await vi.runAllTimersAsync()

      expect(global.fetch).toHaveBeenCalledTimes(2)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/webhook1',
        expect.any(Object)
      )
      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/webhook2',
        expect.any(Object)
      )
    })
  })

  describe('WebhookHelpers', () => {
    beforeEach(() => {
      vi.mocked(prisma.webhookSubscription.findMany).mockResolvedValue([])
    })

    it('should dispatch USER_CREATED event', async () => {
      const user = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
      }

      await WebhookHelpers.userCreated(user)

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'USER_CREATED',
          },
        },
      })
    })

    it('should dispatch USER_UPDATED event', async () => {
      const user = {
        id: 'user-123',
        name: 'Updated User',
        email: 'updated@example.com',
        role: 'ADMIN',
      }

      await WebhookHelpers.userUpdated(user)

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'USER_UPDATED',
          },
        },
      })
    })

    it('should dispatch USER_DELETED event', async () => {
      await WebhookHelpers.userDeleted('user-123', 'deleted@example.com')

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'USER_DELETED',
          },
        },
      })
    })

    it('should dispatch POST_PUBLISHED event', async () => {
      const post = {
        id: 'post-123',
        title: 'Test Post',
        slug: 'test-post',
        author: 'Author Name',
      }

      await WebhookHelpers.postPublished(post)

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'POST_PUBLISHED',
          },
        },
      })
    })

    it('should dispatch POST_UNPUBLISHED event', async () => {
      await WebhookHelpers.postUnpublished('post-123', 'Test Post')

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'POST_UNPUBLISHED',
          },
        },
      })
    })

    it('should dispatch CASE_CREATED event', async () => {
      const caseStudy = {
        id: 'case-123',
        title: 'Case Study',
        slug: 'case-study',
        client: 'Client Name',
      }

      await WebhookHelpers.caseCreated(caseStudy)

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'CASE_CREATED',
          },
        },
      })
    })

    it('should dispatch SERVICE_CREATED event', async () => {
      const service = {
        id: 'service-123',
        title: 'Service Title',
        slug: 'service-slug',
      }

      await WebhookHelpers.serviceCreated(service)

      expect(prisma.webhookSubscription.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          events: {
            has: 'SERVICE_CREATED',
          },
        },
      })
    })
  })
})
