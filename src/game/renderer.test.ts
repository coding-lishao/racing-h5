import { describe, expect, it } from 'vitest'
import { getNitroTrail } from './renderer'

describe('nitro trail', () => {
  it('animates a visible flame length behind the player car', () => {
    const first = getNitroTrail(0)
    const second = getNitroTrail(0.4)
    expect(first.length).toBeGreaterThan(40)
    expect(first.width).toBeGreaterThan(16)
    expect(second.length).not.toBe(first.length)
  })
})
