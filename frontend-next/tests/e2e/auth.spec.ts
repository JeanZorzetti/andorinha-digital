import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display login page', async ({ page }) => {
    await expect(page).toHaveTitle(/Andorinha Digital/i)
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Wait for error message
    await expect(page.locator('text=/credenciais inválidas/i')).toBeVisible({ timeout: 5000 })
  })

  test('should show error for empty fields', async ({ page }) => {
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=/email/i')).toBeVisible()
  })

  test('should login with valid admin credentials', async ({ page }) => {
    // Fill in admin credentials
    await page.fill('input[name="email"]', 'admin@andorinha.digital')
    await page.fill('input[name="password"]', 'admin123')
    await page.click('button[type="submit"]')

    // Should redirect to admin dashboard
    await expect(page).toHaveURL(/\/admin/, { timeout: 10000 })
    await expect(page.locator('text=/dashboard/i')).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.fill('input[name="email"]', 'admin@andorinha.digital')
    await page.fill('input[name="password"]', 'admin123')
    await page.click('button[type="submit"]')

    await page.waitForURL(/\/admin/, { timeout: 10000 })

    // Click user menu and logout
    await page.click('[data-testid="user-menu"], button:has-text("admin")')
    await page.click('text=/sair|logout/i')

    // Should redirect to login page
    await expect(page).toHaveURL('/', { timeout: 5000 })
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('should persist session after page reload', async ({ page }) => {
    // Login
    await page.fill('input[name="email"]', 'admin@andorinha.digital')
    await page.fill('input[name="password"]', 'admin123')
    await page.click('button[type="submit"]')

    await page.waitForURL(/\/admin/)

    // Reload page
    await page.reload()

    // Should still be logged in
    await expect(page).toHaveURL(/\/admin/)
    await expect(page.locator('text=/dashboard/i')).toBeVisible()
  })

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Try to access admin page directly
    await page.goto('/admin/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL('/')
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })
})

test.describe('Rate Limiting', () => {
  test('should rate limit excessive login attempts', async ({ page }) => {
    await page.goto('/')

    // Make 6 rapid login attempts (limit is 5)
    for (let i = 0; i < 6; i++) {
      await page.fill('input[name="email"]', `test${i}@example.com`)
      await page.fill('input[name="password"]', 'password')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
    }

    // Should show rate limit error
    await expect(
      page.locator('text=/muitas tentativas|rate limit/i')
    ).toBeVisible({ timeout: 5000 })
  })
})
