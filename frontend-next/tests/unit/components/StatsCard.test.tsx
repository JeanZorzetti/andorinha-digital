import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsCard } from '@/components/admin/dashboard/StatsCard'

describe('StatsCard', () => {
  describe('Rendering', () => {
    it('should render stats card with basic props', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
        />
      )

      expect(screen.getByText('Total Posts')).toBeInTheDocument()
      expect(screen.getByText('150')).toBeInTheDocument()
    })

    it('should render stats card with description', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          description="Published articles"
          iconName="FileText"
        />
      )

      expect(screen.getByText('Published articles')).toBeInTheDocument()
    })

    it('should render stats card with positive trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: 12, label: 'vs last month' }}
        />
      )

      expect(screen.getByText(/\+12% vs last month/)).toBeInTheDocument()
    })

    it('should render stats card with negative trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: -5, label: 'vs last month' }}
        />
      )

      expect(screen.getByText(/-5% vs last month/)).toBeInTheDocument()
    })

    it('should render with numeric value', () => {
      render(
        <StatsCard
          title="Total Views"
          value={1234}
          iconName="Eye"
        />
      )

      expect(screen.getByText('1234')).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('should render FileText icon', () => {
      const { container } = render(
        <StatsCard
          title="Posts"
          value="100"
          iconName="FileText"
        />
      )

      const icon = container.querySelector('svg.lucide-file-text')
      expect(icon).toBeInTheDocument()
    })

    it('should render Briefcase icon', () => {
      const { container } = render(
        <StatsCard
          title="Cases"
          value="50"
          iconName="Briefcase"
        />
      )

      const icon = container.querySelector('svg.lucide-briefcase')
      expect(icon).toBeInTheDocument()
    })

    it('should render Layers icon', () => {
      const { container } = render(
        <StatsCard
          title="Services"
          value="25"
          iconName="Layers"
        />
      )

      const icon = container.querySelector('svg.lucide-layers')
      expect(icon).toBeInTheDocument()
    })

    it('should render Eye icon', () => {
      const { container } = render(
        <StatsCard
          title="Views"
          value="1000"
          iconName="Eye"
        />
      )

      const icon = container.querySelector('svg.lucide-eye')
      expect(icon).toBeInTheDocument()
    })

    it('should apply custom icon color', () => {
      const { container } = render(
        <StatsCard
          title="Posts"
          value="100"
          iconName="FileText"
          iconColor="text-blue-600"
        />
      )

      const icon = container.querySelector('svg.lucide-file-text')
      expect(icon).toHaveClass('text-blue-600')
    })

    it('should apply default icon color when not specified', () => {
      const { container } = render(
        <StatsCard
          title="Posts"
          value="100"
          iconName="FileText"
        />
      )

      const icon = container.querySelector('svg.lucide-file-text')
      expect(icon).toHaveClass('text-primary')
    })
  })

  describe('Trends', () => {
    it('should apply green color to positive trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: 12, label: 'vs last month' }}
        />
      )

      const badge = screen.getByText(/\+12% vs last month/)
      expect(badge).toHaveClass('text-green-600')
      expect(badge).toHaveClass('bg-green-100')
    })

    it('should apply red color to negative trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: -5, label: 'vs last month' }}
        />
      )

      const badge = screen.getByText(/-5% vs last month/)
      expect(badge).toHaveClass('text-red-600')
      expect(badge).toHaveClass('bg-red-100')
    })

    it('should include plus sign for positive trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: 12, label: 'vs last month' }}
        />
      )

      expect(screen.getByText(/\+12% vs last month/)).toBeInTheDocument()
    })

    it('should not include plus sign for negative trend', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
          trend={{ value: -5, label: 'vs last month' }}
        />
      )

      const badge = screen.getByText(/-5% vs last month/)
      expect(badge.textContent).toBe('-5% vs last month')
    })

    it('should not render trend when not provided', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          iconName="FileText"
        />
      )

      expect(screen.queryByText(/vs last month/)).not.toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should render all elements in correct structure', () => {
      render(
        <StatsCard
          title="Total Posts"
          value="150"
          description="Published articles"
          iconName="FileText"
          trend={{ value: 12, label: 'vs last month' }}
        />
      )

      // Check all elements are present
      expect(screen.getByText('Total Posts')).toBeInTheDocument()
      expect(screen.getByText('150')).toBeInTheDocument()
      expect(screen.getByText('Published articles')).toBeInTheDocument()
      expect(screen.getByText(/\+12% vs last month/)).toBeInTheDocument()
    })
  })
})
