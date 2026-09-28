import type { PlayerSave } from '../types'

export const DEFAULT_SAVE: PlayerSave = {
  bestScore: 0,
  coins: 0,
  unlockedCarIds: ['comet'],
}

const STORAGE_KEY = 'neon-drive-save'

const isPlayerSave = (value: unknown): value is PlayerSave => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<PlayerSave>
  return typeof candidate.bestScore === 'number'
    && typeof candidate.coins === 'number'
    && Array.isArray(candidate.unlockedCarIds)
    && candidate.unlockedCarIds.every((id) => typeof id === 'string')
}

export const loadSave = (): PlayerSave => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SAVE, unlockedCarIds: [...DEFAULT_SAVE.unlockedCarIds] }
    const parsed: unknown = JSON.parse(raw)
    if (!isPlayerSave(parsed)) return { ...DEFAULT_SAVE, unlockedCarIds: [...DEFAULT_SAVE.unlockedCarIds] }
    return parsed
  } catch {
    return { ...DEFAULT_SAVE, unlockedCarIds: [...DEFAULT_SAVE.unlockedCarIds] }
  }
}

export const saveSave = (save: PlayerSave): void => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(save))
  } catch {
    // Local persistence is optional; gameplay continues when storage is blocked.
  }
}
