import type { RoadItem } from './entities'

export const createSpawnRow = (seed: number, laneCount: number, playerLane: number): RoadItem[] => {
  const items: RoadItem[] = []
  const openLane = Math.abs(seed * 13) % laneCount
  for (let lane = 0; lane < laneCount; lane += 1) {
    if (lane === openLane || lane === playerLane) continue
    const value = Math.abs((seed + 1) * (lane + 3) * 17) % 20
    if (value < 3) items.push({ x: 0, y: -80, width: 24, height: 24, lane, kind: value === 0 ? 'nitro' : 'coin' })
    else if (value < 11) items.push({ x: 0, y: -80, width: 44, height: 66, lane, kind: value < 5 ? 'barrier' : 'car' })
  }
  return items
}
