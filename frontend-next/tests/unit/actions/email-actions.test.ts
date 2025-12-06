import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock modules before imports
vi.mock('@/lib/prisma', () => ({
  default: {
    emailSettings: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    emailTemplate: {
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
import { revalidatePath } from 'next/cache'
import {
  getEmailSettings,
  updateEmailSettings,
  testEmailConnection,
  getEmailTemplates,
  getEmailTemplateById,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from '@/lib/actions/email-actions'

describe('Email Settings Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getEmailSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getEmailSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return existing settings', async () => {
      const mockSettings = {
        id: 'singleton',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'test@example.com',
        smtpPassword: 'encrypted-password',
        smtpSecure: true,
        smtpFrom: 'noreply@example.com',
        smtpFromName: 'Andorinha Digital',
        enableEmailNotifications: true,
        enableWelcomeEmail: true,
        enablePasswordReset: true,
        enableContactFormEmail: true,
        enableNewsletterEmail: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailSettings.findUnique).mockResolvedValue(mockSettings)

      const result = await getEmailSettings()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockSettings)
    })

    it('should create default settings if none exist', async () => {
      const mockSettings = {
        id: 'singleton',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailSettings.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.emailSettings.create).mockResolvedValue(mockSettings as any)

      const result = await getEmailSettings()

      expect(result.success).toBe(true)
      expect(prisma.emailSettings.create).toHaveBeenCalledWith({
        data: { id: 'singleton' },
      })
    })
  })

  describe('updateEmailSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await updateEmailSettings({
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'test@example.com',
        smtpPassword: 'password',
        smtpSecure: true,
        smtpFrom: 'noreply@example.com',
        smtpFromName: 'Test',
        enableEmailNotifications: true,
        enableWelcomeEmail: true,
        enablePasswordReset: true,
        enableContactFormEmail: true,
        enableNewsletterEmail: true,
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should update email settings successfully', async () => {
      const updateData = {
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'updated@example.com',
        smtpPassword: 'new-password',
        smtpSecure: true,
        smtpFrom: 'noreply@example.com',
        smtpFromName: 'Updated Name',
        enableEmailNotifications: true,
        enableWelcomeEmail: true,
        enablePasswordReset: true,
        enableContactFormEmail: false,
        enableNewsletterEmail: true,
      }

      const mockUpdatedSettings = {
        id: 'singleton',
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailSettings.upsert).mockResolvedValue(mockUpdatedSettings)

      const result = await updateEmailSettings(updateData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockUpdatedSettings)
      expect(prisma.emailSettings.upsert).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        update: updateData,
        create: { id: 'singleton', ...updateData },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/email')
    })
  })

  describe('testEmailConnection', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await testEmailConnection({
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'test@example.com',
        smtpPassword: 'password',
        smtpSecure: true,
        smtpFrom: 'noreply@example.com',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return error for incomplete SMTP configuration', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      const result = await testEmailConnection({
        smtpHost: '',
        smtpPort: 587,
        smtpUser: '',
        smtpPassword: '',
        smtpSecure: true,
        smtpFrom: '',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Configuração SMTP incompleta')
    })

    it('should successfully test email connection with valid config', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)

      const result = await testEmailConnection({
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'test@example.com',
        smtpPassword: 'password',
        smtpSecure: true,
        smtpFrom: 'noreply@example.com',
      })

      expect(result.success).toBe(true)
      expect(result.message).toContain('Conexão testada com sucesso')
    })
  })
})

describe('Email Template Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getEmailTemplates', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getEmailTemplates()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return all email templates', async () => {
      const mockTemplates = [
        {
          id: 'template-1',
          name: 'Welcome Email',
          type: 'WELCOME',
          subject: 'Welcome!',
          body: 'Welcome to our platform',
          variables: ['name', 'email'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'template-2',
          name: 'Password Reset',
          type: 'PASSWORD_RESET',
          subject: 'Reset Your Password',
          body: 'Click to reset your password',
          variables: ['name', 'resetLink'],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.findMany).mockResolvedValue(mockTemplates as any)

      const result = await getEmailTemplates()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockTemplates)
      expect(prisma.emailTemplate.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
    })
  })

  describe('getEmailTemplateById', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getEmailTemplateById('template-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return template by id', async () => {
      const mockTemplate = {
        id: 'template-123',
        name: 'Test Template',
        type: 'WELCOME',
        subject: 'Test Subject',
        body: 'Test Body',
        variables: ['name'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.findUnique).mockResolvedValue(mockTemplate as any)

      const result = await getEmailTemplateById('template-123')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockTemplate)
    })

    it('should return error if template not found', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.findUnique).mockResolvedValue(null)

      const result = await getEmailTemplateById('non-existent')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Template não encontrado')
    })
  })

  describe('createEmailTemplate', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await createEmailTemplate({
        name: 'Test',
        type: 'WELCOME' as any,
        subject: 'Test',
        body: 'Test',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should create email template successfully', async () => {
      const templateData = {
        name: 'New Template',
        type: 'CUSTOM' as any,
        subject: 'New Subject',
        body: 'New Body',
        variables: ['name', 'email'],
        isActive: true,
      }

      const mockCreatedTemplate = {
        id: 'template-new',
        ...templateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.create).mockResolvedValue(
        mockCreatedTemplate as any
      )

      const result = await createEmailTemplate(templateData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockCreatedTemplate)
      expect(prisma.emailTemplate.create).toHaveBeenCalledWith({
        data: {
          name: templateData.name,
          type: templateData.type,
          subject: templateData.subject,
          body: templateData.body,
          variables: templateData.variables,
          isActive: true,
        },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/email')
    })

    it('should default isActive to true and variables to empty array', async () => {
      const templateData = {
        name: 'Minimal Template',
        type: 'CUSTOM' as any,
        subject: 'Subject',
        body: 'Body',
      }

      const mockCreatedTemplate = {
        id: 'template-minimal',
        ...templateData,
        variables: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.create).mockResolvedValue(
        mockCreatedTemplate as any
      )

      const result = await createEmailTemplate(templateData)

      expect(result.success).toBe(true)
      expect(prisma.emailTemplate.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          variables: [],
          isActive: true,
        }),
      })
    })
  })

  describe('updateEmailTemplate', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await updateEmailTemplate('template-123', {
        name: 'Updated',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should update email template successfully', async () => {
      const updateData = {
        name: 'Updated Template',
        subject: 'Updated Subject',
        isActive: false,
      }

      const mockUpdatedTemplate = {
        id: 'template-123',
        ...updateData,
        type: 'WELCOME',
        body: 'Original Body',
        variables: ['name'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.update).mockResolvedValue(
        mockUpdatedTemplate as any
      )

      const result = await updateEmailTemplate('template-123', updateData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockUpdatedTemplate)
      expect(prisma.emailTemplate.update).toHaveBeenCalledWith({
        where: { id: 'template-123' },
        data: updateData,
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/email')
    })
  })

  describe('deleteEmailTemplate', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await deleteEmailTemplate('template-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should delete email template successfully', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.emailTemplate.delete).mockResolvedValue({} as any)

      const result = await deleteEmailTemplate('template-123')

      expect(result.success).toBe(true)
      expect(prisma.emailTemplate.delete).toHaveBeenCalledWith({
        where: { id: 'template-123' },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/email')
    })
  })
})
