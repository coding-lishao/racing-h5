import { describe, expect, it } from 'vitest'
import { createFeedback } from './feedback'

describe('race feedback events', () => {
  it('creates distinct feedback payloads for collision and collectibles', () => {
    expect(createFeedback('collision')).toEqual({ type: 'collision', text: '撞击！' })
    expect(createFeedback('coin', 1)).toEqual({ type: 'coin', text: '+1 金币' })
    expect(createFeedback('nitro', 35)).toEqual({ type: 'nitro', text: '氮气 +35%' })
  })
})
