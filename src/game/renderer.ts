import type { CarDefinition } from '../types'
import { gameConfig } from '../data/gameConfig'
import type { RoadItem } from './entities'

export const renderRace = (ctx: CanvasRenderingContext2D, _width: number, _height: number, car: CarDefinition, playerX: number, items: RoadItem[], elapsed: number, nitroActive: boolean): void => {
  ctx.save()
  const viewHeight = 700
  ctx.fillStyle = '#080b18'
  ctx.fillRect(0, 0, 360, viewHeight)
  ctx.fillStyle = '#111a32'
  ctx.fillRect(20, 0, gameConfig.roadWidth, viewHeight)
  ctx.fillStyle = '#26345b'
  ctx.fillRect(20, 0, 4, viewHeight)
  ctx.fillRect(336, 0, 4, viewHeight)
  ctx.save()
  ctx.beginPath()
  ctx.rect(20, 0, gameConfig.roadWidth, viewHeight)
  ctx.clip()
  ctx.strokeStyle = 'rgba(159, 193, 255, .28)'
  ctx.lineWidth = 3
  ctx.setLineDash([34, 28])
  ctx.lineDashOffset = elapsed * 180
  for (let lane = 1; lane < gameConfig.laneCount; lane += 1) {
    const x = 20 + lane * 80
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, viewHeight); ctx.stroke()
  }
  ctx.setLineDash([])
  if (nitroActive) {
    ctx.strokeStyle = 'rgba(118, 241, 255, .75)'
    ctx.lineWidth = 2
    for (let line = 0; line < 10; line += 1) {
      const y = (elapsed * 300 + line * 76) % viewHeight
      ctx.beginPath(); ctx.moveTo(30 + line * 31, y); ctx.lineTo(30 + line * 31, y + 34); ctx.stroke()
    }
  }
  for (const item of items) {
    if (item.collected) continue
    if (item.kind === 'coin') drawCoin(ctx, item.x + 20, item.y + 20)
    else if (item.kind === 'nitro') drawNitro(ctx, item.x + 20, item.y + 20)
    else drawCar(ctx, item.x, item.y, '#ff5f6d', '#ffb36b', .82)
  }
  if (nitroActive) drawNitroTrail(ctx, playerX + 21, 584, elapsed)
  drawCar(ctx, playerX, 520, car.color, car.accent, 1)
  ctx.restore()
  ctx.restore()
}

export const getNitroTrail = (elapsed: number): { length: number; width: number } => ({
  length: 48 + Math.sin(elapsed * 28) * 12,
  width: 20 + Math.cos(elapsed * 24) * 5,
})

const drawNitroTrail = (ctx: CanvasRenderingContext2D, x: number, y: number, elapsed: number): void => {
  const trail = getNitroTrail(elapsed)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.shadowColor = '#5ceeff'
  ctx.shadowBlur = 22
  const outer = ctx.createLinearGradient(x, y, x, y + trail.length)
  outer.addColorStop(0, '#ffffff')
  outer.addColorStop(.25, '#66efff')
  outer.addColorStop(1, 'rgba(42, 123, 255, 0)')
  ctx.fillStyle = outer
  ctx.beginPath(); ctx.moveTo(x - trail.width, y); ctx.lineTo(x + trail.width, y); ctx.lineTo(x, y + trail.length); ctx.closePath(); ctx.fill()
  ctx.shadowColor = '#fff5a8'
  ctx.shadowBlur = 12
  ctx.fillStyle = '#fff5a8'
  ctx.beginPath(); ctx.moveTo(x - trail.width * .38, y); ctx.lineTo(x + trail.width * .38, y); ctx.lineTo(x, y + trail.length * .62); ctx.closePath(); ctx.fill()
  ctx.restore()
}

const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, accent: string, scale: number): void => {
  ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale)
  ctx.shadowColor = color; ctx.shadowBlur = 18
  ctx.fillStyle = color; roundRect(ctx, 0, 0, 42, 72, 12); ctx.fill()
  ctx.shadowBlur = 0; ctx.fillStyle = accent; roundRect(ctx, 6, 15, 30, 23, 8); ctx.fill()
  ctx.fillStyle = '#effcff'; roundRect(ctx, 8, 4, 26, 6, 3); ctx.fill()
  ctx.fillStyle = '#0b1021'; ctx.fillRect(-3, 16, 5, 18); ctx.fillRect(40, 16, 5, 18); ctx.fillRect(-3, 50, 5, 16); ctx.fillRect(40, 50, 5, 16)
  ctx.restore()
}

const drawCoin = (ctx: CanvasRenderingContext2D, x: number, y: number): void => { ctx.fillStyle = '#ffe873'; ctx.shadowColor = '#ffe873'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#9a5c11'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('$', x, y + 5) }
const drawNitro = (ctx: CanvasRenderingContext2D, x: number, y: number): void => { ctx.fillStyle = '#76f1ff'; ctx.shadowColor = '#76f1ff'; ctx.shadowBlur = 18; ctx.beginPath(); ctx.moveTo(x, y - 15); ctx.lineTo(x + 9, y); ctx.lineTo(x, y + 15); ctx.lineTo(x - 9, y); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0 }
const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void => { ctx.beginPath(); ctx.roundRect(x, y, width, height, radius) }
