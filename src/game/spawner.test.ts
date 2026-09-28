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

  it('creates collectible coins and nitro items across normal spawn rows', () => {
    const kinds = Array.from({ length: 40 }, (_, seed) => createSpawnRow(seed + 20, 4, 1).map((item) => item.kind)).flat()
    expect(kinds).toContain('coin')
    expect(kinds).toContain('nitro')
  })
})
