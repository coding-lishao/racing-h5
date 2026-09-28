export type GameScreen = 'home' | 'garage' | 'race' | 'result'

export type CarDefinition = {
  id: string
  name: string
  subtitle: string
  color: string
  accent: string
  speed: number
  handling: number
  acceleration: number
  unlockCoins: number
}

export type PlayerSave = {
  bestScore: number
  coins: number
  unlockedCarIds: string[]
}

export type RaceInput = {
  steer: number
  nitro: boolean
}

export type RaceSnapshot = {
  score: number
  distance: number
  coins: number
  health: number
  nitro: number
  speed: number
  nitroActive: boolean
  running: boolean
  paused: boolean
}
