import { test, expect } from '@playwright/test'

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/')
    await page.fill('input[name="email"]', 'admin@andorinha.digital')
    await page.fill('input[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/admin/)

    // Navigate to users page
    await page.goto('/admin/settings/users')
    await expect(page.locator('h1:has-text("Usuários")')).toBeVisible()
  })

  test('should display users table', async ({ page }) => {
    // Check for table elements
    await expect(page.locator('table')).toBeVisible()
    await expect(page.locator('th:has-text("Nome")')).toBeVisible()
    await expect(page.locator('th:has-text("Email")')).toBeVisible()
    await expect(page.locator('th:has-text("Role")')).toBeVisible()
  })

  test('should open create user modal', async ({ page }) => {
    await page.click('button:has-text("Novo Usuário")')

    // Modal should appear
    await expect(page.locator('text=/criar usuário/i')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('should create new user', async ({ page }) => {
    await page.click('button:has-text("Novo Usuário")')

    // Fill form
    const timestamp = Date.now()
    const testEmail = `test-user-${timestamp}@example.com`

    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[name="password"]', 'TestPassword123!')

    // Select role (CLIENT by default or select from dropdown)
    await page.click('button[role="combobox"]')
    await page.click('text=/client/i')

    // Submit form
    await page.click('button[type="submit"]:has-text("Criar")')

    // Wait for success message
    await expect(
      page.locator('text=/usuário criado com sucesso/i')
    ).toBeVisible({ timeout: 5000 })

    // Verify user appears in table
    await expect(page.locator(`text=${testEmail}`)).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.click('button:has-text("Novo Usuário")')

    // Try to submit empty form
    await page.click('button[type="submit"]:has-text("Criar")')

    // Should show validation errors
    await expect(page.locator('text=/nome/i')).toBeVisible()
    await expect(page.locator('text=/email/i')).toBeVisible()
  })

  test('should prevent duplicate email', async ({ page }) => {
    await page.click('button:has-text("Novo Usuário")')

    // Try to create user with existing email
    await page.fill('input[name="name"]', 'Duplicate User')
    await page.fill('input[name="email"]', 'admin@andorinha.digital')
    await page.fill('input[name="password"]', 'Password123!')

    await page.click('button[type="submit"]:has-text("Criar")')

    // Should show error
    await expect(
      page.locator('text=/email já está em uso/i')
    ).toBeVisible({ timeout: 5000 })
  })

  test('should edit existing user', async ({ page }) => {
    // Click edit button on first user row (not admin)
    const rows = page.locator('table tbody tr')
    const firstRow = rows.first()
    await firstRow.locator('button:has-text("Editar")').click()

    // Modal should appear with pre-filled data
    await expect(page.locator('text=/editar usuário/i')).toBeVisible()
    await expect(page.locator('input[name="name"]')).not.toBeEmpty()
    await expect(page.locator('input[name="email"]')).not.toBeEmpty()

    // Change name
    await page.fill('input[name="name"]', 'Updated Name')

    // Submit
    await page.click('button[type="submit"]:has-text("Salvar")')

    // Wait for success
    await expect(
      page.locator('text=/usuário atualizado/i')
    ).toBeVisible({ timeout: 5000 })

    // Verify updated name appears
    await expect(page.locator('text=Updated Name')).toBeVisible()
  })

  test('should delete user', async ({ page }) => {
    // First create a test user to delete
    await page.click('button:has-text("Novo Usuário")')

    const timestamp = Date.now()
    const testEmail = `delete-test-${timestamp}@example.com`

    await page.fill('input[name="name"]', 'Delete Test User')
    await page.fill('input[name="email"]', testEmail)
    await page.fill('input[name="password"]', 'Password123!')

    await page.click('button[type="submit"]:has-text("Criar")')
    await page.waitForTimeout(1000)

    // Find the user row and click delete
    const userRow = page.locator(`tr:has-text("${testEmail}")`)
    await userRow.locator('button:has-text("Excluir")').click()

    // Confirm deletion
    await page.click('button:has-text("Confirmar")')

    // Wait for success
    await expect(
      page.locator('text=/usuário excluído/i')
    ).toBeVisible({ timeout: 5000 })

    // Verify user is removed from table
    await expect(page.locator(`text=${testEmail}`)).not.toBeVisible()
  })

  test('should filter users by role', async ({ page }) => {
    // Click role filter
    await page.click('button[role="combobox"]:has-text("Role")')

    // Select ADMIN
    await page.click('text=/admin/i')

    // Should only show admin users
    await expect(page.locator('table tbody tr')).toHaveCount(1)
    await expect(page.locator('text=/admin@andorinha.digital/i')).toBeVisible()
  })

  test('should search users by name or email', async ({ page }) => {
    // Type in search box
    await page.fill('input[placeholder*="Buscar"]', 'admin')

    // Should filter results
    await page.waitForTimeout(500) // Wait for debounce

    await expect(page.locator('text=/admin@andorinha.digital/i')).toBeVisible()
  })

  test('should paginate user list', async ({ page }) => {
    // Check if pagination exists (depends on number of users)
    const paginationExists = await page.locator('button:has-text("Próximo")').isVisible()

    if (paginationExists) {
      // Get first user name
      const firstUserName = await page.locator('table tbody tr').first().locator('td').first().textContent()

      // Go to next page
      await page.click('button:has-text("Próximo")')
      await page.waitForTimeout(500)

      // First user should be different
      const newFirstUserName = await page.locator('table tbody tr').first().locator('td').first().textContent()
      expect(newFirstUserName).not.toBe(firstUserName)

      // Go back
      await page.click('button:has-text("Anterior")')
      await page.waitForTimeout(500)

      // Should show original first user
      const backUserName = await page.locator('table tbody tr').first().locator('td').first().textContent()
      expect(backUserName).toBe(firstUserName)
    }
  })
})

test.describe('User Management - Authorization', () => {
  test('should not allow non-admin to access user management', async ({ page }) => {
    // Login as CLIENT or AUTHOR (if available)
    await page.goto('/')
    await page.fill('input[name="email"]', 'client@andorinha.digital')
    await page.fill('input[name="password"]', 'client123')
    await page.click('button[type="submit"]')

    // Try to access users page
    await page.goto('/admin/settings/users')

    // Should be redirected or show error
    await expect(page).not.toHaveURL('/admin/settings/users')
  })
})
