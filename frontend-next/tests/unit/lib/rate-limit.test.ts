import { describe, it, expect, beforeEach, vi } from 'vitest'
import { RateLimiter, RateLimitPresets } from '@/lib/rate-limit'

describe('RateLimiter', () => {
  let limiter: RateLimiter

  beforeEach(() => {
    limiter = new RateLimiter()
    vi.useFakeTimers()
  })

  describe('check', () => {
    it('should allow requests within limit', () => {
      const result = limiter.check('user-1', 5, 60)

      expect(result.success).toBe(true)
      expect(result.limit).toBe(5)
      expect(result.remaining).toBe(4)
      expect(result.reset).toBeGreaterThan(Date.now())
    })

    it('should block requests exceeding limit', () => {
      // Use up all 5 requests
      for (let i = 0; i < 5; i++) {
        limiter.check('user-1', 5, 60)
      }

      // 6th request should be blocked
      const result = limiter.check('user-1', 5, 60)

      expect(result.success).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('should reset after window expires', () => {
      // Use up all requests
      for (let i = 0; i < 5; i++) {
        limiter.check('user-1', 5, 60)
      }

      // Advance time past window
      vi.advanceTimersByTime(61 * 1000)

      // Should allow new requests
      const result = limiter.check('user-1', 5, 60)
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(4)
    })

    it('should track different identifiers separately', () => {
      limiter.check('user-1', 3, 60)
      limiter.check('user-1', 3, 60)
      limiter.check('user-1', 3, 60)

      // user-1 is at limit
      const result1 = limiter.check('user-1', 3, 60)
      expect(result1.success).toBe(false)

      // user-2 should still have requests available
      const result2 = limiter.check('user-2', 3, 60)
      expect(result2.success).toBe(true)
      expect(result2.remaining).toBe(2)
    })

    it('should refill tokens gradually', () => {
      // Use 3 out of 5 tokens
      limiter.check('user-1', 5, 60)
      limiter.check('user-1', 5, 60)
      limiter.check('user-1', 5, 60)

      // Advance time by 30 seconds (half the window)
      vi.advanceTimersByTime(30 * 1000)

      // Should have refilled approximately 2.5 tokens
      const result = limiter.check('user-1', 5, 60)
      expect(result.success).toBe(true)
      expect(result.remaining).toBeGreaterThanOrEqual(1)
    })
  })

  describe('cleanup', () => {
    it('should remove expired entries', () => {
      limiter.check('user-1', 5, 60)
      limiter.check('user-2', 5, 60)

      // Advance time past cleanup threshold
      vi.advanceTimersByTime(61 * 1000)

      // Trigger cleanup by checking a new user
      limiter.check('user-3', 5, 60)

      // Old entries should be cleaned up (verify by checking they start fresh)
      const result1 = limiter.check('user-1', 5, 60)
      const result2 = limiter.check('user-2', 5, 60)

      expect(result1.remaining).toBe(4)
      expect(result2.remaining).toBe(4)
    })
  })

  describe('RateLimitPresets', () => {
    it('should have correct AUTH preset', () => {
      expect(RateLimitPresets.AUTH).toEqual({
        limit: 5,
        window: 15 * 60, // 15 minutes
      })
    })

    it('should have correct PUBLIC_API preset', () => {
      expect(RateLimitPresets.PUBLIC_API).toEqual({
        limit: 100,
        window: 60 * 60, // 1 hour
      })
    })

    it('should have correct AUTHENTICATED_API preset', () => {
      expect(RateLimitPresets.AUTHENTICATED_API).toEqual({
        limit: 1000,
        window: 60 * 60, // 1 hour
      })
    })

    it('should have correct FORM_SUBMIT preset', () => {
      expect(RateLimitPresets.FORM_SUBMIT).toEqual({
        limit: 10,
        window: 60 * 60, // 1 hour
      })
    })

    it('should have correct FILE_UPLOAD preset', () => {
      expect(RateLimitPresets.FILE_UPLOAD).toEqual({
        limit: 20,
        window: 60 * 60, // 1 hour
      })
    })
  })

  describe('edge cases', () => {
    it('should handle zero window correctly', () => {
      const result = limiter.check('user-1', 5, 0)
      expect(result.success).toBe(true)
    })

    it('should handle very high limits', () => {
      const result = limiter.check('user-1', 1000000, 60)
      expect(result.success).toBe(true)
      expect(result.limit).toBe(1000000)
    })

    it('should handle rapid consecutive requests', () => {
      const results = []
      for (let i = 0; i < 10; i++) {
        results.push(limiter.check('user-1', 5, 60))
      }

      const successCount = results.filter(r => r.success).length
      expect(successCount).toBe(5)
    })
  })
})
