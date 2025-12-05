import { describe, it, expect } from 'vitest'
import { EmailTemplates } from '@/lib/email'

describe('EmailTemplates', () => {
  describe('welcome', () => {
    it('should generate welcome email with temporary password', () => {
      const result = EmailTemplates.welcome(
        'John Doe',
        'john@example.com',
        'temp123'
      )

      expect(result.subject).toBe('Bem-vindo à Andorinha Digital')
      expect(result.html).toContain('John Doe')
      expect(result.html).toContain('temp123')
      expect(result.text).toContain('John Doe')
      expect(result.text).toContain('temp123')
    })

    it('should generate welcome email without temporary password', () => {
      const result = EmailTemplates.welcome(
        'Jane Smith',
        'jane@example.com'
      )

      expect(result.subject).toBe('Bem-vindo à Andorinha Digital')
      expect(result.html).toContain('Jane Smith')
      expect(result.text).toContain('Jane Smith')
    })
  })

  describe('passwordChanged', () => {
    it('should generate password changed notification', () => {
      const result = EmailTemplates.passwordChanged('John Doe')

      expect(result.subject).toContain('Senha alterada')
      expect(result.html).toContain('John Doe')
      expect(result.text).toContain('John Doe')
    })
  })

  describe('roleChanged', () => {
    it('should generate role changed notification', () => {
      const result = EmailTemplates.roleChanged('John Doe', 'CLIENT', 'AUTHOR')

      expect(result.subject).toContain('permissões')
      expect(result.html).toContain('John Doe')
      expect(result.html).toContain('CLIENT')
      expect(result.html).toContain('AUTHOR')
      expect(result.text).toContain('John Doe')
    })
  })

  describe('Email Content Validation', () => {
    it('should include proper branding in all emails', () => {
      const templates = [
        EmailTemplates.welcome('User', 'user@test.com'),
        EmailTemplates.passwordChanged('User'),
        EmailTemplates.roleChanged('User', 'CLIENT', 'AUTHOR'),
      ]

      templates.forEach(template => {
        expect(template.html.toLowerCase()).toContain('andorinha digital')
        expect(template.text).toBeTruthy()
      })
    })

    it('should have proper email structure', () => {
      const template = EmailTemplates.welcome('User', 'user@test.com')

      // Check for common email elements
      expect(template.subject).toBeTruthy()
      expect(template.html).toBeTruthy()
      expect(template.text).toBeTruthy()

      // HTML should have proper structure
      expect(template.html).toMatch(/<html/i)
      expect(template.html).toMatch(/<body/i)
    })

    it('should have text-only fallback', () => {
      const templates = [
        EmailTemplates.welcome('User', 'user@test.com'),
        EmailTemplates.passwordChanged('User'),
      ]

      templates.forEach(template => {
        expect(template.text).toBeTruthy()
        expect(template.text.length).toBeGreaterThan(10)
        // Text version should not contain HTML tags
        expect(template.text).not.toMatch(/<[^>]+>/)
      })
    })

    it('should include call-to-action in welcome email', () => {
      const template = EmailTemplates.welcome('User', 'user@test.com')

      // Should include link or button to access the platform
      expect(template.html.toLowerCase()).toMatch(/acessar|acesso|login/)
    })

    it('should include security information in password changed email', () => {
      const template = EmailTemplates.passwordChanged('User')

      // Should mention security or that user should contact if they didn't make the change
      expect(template.html.toLowerCase()).toMatch(/segur|contato/)
    })
  })

  describe('Text Content Generation', () => {
    it('should generate readable plain text from HTML', () => {
      const template = EmailTemplates.welcome('Test User', 'test@example.com', 'temp123')

      // Plain text should contain the key information
      expect(template.text).toContain('Test User')
      expect(template.text).toContain('temp123')
      // Should be readable without HTML formatting
      expect(template.text).not.toContain('<!DOCTYPE')
      expect(template.text).not.toContain('<div')
    })
  })
})
