# Testing Documentation

## Overview

This document describes the testing strategy, tools, and best practices for the Andorinha Digital project.

## Testing Stack

- **Vitest**: Unit and integration testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **@testing-library/jest-dom**: DOM matchers
- **@testing-library/user-event**: User interaction simulation

## Test Structure

```
tests/
├── setup.ts                 # Global test setup and mocks
├── unit/                    # Unit tests
│   ├── actions/            # Server Actions tests
│   ├── lib/                # Utility libraries tests
│   └── components/         # React components tests
└── e2e/                    # End-to-end tests
    └── *.spec.ts
```

## Test Coverage

Current coverage: **72.44%**

### Coverage by Category

| Category | Coverage | Status |
|----------|----------|--------|
| All files | 72.44% | ✅ |
| components/admin/dashboard | 100% | ✅ |
| components/admin/settings | 81.81% | ✅ |
| components/ui | 98.76% | ✅ |
| lib/actions | 69.71% | ✅ |
| lib (utilities) | 56.20% | 🔄 |

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm test -- tests/unit/
```

### Component Tests Only
```bash
npm test -- tests/unit/components/
```

### E2E Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm run test:coverage
```

### Interactive UI
```bash
npm run test:ui
```

## Writing Unit Tests

### Server Actions

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { yourAction } from '@/lib/actions/your-actions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// Mock dependencies
vi.mock('@/lib/prisma')
vi.mock('next-auth')
vi.mock('next/cache')

describe('yourAction', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      email: 'test@example.com',
      role: 'ADMIN',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerSession).mockResolvedValue(mockSession as any)
  })

  it('should perform action successfully', async () => {
    // Arrange
    const mockData = { id: '1', name: 'Test' }
    vi.mocked(prisma.model.create).mockResolvedValue(mockData as any)

    // Act
    const result = await yourAction({ name: 'Test' })

    // Assert
    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockData)
    expect(prisma.model.create).toHaveBeenCalledWith({
      data: { name: 'Test', createdBy: 'user-123' },
    })
  })

  it('should handle errors', async () => {
    // Arrange
    vi.mocked(prisma.model.create).mockRejectedValue(
      new Error('Database error')
    )

    // Act
    const result = await yourAction({ name: 'Test' })

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should require authentication', async () => {
    // Arrange
    vi.mocked(getServerSession).mockResolvedValue(null)

    // Act
    const result = await yourAction({ name: 'Test' })

    // Assert
    expect(result.success).toBe(false)
    expect(result.error).toContain('Não autorizado')
  })
})
```

### React Components

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YourComponent } from '@/components/YourComponent'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent title="Test" />)

    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    const mockOnClick = vi.fn()

    render(<YourComponent onClick={mockOnClick} />)

    await user.click(screen.getByRole('button'))

    expect(mockOnClick).toHaveBeenCalledOnce()
  })

  it('should handle async operations', async () => {
    const mockAction = vi.fn().mockResolvedValue({ success: true })

    render(<YourComponent onSubmit={mockAction} />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled()
      expect(screen.getByText(/success/i)).toBeInTheDocument()
    })
  })
})
```

### Utility Functions

```typescript
import { describe, it, expect } from 'vitest'
import { yourUtility } from '@/lib/utils'

describe('yourUtility', () => {
  it('should handle valid input', () => {
    const result = yourUtility('input')
    expect(result).toBe('expected-output')
  })

  it('should handle edge cases', () => {
    expect(yourUtility('')).toBe('')
    expect(yourUtility(null)).toBeNull()
  })

  it('should throw on invalid input', () => {
    expect(() => yourUtility(invalid)).toThrow()
  })
})
```

## Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/feature')
  })

  test('should complete user workflow', async ({ page }) => {
    // Login
    await page.fill('[name="email"]', 'admin@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')

    // Wait for navigation
    await page.waitForURL('/admin/dashboard')

    // Perform action
    await page.click('text=Create New')
    await page.fill('[name="title"]', 'Test Title')
    await page.click('button:has-text("Save")')

    // Verify result
    await expect(page.locator('text=Test Title')).toBeVisible()
  })
})
```

## Best Practices

### General

1. **Test Naming**: Use descriptive names that explain what is being tested
   - ✅ `should create backup successfully when all options are valid`
   - ❌ `test1` or `works`

2. **AAA Pattern**: Arrange, Act, Assert
   ```typescript
   // Arrange - Set up test data and mocks
   const mockData = { id: '1' }
   vi.mocked(prisma.model.create).mockResolvedValue(mockData)

   // Act - Execute the function being tested
   const result = await yourFunction()

   // Assert - Verify the results
   expect(result.success).toBe(true)
   ```

3. **Test Independence**: Each test should be independent and not rely on other tests
4. **Mock External Dependencies**: Always mock external services, APIs, and databases
5. **Clean Up**: Use `beforeEach` and `afterEach` to reset state

### Component Testing

1. **User-Centric**: Test from the user's perspective
   - Use `screen.getByRole` and `screen.getByLabelText` over `getByTestId`
   - Test interactions, not implementation details

2. **Async Operations**: Always use `waitFor` or `findBy` for async updates
   ```typescript
   await waitFor(() => {
     expect(screen.getByText('Success')).toBeInTheDocument()
   })
   ```

3. **User Events**: Use `@testing-library/user-event` for realistic interactions
   ```typescript
   const user = userEvent.setup()
   await user.click(button)
   await user.type(input, 'text')
   ```

### Server Actions

1. **Mock Authentication**: Always mock `getServerSession`
2. **Mock Database**: Mock all Prisma calls
3. **Test Authorization**: Test both authorized and unauthorized scenarios
4. **Test Error Handling**: Test database errors and validation failures

## Mocking Patterns

### Prisma

```typescript
vi.mock('@/lib/prisma', () => ({
  default: {
    model: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))
```

### NextAuth

```typescript
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

// In tests
vi.mocked(getServerSession).mockResolvedValue({
  user: { id: 'user-123', role: 'ADMIN' },
} as any)
```

### Next.js

```typescript
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
}))
```

## Common Issues

### Issue: Tests Fail with "ReferenceError: Cannot access before initialization"

**Cause**: Mock hoisting issue

**Solution**: Define mocks directly in `vi.mock()` callback
```typescript
vi.mock('@/lib/prisma', () => ({
  default: {
    model: {
      create: vi.fn(),
    },
  },
}))
```

### Issue: Component tests fail with "Not wrapped in act(...)"

**Cause**: State updates not properly awaited

**Solution**: Use `waitFor` or `findBy` queries
```typescript
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### Issue: Tests pass locally but fail in CI

**Cause**: Timing issues or environment differences

**Solution**:
- Increase timeouts for slow operations
- Use proper async utilities
- Ensure tests are deterministic

## Coverage Goals

- **Overall**: 70%+ ✅ (Currently 72.44%)
- **Critical Paths**: 90%+
- **UI Components**: 80%+
- **Server Actions**: 80%+
- **Utilities**: 70%+

## Continuous Improvement

1. **Monitor Coverage**: Check coverage reports regularly
2. **Write Tests First**: Consider TDD for new features
3. **Review Test Quality**: Not just quantity - tests should be meaningful
4. **Update Tests**: When bugs are found, add tests to prevent regression
5. **Refactor Tests**: Keep tests clean and maintainable

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Test Statistics

- **Total Tests**: 191
- **Unit Tests**: 172
- **E2E Tests**: 19
- **Component Tests**: 62
- **Action Tests**: 81
- **Library Tests**: 60
