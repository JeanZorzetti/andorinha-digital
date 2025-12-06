import { describe, it, expect } from 'vitest'
import { authOptions } from '@/lib/auth'

describe('Auth Configuration', () => {
  describe('authOptions structure', () => {
    it('should have correct pages configuration', () => {
      expect(authOptions.pages).toEqual({
        signIn: '/auth/signin',
      })
    })

    it('should have CredentialsProvider configured', () => {
      expect(authOptions.providers).toHaveLength(1)
      expect(authOptions.providers[0]).toBeDefined()
    })

    it('should have jwt callback defined', () => {
      expect(authOptions.callbacks?.jwt).toBeDefined()
      expect(typeof authOptions.callbacks?.jwt).toBe('function')
    })

    it('should have session callback defined', () => {
      expect(authOptions.callbacks?.session).toBeDefined()
      expect(typeof authOptions.callbacks?.session).toBe('function')
    })
  })

  describe('JWT callback', () => {
    it('should add user id and role to token when user is provided', async () => {
      const token = { sub: 'user-123' }
      const user = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'ADMIN',
      }

      const result = await authOptions.callbacks!.jwt!({
        token,
        user: user as any,
        trigger: 'signIn',
        account: null,
        profile: undefined,
        isNewUser: false,
        session: undefined,
      })

      expect(result).toEqual({
        sub: 'user-123',
        id: 'user-123',
        role: 'ADMIN',
      })
    })

    it('should return token unchanged when user is not provided', async () => {
      const token = {
        sub: 'user-123',
        id: 'user-123',
        role: 'USER',
      }

      const result = await authOptions.callbacks!.jwt!({
        token,
        trigger: 'update',
        account: null,
        profile: undefined,
        isNewUser: false,
        session: undefined,
      })

      expect(result).toEqual(token)
    })

    it('should preserve existing token properties', async () => {
      const token = {
        sub: 'user-123',
        email: 'test@example.com',
        name: 'Test',
        iat: 1234567890,
        exp: 9876543210,
      }

      const result = await authOptions.callbacks!.jwt!({
        token,
        trigger: 'update',
        account: null,
        profile: undefined,
        isNewUser: false,
        session: undefined,
      })

      expect(result).toMatchObject(token)
    })
  })

  describe('Session callback', () => {
    it('should add user id and role to session from token', async () => {
      const session = {
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
        expires: '2024-12-31',
      }
      const token = {
        sub: 'user-123',
        id: 'user-123',
        role: 'ADMIN',
      }

      const result = await authOptions.callbacks!.session!({
        session: session as any,
        token: token as any,
        user: undefined as any,
        newSession: undefined,
        trigger: 'getSession',
      })

      expect(result.user).toEqual({
        name: 'Test User',
        email: 'test@example.com',
        id: 'user-123',
        role: 'ADMIN',
      })
    })

    it('should return session unchanged when session.user is undefined', async () => {
      const session = {
        expires: '2024-12-31',
      }
      const token = {
        sub: 'user-123',
        id: 'user-123',
        role: 'ADMIN',
      }

      const result = await authOptions.callbacks!.session!({
        session: session as any,
        token: token as any,
        user: undefined as any,
        newSession: undefined,
        trigger: 'getSession',
      })

      expect(result).toEqual(session)
    })

    it('should preserve existing session properties', async () => {
      const session = {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          image: '/avatar.jpg',
        },
        expires: '2024-12-31',
      }
      const token = {
        sub: 'user-123',
        id: 'user-123',
        role: 'EDITOR',
      }

      const result = await authOptions.callbacks!.session!({
        session: session as any,
        token: token as any,
        user: undefined as any,
        newSession: undefined,
        trigger: 'getSession',
      })

      expect(result.user.name).toBe('Test User')
      expect(result.user.email).toBe('test@example.com')
      expect(result.user.image).toBe('/avatar.jpg')
      expect(result.user.id).toBe('user-123')
      expect(result.user.role).toBe('EDITOR')
      expect(result.expires).toBe('2024-12-31')
    })
  })

  describe('Provider configuration', () => {
    it('should have CredentialsProvider with correct name', () => {
      const provider = authOptions.providers[0] as any
      expect(provider.name).toBe('Credentials')
    })

    it('should have authorize function defined', () => {
      const provider = authOptions.providers[0] as any
      expect(typeof provider.authorize).toBe('function')
    })
  })
})
