import { afterEach, describe, expect, it } from 'vitest'
import { cars } from './cars'
import { DEFAULT_SAVE, loadSave, saveSave } from './storage'

const storageKey = 'neon-drive-save'

const memoryStorage = new Map<string, string>()

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    clear: () => memoryStorage.clear(),
    getItem: (key: string) => memoryStorage.get(key) ?? null,
    setItem: (key: string, value: string) => memoryStorage.set(key, value),
  },
})

afterEach(() => {
  localStorage.clear()
})

describe('car data', () => {
  it('provides four original cars with one starter car unlocked', () => {
    expect(cars).toHaveLength(4)
    expect(cars.every((car) => car.name.length > 0)).toBe(true)
    expect(cars[0].unlockCoins).toBe(0)
  })
})

describe('save storage', () => {
  it('loads defaults when there is no saved data', () => {
    expect(loadSave()).toEqual(DEFAULT_SAVE)
  })

  it('falls back to defaults for invalid JSON', () => {
    localStorage.setItem(storageKey, '{not-json')
    expect(loadSave()).toEqual(DEFAULT_SAVE)
  })

  it('round-trips a valid save', () => {
    const save = { bestScore: 1200, coins: 18, unlockedCarIds: ['pulse'] }
    saveSave(save)
    expect(loadSave()).toEqual(save)
  })
})
