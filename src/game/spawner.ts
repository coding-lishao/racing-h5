import type { RoadItem } from './entities'

export const createSpawnRow = (seed: number, laneCount: number, playerLane: number): RoadItem[] => {
  const items: RoadItem[] = []
  const openLane = Math.abs(seed * 13) % laneCount
  for (let lane = 0; lane < laneCount; lane += 1) {
    if (lane === openLane || lane === playerLane) continue
    const value = Math.abs((seed + 1) * (lane + 3) * 17) % 10
    if (value < 6) items.push({ x: 0, y: -80, width: 44, height: 66, lane, kind: value < 2 ? 'barrier' : 'car' })
  }
  return items
}
