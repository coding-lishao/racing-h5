import { describe, expect, it } from 'vitest'
import { clampPlayerX, rectanglesOverlap, shouldApplyCollision } from './collision'

describe('collision helpers', () => {
  it('detects overlapping rectangles', () => {
    expect(rectanglesOverlap({ x: 0, y: 0, width: 10, height: 10 }, { x: 8, y: 8, width: 10, height: 10 })).toBe(true)
    expect(rectanglesOverlap({ x: 0, y: 0, width: 10, height: 10 }, { x: 20, y: 0, width: 10, height: 10 })).toBe(false)
  })

  it('blocks repeated damage during the invulnerability cooldown', () => {
    expect(shouldApplyCollision(0)).toBe(true)
    expect(shouldApplyCollision(0.4)).toBe(false)
    expect(shouldApplyCollision(0.8)).toBe(false)
  })

  it('clamps the player to the road bounds', () => {
    expect(clampPlayerX(-20, 100, 300)).toBe(100)
    expect(clampPlayerX(250, 100, 300)).toBe(250)
    expect(clampPlayerX(340, 100, 300)).toBe(300)
  })
})
