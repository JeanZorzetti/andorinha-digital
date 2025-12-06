import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock modules before imports
vi.mock('@/lib/prisma', () => ({
  default: {
    siteSettings: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
      update: vi.fn(),
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
import { revalidatePath } from 'next/cache'
import {
  getSiteSettings,
  updateSiteSettings,
  toggleMaintenanceMode,
} from '@/lib/actions/settings-actions'

describe('Site Settings Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSiteSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getSiteSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return existing settings', async () => {
      const mockSettings = {
        id: 'singleton',
        siteName: 'Andorinha Digital',
        siteDescription: 'Test description',
        siteUrl: 'https://example.com',
        contactEmail: 'contact@example.com',
        supportEmail: 'support@example.com',
        phone: '+55 11 98765-4321',
        logo: '/logo.png',
        favicon: '/favicon.ico',
        ogImage: '/og-image.jpg',
        timezone: 'America/Sao_Paulo',
        language: 'pt-BR',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        facebookUrl: 'https://facebook.com/test',
        instagramUrl: 'https://instagram.com/test',
        linkedinUrl: 'https://linkedin.com/company/test',
        twitterUrl: 'https://twitter.com/test',
        youtubeUrl: 'https://youtube.com/@test',
        defaultMetaTitle: 'Test Site',
        defaultMetaDescription: 'Test meta description',
        defaultMetaKeywords: ['test', 'site'],
        googleAnalyticsId: 'G-XXXXXXXXXX',
        facebookPixelId: '123456789',
        googleTagManager: 'GTM-XXXXXXX',
        clarityId: 'XXXXXXXXX',
        maintenanceMode: false,
        maintenanceMessage: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', name: 'Test', email: 'test@example.com' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockResolvedValue(mockSettings)

      const result = await getSiteSettings()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
      expect(prisma.siteSettings.findUnique).toHaveBeenCalledWith({
        where: { id: 'singleton' },
      })
    })

    it('should create default settings if none exist', async () => {
      const mockSettings = {
        id: 'singleton',
        siteName: 'Andorinha Digital',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.siteSettings.create).mockResolvedValue(mockSettings as any)

      const result = await getSiteSettings()

      expect(result.success).toBe(true)
      expect(prisma.siteSettings.create).toHaveBeenCalledWith({
        data: { id: 'singleton' },
      })
    })

    it('should handle database errors', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockRejectedValue(
        new Error('Database connection failed')
      )

      const result = await getSiteSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Database connection failed')
    })
  })

  describe('updateSiteSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await updateSiteSettings({ siteName: 'Test' })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return error if user is not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'USER' },
      } as any)

      const result = await updateSiteSettings({ siteName: 'Test' })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should update settings successfully for admin user', async () => {
      const updateData = {
        siteName: 'Updated Site Name',
        siteDescription: 'Updated description',
        contactEmail: 'new@example.com',
        maintenanceMode: false,
      }

      const mockUpdatedSettings = {
        id: 'singleton',
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.upsert).mockResolvedValue(
        mockUpdatedSettings as any
      )

      const result = await updateSiteSettings(updateData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockUpdatedSettings)
      expect(prisma.siteSettings.upsert).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        create: { id: 'singleton', ...updateData },
        update: updateData,
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/general')
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })

    it('should handle social media URLs', async () => {
      const updateData = {
        facebookUrl: 'https://facebook.com/updated',
        instagramUrl: 'https://instagram.com/updated',
        linkedinUrl: 'https://linkedin.com/company/updated',
        twitterUrl: 'https://twitter.com/updated',
        youtubeUrl: 'https://youtube.com/@updated',
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.upsert).mockResolvedValue({
        id: 'singleton',
        ...updateData,
      } as any)

      const result = await updateSiteSettings(updateData)

      expect(result.success).toBe(true)
      expect(prisma.siteSettings.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: updateData,
        })
      )
    })

    it('should handle SEO metadata', async () => {
      const updateData = {
        defaultMetaTitle: 'Updated SEO Title',
        defaultMetaDescription: 'Updated SEO description',
        defaultMetaKeywords: ['seo', 'optimization', 'test'],
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.upsert).mockResolvedValue({
        id: 'singleton',
        ...updateData,
      } as any)

      const result = await updateSiteSettings(updateData)

      expect(result.success).toBe(true)
      expect(result.data?.defaultMetaKeywords).toEqual(['seo', 'optimization', 'test'])
    })

    it('should handle tracking IDs', async () => {
      const updateData = {
        googleAnalyticsId: 'G-NEWTRACKING',
        facebookPixelId: '987654321',
        googleTagManager: 'GTM-NEWGTM',
        clarityId: 'NEWCLARITY',
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.upsert).mockResolvedValue({
        id: 'singleton',
        ...updateData,
      } as any)

      const result = await updateSiteSettings(updateData)

      expect(result.success).toBe(true)
      expect(result.data).toMatchObject(updateData)
    })

    it('should handle database errors', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.upsert).mockRejectedValue(
        new Error('Database write failed')
      )

      const result = await updateSiteSettings({ siteName: 'Test' })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Database write failed')
    })
  })

  describe('toggleMaintenanceMode', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return error if user is not admin', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'USER' },
      } as any)

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should toggle maintenance mode from false to true', async () => {
      const currentSettings = {
        id: 'singleton',
        maintenanceMode: false,
      }

      const updatedSettings = {
        id: 'singleton',
        maintenanceMode: true,
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockResolvedValue(
        currentSettings as any
      )
      vi.mocked(prisma.siteSettings.update).mockResolvedValue(
        updatedSettings as any
      )

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(true)
      expect(result.maintenanceMode).toBe(true)
      expect(prisma.siteSettings.update).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        data: { maintenanceMode: true },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/general')
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })

    it('should toggle maintenance mode from true to false', async () => {
      const currentSettings = {
        id: 'singleton',
        maintenanceMode: true,
      }

      const updatedSettings = {
        id: 'singleton',
        maintenanceMode: false,
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockResolvedValue(
        currentSettings as any
      )
      vi.mocked(prisma.siteSettings.update).mockResolvedValue(
        updatedSettings as any
      )

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(true)
      expect(result.maintenanceMode).toBe(false)
      expect(prisma.siteSettings.update).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        data: { maintenanceMode: false },
      })
    })

    it('should handle null current settings (defaults to enabling)', async () => {
      const updatedSettings = {
        id: 'singleton',
        maintenanceMode: true,
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.siteSettings.update).mockResolvedValue(
        updatedSettings as any
      )

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(true)
      expect(result.maintenanceMode).toBe(true)
      expect(prisma.siteSettings.update).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        data: { maintenanceMode: true },
      })
    })

    it('should handle database errors', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123', role: 'ADMIN' },
      } as any)
      vi.mocked(prisma.siteSettings.findUnique).mockRejectedValue(
        new Error('Database error')
      )

      const result = await toggleMaintenanceMode()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Database error')
    })
  })
})
