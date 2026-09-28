import { describe, expect, it } from 'vitest'
import { cars } from '../data/cars'
import { RaceEngine } from './raceEngine'

describe('race engine nitro', () => {
  it('keeps a click-triggered nitro burst active after the pointer is released', () => {
    const normalEngine = new RaceEngine(cars[0])
    normalEngine.start()
    normalEngine.update(0.2)
    const engine = new RaceEngine(cars[0])
    engine.start()
    engine.update(0.1)
    engine.handleInput({ steer: 0, nitro: true })
    engine.handleInput({ steer: 0, nitro: false })
    engine.update(0.1)
    expect(engine.getSnapshot().distance).toBeGreaterThan(normalEngine.getSnapshot().distance)
  })
})
