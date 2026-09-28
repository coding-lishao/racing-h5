export type Rect = { x: number; y: number; width: number; height: number }

export type RoadItem = Rect & { kind: 'car' | 'barrier' | 'coin' | 'nitro'; lane: number; collected?: boolean }
