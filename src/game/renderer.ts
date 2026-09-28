import type { CarDefinition } from '../types'
import { gameConfig } from '../data/gameConfig'
import type { RoadItem } from './entities'

export const renderRace = (ctx: CanvasRenderingContext2D, width: number, height: number, car: CarDefinition, playerX: number, items: RoadItem[], elapsed: number): void => {
  const scale = width / 360
  ctx.save()
  ctx.scale(scale, scale)
  const viewHeight = height / scale
  ctx.fillStyle = '#080b18'
  ctx.fillRect(0, 0, 360, viewHeight)
  ctx.fillStyle = '#111a32'
  ctx.fillRect(20, 0, gameConfig.roadWidth, viewHeight)
  ctx.fillStyle = '#26345b'
  ctx.fillRect(20, 0, 4, viewHeight)
  ctx.fillRect(336, 0, 4, viewHeight)
  ctx.strokeStyle = 'rgba(159, 193, 255, .28)'
  ctx.lineWidth = 3
  ctx.setLineDash([34, 28])
  ctx.lineDashOffset = elapsed * 180
  for (let lane = 1; lane < gameConfig.laneCount; lane += 1) {
    const x = 20 + lane * 80
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, viewHeight); ctx.stroke()
  }
  ctx.setLineDash([])
  for (const item of items) {
    if (item.collected) continue
    if (item.kind === 'coin') drawCoin(ctx, item.x + 20, item.y + 20)
    else if (item.kind === 'nitro') drawNitro(ctx, item.x + 20, item.y + 20)
    else drawCar(ctx, item.x, item.y, '#ff5f6d', '#ffb36b', .82)
  }
  drawCar(ctx, playerX, 520, car.color, car.accent, 1)
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
