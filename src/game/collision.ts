import type { Rect } from './entities'

export const rectanglesOverlap = (a: Rect, b: Rect): boolean => (
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
)

export const shouldApplyCollision = (cooldown: number): boolean => cooldown <= 0

export const clampPlayerX = (x: number, min: number, max: number): number => Math.max(min, Math.min(max, x))
