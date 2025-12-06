import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeadStats } from '@/components/admin/crm/LeadStats'

describe('LeadStats', () => {
  const mockStats = {
    total: 150,
    new: 25,
    qualified: 45,
    won: 30,
    lost: 20,
    conversionRate: 20,
  }

  describe('Rendering', () => {
    it('should render all stat cards', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('Total de Leads')).toBeInTheDocument()
      expect(screen.getByText('Novos Leads')).toBeInTheDocument()
      expect(screen.getByText('Qualificados')).toBeInTheDocument()
      expect(screen.getByText('Taxa de Conversão')).toBeInTheDocument()
    })

    it('should render total leads count', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('150')).toBeInTheDocument()
      expect(
        screen.getByText('Todos os leads no sistema')
      ).toBeInTheDocument()
    })

    it('should render new leads count', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('25')).toBeInTheDocument()
      expect(
        screen.getByText('Aguardando primeiro contato')
      ).toBeInTheDocument()
    })

    it('should render qualified leads count', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('45')).toBeInTheDocument()
      expect(screen.getByText('Leads qualificados ativos')).toBeInTheDocument()
    })

    it('should render conversion rate', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('20%')).toBeInTheDocument()
      expect(screen.getByText('30 ganhos de 150 total')).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('should render Users icon for total leads', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const icons = container.querySelectorAll('svg.lucide-users')
      expect(icons.length).toBeGreaterThanOrEqual(1)
    })

    it('should render UserPlus icon for new leads', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const icons = container.querySelectorAll('svg.lucide-user-plus')
      expect(icons.length).toBeGreaterThanOrEqual(1)
    })

    it('should render UserCheck icon for qualified leads', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const icons = container.querySelectorAll('svg.lucide-user-check')
      expect(icons.length).toBeGreaterThanOrEqual(1)
    })

    it('should render TrendingUp icon when conversion rate is high', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const icons = container.querySelectorAll('svg.lucide-trending-up')
      expect(icons.length).toBeGreaterThanOrEqual(1)
    })

    it('should render TrendingDown icon when conversion rate is low', () => {
      const lowConversionStats = {
        ...mockStats,
        conversionRate: 15,
      }
      const { container } = render(<LeadStats stats={lowConversionStats} />)

      const icons = container.querySelectorAll('svg.lucide-trending-down')
      expect(icons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Conversion Rate Indicator', () => {
    it('should show green trending up icon for high conversion rate (>= 20%)', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const trendingUpIcon = container.querySelector('svg.lucide-trending-up')
      expect(trendingUpIcon).toHaveClass('text-green-600')
    })

    it('should show orange trending down icon for low conversion rate (< 20%)', () => {
      const lowConversionStats = {
        ...mockStats,
        conversionRate: 10,
      }
      const { container } = render(<LeadStats stats={lowConversionStats} />)

      const trendingDownIcon = container.querySelector(
        'svg.lucide-trending-down'
      )
      expect(trendingDownIcon).toHaveClass('text-orange-600')
    })

    it('should show trending up icon at exactly 20% conversion rate', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const trendingUpIcon = container.querySelector('svg.lucide-trending-up')
      expect(trendingUpIcon).toBeInTheDocument()
    })

    it('should show trending down icon at 19% conversion rate', () => {
      const stats = {
        ...mockStats,
        conversionRate: 19,
      }
      const { container } = render(<LeadStats stats={stats} />)

      const trendingDownIcon = container.querySelector(
        'svg.lucide-trending-down'
      )
      expect(trendingDownIcon).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should render exactly 4 stat cards', () => {
      render(<LeadStats stats={mockStats} />)

      expect(screen.getByText('Total de Leads')).toBeInTheDocument()
      expect(screen.getByText('Novos Leads')).toBeInTheDocument()
      expect(screen.getByText('Qualificados')).toBeInTheDocument()
      expect(screen.getByText('Taxa de Conversão')).toBeInTheDocument()
    })

    it('should render stats in a grid layout', () => {
      const { container } = render(<LeadStats stats={mockStats} />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4')
    })
  })

  describe('Data Display', () => {
    it('should display zero values correctly', () => {
      const zeroStats = {
        total: 0,
        new: 0,
        qualified: 0,
        won: 0,
        lost: 0,
        conversionRate: 0,
      }
      render(<LeadStats stats={zeroStats} />)

      const zeroElements = screen.getAllByText('0')
      expect(zeroElements.length).toBeGreaterThanOrEqual(3)
    })

    it('should display large numbers correctly', () => {
      const largeStats = {
        total: 9999,
        new: 1234,
        qualified: 5678,
        won: 2000,
        lost: 1000,
        conversionRate: 45,
      }
      render(<LeadStats stats={largeStats} />)

      expect(screen.getByText('9999')).toBeInTheDocument()
      expect(screen.getByText('1234')).toBeInTheDocument()
      expect(screen.getByText('5678')).toBeInTheDocument()
      expect(screen.getByText('45%')).toBeInTheDocument()
    })

    it('should calculate conversion rate display correctly', () => {
      const stats = {
        total: 200,
        new: 50,
        qualified: 80,
        won: 50,
        lost: 20,
        conversionRate: 25,
      }
      render(<LeadStats stats={stats} />)

      expect(screen.getByText('25%')).toBeInTheDocument()
      expect(screen.getByText('50 ganhos de 200 total')).toBeInTheDocument()
    })
  })
})
