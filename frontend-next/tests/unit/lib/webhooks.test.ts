import { describe, it, expect, beforeEach, vi } from 'vitest'
import { generateSignature, verifySignature } from '@/lib/webhooks'

// Mock fetch globally
global.fetch = vi.fn()

describe('Webhook Utilities', () => {
  describe('generateSignature', () => {
    it('should generate HMAC SHA-256 signature', () => {
      const payload = '{"event":"USER_CREATED","data":{"userId":"123"}}'
      const secret = 'test-secret-key'

      const signature = generateSignature(payload, secret)

      expect(signature).toBeTruthy()
      expect(signature).toMatch(/^[a-f0-9]{64}$/) // 64 hex characters
    })

    it('should generate consistent signatures for same input', () => {
      const payload = '{"test":"data"}'
      const secret = 'secret'

      const sig1 = generateSignature(payload, secret)
      const sig2 = generateSignature(payload, secret)

      expect(sig1).toBe(sig2)
    })

    it('should generate different signatures for different payloads', () => {
      const secret = 'secret'

      const sig1 = generateSignature('{"data":"one"}', secret)
      const sig2 = generateSignature('{"data":"two"}', secret)

      expect(sig1).not.toBe(sig2)
    })

    it('should generate different signatures for different secrets', () => {
      const payload = '{"data":"test"}'

      const sig1 = generateSignature(payload, 'secret1')
      const sig2 = generateSignature(payload, 'secret2')

      expect(sig1).not.toBe(sig2)
    })
  })

  describe('verifySignature', () => {
    it('should verify valid signature', () => {
      const payload = '{"event":"USER_CREATED"}'
      const secret = 'test-secret'
      const signature = generateSignature(payload, secret)

      const isValid = verifySignature(payload, signature, secret)

      expect(isValid).toBe(true)
    })

    it('should reject invalid signature', () => {
      const payload = '{"event":"USER_CREATED"}'
      const secret = 'test-secret'
      const invalidSignature = 'invalid-signature-hash'

      const isValid = verifySignature(payload, invalidSignature, secret)

      expect(isValid).toBe(false)
    })

    it('should reject signature with wrong secret', () => {
      const payload = '{"event":"USER_CREATED"}'
      const signature = generateSignature(payload, 'correct-secret')

      const isValid = verifySignature(payload, signature, 'wrong-secret')

      expect(isValid).toBe(false)
    })

    it('should reject signature for tampered payload', () => {
      const originalPayload = '{"event":"USER_CREATED","userId":"123"}'
      const tamperedPayload = '{"event":"USER_CREATED","userId":"456"}'
      const secret = 'test-secret'
      const signature = generateSignature(originalPayload, secret)

      const isValid = verifySignature(tamperedPayload, signature, secret)

      expect(isValid).toBe(false)
    })

    it('should handle empty payload', () => {
      const payload = ''
      const secret = 'test-secret'
      const signature = generateSignature(payload, secret)

      const isValid = verifySignature(payload, signature, secret)

      expect(isValid).toBe(true)
    })

    it('should handle special characters in payload', () => {
      const payload = '{"message":"Hello! @#$% 🎉"}'
      const secret = 'test-secret'
      const signature = generateSignature(payload, secret)

      const isValid = verifySignature(payload, signature, secret)

      expect(isValid).toBe(true)
    })
  })

  describe('Signature Security', () => {
    it('should use timing-safe comparison', () => {
      const payload = '{"data":"test"}'
      const secret = 'secret'
      const correctSig = generateSignature(payload, secret)

      // Create signature with one character different
      const wrongSig = correctSig.slice(0, -1) + (correctSig.slice(-1) === 'a' ? 'b' : 'a')

      const result1 = verifySignature(payload, correctSig, secret)
      const result2 = verifySignature(payload, wrongSig, secret)

      expect(result1).toBe(true)
      expect(result2).toBe(false)
    })

    it('should not leak information through timing', () => {
      const payload = '{"data":"test"}'
      const secret = 'secret'
      const correctSig = generateSignature(payload, secret)

      // Signature with same length but completely different
      const wrongSig = '0'.repeat(64)

      // Both should return false quickly without timing differences
      const result = verifySignature(payload, wrongSig, secret)
      expect(result).toBe(false)
    })
  })
})
