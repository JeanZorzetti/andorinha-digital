import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BackupsList } from '@/components/admin/settings/BackupsList'
import * as backupActions from '@/lib/actions/backup-actions'
import { toast } from 'sonner'

// Mock the backup actions
vi.mock('@/lib/actions/backup-actions', () => ({
  createBackup: vi.fn(),
  deleteBackup: vi.fn(),
  restoreBackup: vi.fn(),
  downloadBackup: vi.fn(),
}))

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}))

// Mock window.location.reload
const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
})

describe('BackupsList', () => {
  const mockBackups = [
    {
      id: 'backup-1',
      filename: 'backup-2024-01-01.zip',
      filepath: '/backups/backup-2024-01-01.zip',
      size: 1024000,
      type: 'MANUAL' as const,
      status: 'COMPLETED' as const,
      includesDatabase: true,
      includesMedia: true,
      includesConfig: true,
      startedAt: new Date('2024-01-01T10:00:00'),
      completedAt: new Date('2024-01-01T10:05:00'),
      error: null,
      createdBy: 'user-1',
      createdAt: new Date('2024-01-01T10:00:00'),
      updatedAt: new Date('2024-01-01T10:05:00'),
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
      },
    },
    {
      id: 'backup-2',
      filename: 'backup-2024-01-02.zip',
      filepath: '/backups/backup-2024-01-02.zip',
      size: 2048000,
      type: 'SCHEDULED' as const,
      status: 'FAILED' as const,
      includesDatabase: true,
      includesMedia: false,
      includesConfig: true,
      startedAt: new Date('2024-01-02T02:00:00'),
      completedAt: null,
      error: 'Disk space full',
      createdBy: 'user-1',
      createdAt: new Date('2024-01-02T02:00:00'),
      updatedAt: new Date('2024-01-02T02:05:00'),
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
      },
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render backups list with data', () => {
      render(<BackupsList backups={mockBackups} />)

      expect(screen.getByText('Backups Disponíveis')).toBeInTheDocument()
      expect(screen.getByText('backup-2024-01-01.zip')).toBeInTheDocument()
      expect(screen.getByText('backup-2024-01-02.zip')).toBeInTheDocument()
    })

    it('should render empty state when no backups', () => {
      render(<BackupsList backups={[]} />)

      expect(screen.getByText('Nenhum backup encontrado')).toBeInTheDocument()
      expect(
        screen.getByText('Crie seu primeiro backup para proteger seus dados')
      ).toBeInTheDocument()
    })

    it('should display backup status correctly', () => {
      render(<BackupsList backups={mockBackups} />)

      expect(screen.getByText('COMPLETED')).toBeInTheDocument()
      expect(screen.getByText('FAILED')).toBeInTheDocument()
    })

    it('should display backup type badges', () => {
      render(<BackupsList backups={mockBackups} />)

      expect(screen.getByText('MANUAL')).toBeInTheDocument()
      expect(screen.getByText('SCHEDULED')).toBeInTheDocument()
    })

    it('should display backup size formatted correctly', () => {
      render(<BackupsList backups={mockBackups} />)

      // The formatBytes function rounds: 1024000 / 1024 = 1000 KB
      expect(screen.getByText(/1000 KB/)).toBeInTheDocument()
      // 2048000 / 1024 / 1024 = 1.95... MB -> rounded to 1.95 MB
      expect(screen.getByText(/1\.\d+ MB/)).toBeInTheDocument()
    })

    it('should display error message for failed backup', () => {
      render(<BackupsList backups={mockBackups} />)

      expect(screen.getByText('Disk space full')).toBeInTheDocument()
    })

    it('should display backup includes badges', () => {
      render(<BackupsList backups={mockBackups} />)

      // First backup has all three
      const databaseBadges = screen.getAllByText('Database')
      expect(databaseBadges.length).toBeGreaterThan(0)

      const mediaBadges = screen.getAllByText('Media')
      expect(mediaBadges.length).toBe(1) // Only first backup

      const configBadges = screen.getAllByText('Config')
      expect(configBadges.length).toBe(2) // Both backups
    })

    it('should display user who created backup', () => {
      render(<BackupsList backups={mockBackups} />)

      const userNames = screen.getAllByText('Admin User')
      expect(userNames.length).toBe(2)
    })
  })

  describe('Create Backup', () => {
    it('should open create dialog when clicking create button', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={[]} />)

      await user.click(screen.getAllByText('Criar Backup')[0])

      expect(screen.getByText('Criar Novo Backup')).toBeInTheDocument()
      expect(
        screen.getByText('Selecione o que deseja incluir no backup')
      ).toBeInTheDocument()
    })

    it('should have all options checked by default in create dialog', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={[]} />)

      await user.click(screen.getAllByText('Criar Backup')[0])

      const databaseCheckbox = screen.getByRole('checkbox', {
        name: /Banco de Dados/i,
      })
      const mediaCheckbox = screen.getByRole('checkbox', {
        name: /Arquivos de Mídia/i,
      })
      const configCheckbox = screen.getByRole('checkbox', {
        name: /Arquivos de Configuração/i,
      })

      expect(databaseCheckbox).toBeChecked()
      expect(mediaCheckbox).toBeChecked()
      expect(configCheckbox).toBeChecked()
    })

    it('should toggle checkboxes in create dialog', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={[]} />)

      await user.click(screen.getAllByText('Criar Backup')[0])

      const databaseCheckbox = screen.getByRole('checkbox', {
        name: /Banco de Dados/i,
      })

      await user.click(databaseCheckbox)
      expect(databaseCheckbox).not.toBeChecked()

      await user.click(databaseCheckbox)
      expect(databaseCheckbox).toBeChecked()
    })

    it('should create backup successfully', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.createBackup).mockResolvedValue({
        success: true,
        message: 'Backup criado',
        data: {
          id: 'new-backup',
          filename: 'backup-new.zip',
        } as any,
      })

      render(<BackupsList backups={[]} />)

      // Click the first "Criar Backup" button
      await user.click(screen.getAllByText('Criar Backup')[0])

      // Find the button inside the dialog
      const createButton = screen
        .getAllByRole('button')
        .find((btn) => btn.textContent?.includes('Criar Backup'))

      if (createButton) {
        await user.click(createButton)
      }

      await waitFor(() => {
        expect(backupActions.createBackup).toHaveBeenCalledWith({
          includesDatabase: true,
          includesMedia: true,
          includesConfig: true,
        })
      })

      expect(toast.success).toHaveBeenCalledWith('Backup criado')
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle create backup error', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.createBackup).mockResolvedValue({
        success: false,
        error: 'Failed to create backup',
      })

      render(<BackupsList backups={[]} />)

      await user.click(screen.getAllByText('Criar Backup')[0])

      // Find the button inside the dialog
      const createButton = screen
        .getAllByRole('button')
        .find((btn) => btn.textContent?.includes('Criar Backup'))

      if (createButton) {
        await user.click(createButton)
      }

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to create backup')
      })

      expect(mockReload).not.toHaveBeenCalled()
    })

    it('should disable create button while creating', async () => {
      const user = userEvent.setup()
      let resolveCreate: (value: any) => void
      const createPromise = new Promise((resolve) => {
        resolveCreate = resolve
      })

      vi.mocked(backupActions.createBackup).mockReturnValue(
        createPromise as any
      )

      render(<BackupsList backups={[]} />)

      await user.click(screen.getAllByText('Criar Backup')[0])

      // Find the button inside the dialog
      const createButton = screen
        .getAllByRole('button')
        .find((btn) => btn.textContent?.includes('Criar Backup'))

      if (createButton) {
        await user.click(createButton)
      }

      await waitFor(() => {
        expect(screen.getByText('Criando...')).toBeInTheDocument()
      })

      const buttons = screen
        .getAllByRole('button')
        .filter((btn) => btn.textContent?.includes('Criando'))
      expect(buttons[0]).toBeDisabled()

      resolveCreate!({ success: true, data: { id: 'test' } })
    })
  })

  describe('Delete Backup', () => {
    it('should open delete confirmation dialog', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={mockBackups} />)

      const deleteButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-trash')
      })

      await user.click(deleteButtons[0])

      expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument()
      expect(
        screen.getByText(/Tem certeza que deseja excluir este backup/)
      ).toBeInTheDocument()
    })

    it('should delete backup successfully', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.deleteBackup).mockResolvedValue({
        success: true,
      })

      render(<BackupsList backups={mockBackups} />)

      const deleteButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-trash')
      })

      await user.click(deleteButtons[0])
      await user.click(screen.getByText('Excluir'))

      await waitFor(() => {
        expect(backupActions.deleteBackup).toHaveBeenCalledWith('backup-1')
        expect(toast.success).toHaveBeenCalledWith(
          'Backup excluído com sucesso!'
        )
      })

      // Backup should be removed from list
      expect(screen.queryByText('backup-2024-01-01.zip')).not.toBeInTheDocument()
    })

    it('should handle delete error', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.deleteBackup).mockResolvedValue({
        success: false,
        error: 'Failed to delete',
      })

      render(<BackupsList backups={mockBackups} />)

      const deleteButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-trash')
      })

      await user.click(deleteButtons[0])
      await user.click(screen.getByText('Excluir'))

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to delete')
      })
    })

    it('should cancel delete dialog', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={mockBackups} />)

      const deleteButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-trash')
      })

      await user.click(deleteButtons[0])
      await user.click(screen.getByText('Cancelar'))

      await waitFor(() => {
        expect(
          screen.queryByText('Confirmar Exclusão')
        ).not.toBeInTheDocument()
      })

      expect(backupActions.deleteBackup).not.toHaveBeenCalled()
    })
  })

  describe('Restore Backup', () => {
    it('should open restore confirmation dialog', async () => {
      const user = userEvent.setup()
      render(<BackupsList backups={mockBackups} />)

      const restoreButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-rotate-ccw')
      })

      await user.click(restoreButtons[0])

      expect(screen.getByText('Confirmar Restauração')).toBeInTheDocument()
      expect(
        screen.getByText(/Tem certeza que deseja restaurar este backup/)
      ).toBeInTheDocument()
    })

    it('should restore backup successfully', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.restoreBackup).mockResolvedValue({
        success: true,
        message: 'Backup restaurado',
      })

      render(<BackupsList backups={mockBackups} />)

      const restoreButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-rotate-ccw')
      })

      await user.click(restoreButtons[0])
      await user.click(screen.getByText('Restaurar'))

      await waitFor(() => {
        expect(backupActions.restoreBackup).toHaveBeenCalledWith('backup-1')
        expect(toast.success).toHaveBeenCalledWith('Backup restaurado')
      })
    })

    it('should handle restore error', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.restoreBackup).mockResolvedValue({
        success: false,
        error: 'Failed to restore',
      })

      render(<BackupsList backups={mockBackups} />)

      const restoreButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-rotate-ccw')
      })

      await user.click(restoreButtons[0])
      await user.click(screen.getByText('Restaurar'))

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to restore')
      })
    })

    it('should only show restore button for completed backups', () => {
      render(<BackupsList backups={mockBackups} />)

      const restoreButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-rotate-ccw')
      })

      // Only the first backup (COMPLETED) should have restore button
      expect(restoreButtons).toHaveLength(1)
    })
  })

  describe('Download Backup', () => {
    it('should download backup successfully', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.downloadBackup).mockResolvedValue({
        success: true,
        data: {
          filename: 'backup-2024-01-01.zip',
        } as any,
      })

      render(<BackupsList backups={mockBackups} />)

      const downloadButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-download')
      })

      await user.click(downloadButtons[0])

      await waitFor(() => {
        expect(backupActions.downloadBackup).toHaveBeenCalledWith('backup-1')
        expect(toast.info).toHaveBeenCalledWith(
          'Download não implementado. Arquivo: backup-2024-01-01.zip'
        )
      })
    })

    it('should handle download error', async () => {
      const user = userEvent.setup()
      vi.mocked(backupActions.downloadBackup).mockResolvedValue({
        success: false,
        error: 'File not found',
      })

      render(<BackupsList backups={mockBackups} />)

      const downloadButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-download')
      })

      await user.click(downloadButtons[0])

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('File not found')
      })
    })

    it('should only show download button for completed backups', () => {
      render(<BackupsList backups={mockBackups} />)

      const downloadButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg')
        return svg?.getAttribute('class')?.includes('lucide-download')
      })

      // Only the first backup (COMPLETED) should have download button
      expect(downloadButtons).toHaveLength(1)
    })
  })

  describe('Helper Functions', () => {
    it('should format bytes correctly', () => {
      render(<BackupsList backups={mockBackups} />)

      // 1024000 bytes = 1000 KB
      expect(screen.getByText(/1000 KB/)).toBeInTheDocument()

      // 2048000 bytes = 1.95 MB (rounded)
      expect(screen.getByText(/1\.\d+ MB/)).toBeInTheDocument()
    })

    it('should format dates correctly', () => {
      render(<BackupsList backups={mockBackups} />)

      // Dates should be formatted in pt-BR locale
      const dates = screen.getAllByText(/01\/01\/2024/)
      expect(dates.length).toBeGreaterThan(0)
    })
  })
})
