import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuickActions } from '@/components/admin/dashboard/QuickActions'

describe('QuickActions', () => {
  describe('Rendering', () => {
    it('should render quick actions card', () => {
      render(<QuickActions />)

      expect(screen.getByText('Ações Rápidas')).toBeInTheDocument()
      expect(
        screen.getByText('Acesso rápido às funcionalidades principais')
      ).toBeInTheDocument()
    })

    it('should render all quick action buttons', () => {
      render(<QuickActions />)

      expect(screen.getByText('Novo Post')).toBeInTheDocument()
      expect(screen.getByText('Novo Case')).toBeInTheDocument()
      expect(screen.getByText('Novo Serviço')).toBeInTheDocument()
      expect(screen.getByText('Biblioteca')).toBeInTheDocument()
    })

    it('should render action descriptions', () => {
      render(<QuickActions />)

      expect(
        screen.getByText('Criar novo artigo para o blog')
      ).toBeInTheDocument()
      expect(screen.getByText('Adicionar case de sucesso')).toBeInTheDocument()
      expect(screen.getByText('Cadastrar novo serviço')).toBeInTheDocument()
      expect(
        screen.getByText('Gerenciar arquivos e mídia')
      ).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('should render FileText icon for Novo Post', () => {
      const { container } = render(<QuickActions />)

      const icons = container.querySelectorAll('svg.lucide-file-text')
      expect(icons.length).toBe(1)
    })

    it('should render Briefcase icon for Novo Case', () => {
      const { container } = render(<QuickActions />)

      const icons = container.querySelectorAll('svg.lucide-briefcase')
      expect(icons.length).toBe(1)
    })

    it('should render Layers icon for Novo Serviço', () => {
      const { container } = render(<QuickActions />)

      const icons = container.querySelectorAll('svg.lucide-layers')
      expect(icons.length).toBe(1)
    })

    it('should render Image icon for Biblioteca', () => {
      const { container } = render(<QuickActions />)

      const icons = container.querySelectorAll('svg.lucide-image')
      expect(icons.length).toBe(1)
    })

    it('should render Plus icons for all actions', () => {
      const { container } = render(<QuickActions />)

      const plusIcons = container.querySelectorAll('svg.lucide-plus')
      expect(plusIcons.length).toBe(4) // One for each action
    })
  })

  describe('Links', () => {
    it('should render link to create new post', () => {
      render(<QuickActions />)

      const link = screen
        .getByText('Novo Post')
        .closest('a')
      expect(link).toHaveAttribute('href', '/admin/blog/new')
    })

    it('should render link to create new case', () => {
      render(<QuickActions />)

      const link = screen
        .getByText('Novo Case')
        .closest('a')
      expect(link).toHaveAttribute('href', '/admin/cases/new')
    })

    it('should render link to create new service', () => {
      render(<QuickActions />)

      const link = screen
        .getByText('Novo Serviço')
        .closest('a')
      expect(link).toHaveAttribute('href', '/admin/services/new')
    })

    it('should render link to media library', () => {
      render(<QuickActions />)

      const link = screen
        .getByText('Biblioteca')
        .closest('a')
      expect(link).toHaveAttribute('href', '/admin/media')
    })
  })

  describe('Styling', () => {
    it('should apply correct color classes to Novo Post action', () => {
      const { container } = render(<QuickActions />)

      const button = screen.getByText('Novo Post').closest('button')
      const iconContainer = button?.querySelector('.bg-blue-100')
      const icon = iconContainer?.querySelector('.text-blue-600')

      expect(iconContainer).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
    })

    it('should apply correct color classes to Novo Case action', () => {
      const { container } = render(<QuickActions />)

      const button = screen.getByText('Novo Case').closest('button')
      const iconContainer = button?.querySelector('.bg-purple-100')
      const icon = iconContainer?.querySelector('.text-purple-600')

      expect(iconContainer).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
    })

    it('should apply correct color classes to Novo Serviço action', () => {
      const { container } = render(<QuickActions />)

      const button = screen.getByText('Novo Serviço').closest('button')
      const iconContainer = button?.querySelector('.bg-green-100')
      const icon = iconContainer?.querySelector('.text-green-600')

      expect(iconContainer).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
    })

    it('should apply correct color classes to Biblioteca action', () => {
      const { container } = render(<QuickActions />)

      const button = screen.getByText('Biblioteca').closest('button')
      const iconContainer = button?.querySelector('.bg-orange-100')
      const icon = iconContainer?.querySelector('.text-orange-600')

      expect(iconContainer).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should render exactly 4 action buttons', () => {
      const { container } = render(<QuickActions />)

      const buttons = container.querySelectorAll('button')
      expect(buttons.length).toBe(4)
    })

    it('should render actions in a grid layout', () => {
      const { container } = render(<QuickActions />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'gap-4')
    })
  })
})
