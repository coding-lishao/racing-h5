import type { CarDefinition } from '../types'
import { gameConfig } from '../data/gameConfig'
import { clampPlayerX, rectanglesOverlap, shouldApplyCollision } from './collision'
import type { RaceInput, RaceSnapshot } from '../types'
import type { RoadItem } from './entities'
import { createSpawnRow } from './spawner'
import { createFeedback, type FeedbackEvent } from './feedback'

export class RaceEngine {
  private readonly car: CarDefinition
  private readonly items: RoadItem[] = []
  private elapsed = 0
  private spawnClock = 0
  private collisionCooldown = 0
  private playerX = 139
  private steer = 0
  private nitroHeld = false
  private nitroBoostTime = 0
  private nitroAmount = 100
  private score = 0
  private distance = 0
  private coins = 0
  private health = gameConfig.maxHealth
  private running = false
  private paused = false

  public constructor(car: CarDefinition, private readonly onChange?: (snapshot: RaceSnapshot) => void) {
    this.car = car
  }

  public start(): void {
    this.running = true
    this.paused = false
    this.emit()
  }

  public pause(): void {
    if (this.running) this.paused = true
    this.emit()
  }

  public resume(): void {
    if (this.running) this.paused = false
    this.emit()
  }

  public stop(): void {
    this.running = false
    this.emit()
  }

  public handleInput(input: RaceInput): void {
    if (input.nitro && !this.nitroHeld && this.nitroAmount > 0) this.nitroBoostTime = Math.max(this.nitroBoostTime, 1.4)
    this.steer = input.steer
    this.nitroHeld = input.nitro
  }

  public update(delta: number): void {
    if (!this.running || this.paused) return
    const safeDelta = Math.min(delta, 0.05)
    this.elapsed += safeDelta
    this.spawnClock -= safeDelta
    this.collisionCooldown = Math.max(0, this.collisionCooldown - safeDelta)
    this.nitroBoostTime = Math.max(0, this.nitroBoostTime - safeDelta)
    let feedback: FeedbackEvent | null = null
    const nitroActive = this.nitroBoostTime > 0 && this.nitroAmount > 0
    const speed = this.getCurrentSpeed(nitroActive)
    if (nitroActive) this.nitroAmount = Math.max(0, this.nitroAmount - safeDelta * 24)
    else this.nitroAmount = Math.min(100, this.nitroAmount + safeDelta * 3)
    this.playerX = clampPlayerX(this.playerX + this.steer * this.car.handling * 70 * safeDelta, 10, gameConfig.roadWidth - gameConfig.playerWidth - 10)
    this.distance += speed * safeDelta * 0.04
    this.score = Math.floor(this.distance * 10 + this.coins * 25 + (nitroActive ? safeDelta * 10 : 0))
    if (this.spawnClock <= 0) {
      this.spawnClock = Math.max(0.42, 1.15 - this.elapsed * 0.006)
      this.items.push(...createSpawnRow(Math.floor(this.elapsed * 100), gameConfig.laneCount, Math.floor((this.playerX / gameConfig.roadWidth) * gameConfig.laneCount)).map((item) => ({ ...item, y: -90 })))
    }
    for (const item of this.items) {
      item.y += speed * safeDelta
      item.x = 25 + item.lane * 78 + (item.kind === 'coin' ? 12 : 0)
      if (!item.collected && rectanglesOverlap({ x: this.playerX, y: 520, width: gameConfig.playerWidth, height: gameConfig.playerHeight }, item)) {
        item.collected = true
        if (item.kind === 'coin') { this.coins += 1; feedback = createFeedback('coin', 1) }
        else if (item.kind === 'nitro') { this.nitroAmount = Math.min(100, this.nitroAmount + 35); feedback = createFeedback('nitro', 35) }
        else if (shouldApplyCollision(this.collisionCooldown)) {
          this.health -= 1
          this.collisionCooldown = 0.6
          feedback = createFeedback('collision')
          if (this.health <= 0) this.stop()
        }
      }
    }
    while (this.items.length && this.items[0].y > 900) this.items.shift()
    this.emit(feedback)
  }

  public getSnapshot(feedback: FeedbackEvent | null = null): RaceSnapshot {
    const nitroActive = this.nitroBoostTime > 0 && this.nitroAmount > 0
    return { score: this.score, distance: Math.floor(this.distance), coins: this.coins, health: this.health, nitro: Math.round(this.nitroAmount), speed: this.getCurrentSpeed(nitroActive), nitroActive, feedback, running: this.running, paused: this.paused }
  }

  public getRenderState(): { playerX: number; items: RoadItem[]; elapsed: number; nitroActive: boolean } {
    return { playerX: this.playerX, items: this.items, elapsed: this.elapsed, nitroActive: this.nitroBoostTime > 0 && this.nitroAmount > 0 }
  }

  private getCurrentSpeed(nitroActive: boolean): number { return Math.min(gameConfig.maxSpeed, gameConfig.baseSpeed + this.elapsed * 4 + this.car.speed * 8) * (nitroActive ? 1.75 : 1) }

  private emit(feedback: FeedbackEvent | null = null): void { this.onChange?.(this.getSnapshot(feedback)) }
}
