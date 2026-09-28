import type { CarDefinition } from '../types'

export const cars: CarDefinition[] = [
  { id: 'comet', name: '彗星', subtitle: '平衡街头款', color: '#6ceeff', accent: '#2365ff', speed: 7, handling: 7, acceleration: 6, unlockCoins: 0 },
  { id: 'pulse', name: '脉冲', subtitle: '灵活加速款', color: '#ff72d2', accent: '#9c39ff', speed: 6, handling: 9, acceleration: 8, unlockCoins: 80 },
  { id: 'volt', name: '电光', subtitle: '高速冲刺款', color: '#ffe873', accent: '#ff7a33', speed: 9, handling: 5, acceleration: 8, unlockCoins: 180 },
  { id: 'nova', name: '新星', subtitle: '赛道终结款', color: '#a7ffbe', accent: '#24b978', speed: 10, handling: 8, acceleration: 9, unlockCoins: 320 },
]
