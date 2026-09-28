import { describe, expect, it } from 'vitest'
import { createSpawnRow } from './spawner'

describe('spawn rows', () => {
  it('always leaves at least one lane open and avoids the player lane', () => {
    for (let seed = 1; seed < 20; seed += 1) {
      const row = createSpawnRow(seed, 4, 1)
      expect(row.length).toBeLessThan(4)
      expect(row.some((item) => item.lane === 1)).toBe(false)
    }
  })
})
