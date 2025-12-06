import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock modules before imports
vi.mock('@/lib/prisma', () => ({
  default: {
    backupSettings: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    backup: {
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
  getBackupSettings,
  updateBackupSettings,
  getBackups,
  createBackup,
  deleteBackup,
  restoreBackup,
  downloadBackup,
} from '@/lib/actions/backup-actions'

describe('Backup Settings Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBackupSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getBackupSettings()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return existing settings', async () => {
      const mockSettings = {
        id: 'singleton',
        enableAutomatedBackup: true,
        backupFrequency: 'daily',
        backupTime: '02:00',
        backupRetentionDays: 30,
        backupPath: './backups',
        maxBackupSize: 1000,
        compressBackups: true,
        notifyOnBackup: true,
        notificationEmail: 'admin@example.com',
        notifyOnBackupFailure: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backupSettings.findUnique).mockResolvedValue(mockSettings)

      const result = await getBackupSettings()

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
      vi.mocked(prisma.backupSettings.findUnique).mockResolvedValue(null)
      vi.mocked(prisma.backupSettings.create).mockResolvedValue(mockSettings as any)

      const result = await getBackupSettings()

      expect(result.success).toBe(true)
      expect(prisma.backupSettings.create).toHaveBeenCalledWith({
        data: { id: 'singleton' },
      })
    })
  })

  describe('updateBackupSettings', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await updateBackupSettings({
        enableAutomatedBackup: true,
        backupFrequency: 'daily',
        backupTime: '02:00',
        backupRetentionDays: 30,
        backupPath: './backups',
        maxBackupSize: 1000,
        compressBackups: true,
        notifyOnBackup: true,
        notificationEmail: 'admin@example.com',
        notifyOnBackupFailure: true,
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should update backup settings successfully', async () => {
      const updateData = {
        enableAutomatedBackup: true,
        backupFrequency: 'weekly',
        backupTime: '03:00',
        backupRetentionDays: 60,
        backupPath: './custom-backups',
        maxBackupSize: 2000,
        compressBackups: false,
        notifyOnBackup: true,
        notificationEmail: 'backup@example.com',
        notifyOnBackupFailure: true,
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
      vi.mocked(prisma.backupSettings.upsert).mockResolvedValue(mockUpdatedSettings)

      const result = await updateBackupSettings(updateData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockUpdatedSettings)
      expect(prisma.backupSettings.upsert).toHaveBeenCalledWith({
        where: { id: 'singleton' },
        update: updateData,
        create: { id: 'singleton', ...updateData },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/backup')
    })
  })
})

describe('Backup Management Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getBackups', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await getBackups()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return all backups with user information', async () => {
      const mockBackups = [
        {
          id: 'backup-1',
          filename: 'backup-2024-01-01.zip',
          filepath: './backups/backup-2024-01-01.zip',
          size: 1024000,
          type: 'MANUAL',
          status: 'COMPLETED',
          includesDatabase: true,
          includesMedia: true,
          includesConfig: true,
          startedAt: new Date(),
          completedAt: new Date(),
          error: null,
          createdBy: 'user-123',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            name: 'Admin User',
            email: 'admin@example.com',
          },
        },
        {
          id: 'backup-2',
          filename: 'backup-2024-01-02.zip',
          filepath: './backups/backup-2024-01-02.zip',
          size: 2048000,
          type: 'SCHEDULED',
          status: 'IN_PROGRESS',
          includesDatabase: true,
          includesMedia: false,
          includesConfig: true,
          startedAt: new Date(),
          completedAt: null,
          error: null,
          createdBy: 'user-123',
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {
            name: 'Admin User',
            email: 'admin@example.com',
          },
        },
      ]

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findMany).mockResolvedValue(mockBackups as any)

      const result = await getBackups()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockBackups)
      expect(prisma.backup.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        select: expect.objectContaining({
          id: true,
          filename: true,
          user: expect.objectContaining({
            select: expect.objectContaining({
              name: true,
              email: true,
            }),
          }),
        }),
      })
    })
  })

  describe('createBackup', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await createBackup()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should create backup with default options', async () => {
      const mockBackup = {
        id: 'backup-new',
        filename: expect.stringContaining('backup-'),
        filepath: expect.stringContaining('./backups/backup-'),
        size: 0,
        type: 'MANUAL',
        status: 'PENDING',
        includesDatabase: true,
        includesMedia: true,
        includesConfig: true,
        startedAt: expect.any(Date),
        completedAt: null,
        error: null,
        createdBy: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.create).mockResolvedValue(mockBackup as any)

      const result = await createBackup()

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.message).toContain('Backup iniciado com sucesso')
      expect(prisma.backup.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            type: 'MANUAL',
            status: 'PENDING',
            includesDatabase: true,
            includesMedia: true,
            includesConfig: true,
            createdBy: 'user-123',
          }),
        })
      )
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/backup')
    })

    it('should create backup with custom options', async () => {
      const customOptions = {
        includesDatabase: true,
        includesMedia: false,
        includesConfig: true,
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.create).mockResolvedValue({
        id: 'backup-custom',
        createdBy: 'user-123',
      } as any)

      const result = await createBackup(customOptions)

      expect(result.success).toBe(true)
      expect(prisma.backup.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            includesDatabase: true,
            includesMedia: false,
            includesConfig: true,
          }),
        })
      )
    })
  })

  describe('deleteBackup', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await deleteBackup('backup-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should delete backup successfully', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.delete).mockResolvedValue({} as any)

      const result = await deleteBackup('backup-123')

      expect(result.success).toBe(true)
      expect(prisma.backup.delete).toHaveBeenCalledWith({
        where: { id: 'backup-123' },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/settings/backup')
    })
  })

  describe('restoreBackup', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await restoreBackup('backup-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return error if backup not found', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue(null)

      const result = await restoreBackup('non-existent')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Backup não encontrado')
    })

    it('should return error if backup is not completed', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue({
        id: 'backup-123',
        status: 'IN_PROGRESS',
      } as any)

      const result = await restoreBackup('backup-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Backup não está completo')
    })

    it('should return success message for completed backup (not fully implemented)', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue({
        id: 'backup-123',
        status: 'COMPLETED',
      } as any)

      const result = await restoreBackup('backup-123')

      expect(result.success).toBe(true)
      expect(result.message).toContain('não implementado')
    })
  })

  describe('downloadBackup', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null)

      const result = await downloadBackup('backup-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Não autorizado')
    })

    it('should return error if backup not found', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue(null)

      const result = await downloadBackup('non-existent')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Backup não encontrado')
    })

    it('should return error if backup is not completed', async () => {
      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue({
        id: 'backup-123',
        status: 'FAILED',
      } as any)

      const result = await downloadBackup('backup-123')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Backup não está completo')
    })

    it('should return backup file information for download', async () => {
      const mockBackup = {
        id: 'backup-123',
        filename: 'backup-2024-01-01.zip',
        filepath: './backups/backup-2024-01-01.zip',
        size: 1024000,
        status: 'COMPLETED',
      }

      vi.mocked(getServerSession).mockResolvedValue({
        user: { id: 'user-123' },
      } as any)
      vi.mocked(prisma.backup.findUnique).mockResolvedValue(mockBackup as any)

      const result = await downloadBackup('backup-123')

      expect(result.success).toBe(true)
      expect(result.data).toEqual({
        filename: mockBackup.filename,
        filepath: mockBackup.filepath,
        size: mockBackup.size,
      })
    })
  })
})
