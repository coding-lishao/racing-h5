import type { CarDefinition, RaceSnapshot } from '../types'
import { RaceEngine } from '../game/raceEngine'
import { renderRace as paintRace } from '../game/renderer'
import type { FeedbackEvent } from '../game/feedback'

export const renderRace = (root: HTMLElement, car: CarDefinition, onFinish: (snapshot: RaceSnapshot) => void, onExit: () => void): void => {
  root.innerHTML = `<div class="race-screen"><div class="race-hud"><span>距离 <strong data-distance>0</strong>m</span><span>分数 <strong data-score>0</strong></span><span>❤ <strong data-health>3</strong></span><strong class="boost-label" data-boost>BOOST</strong></div><canvas width="360" height="700" aria-label="赛车赛道"></canvas><div class="race-controls"><button class="pause-button" type="button">Ⅱ</button><button class="nitro-button" type="button">氮气 <span data-nitro>100</span>%</button></div></div>`
  const canvas = root.querySelector<HTMLCanvasElement>('canvas'); const ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return
  const engine = new RaceEngine(car, (snapshot) => { root.querySelector('[data-distance]')!.textContent = String(snapshot.distance); root.querySelector('[data-score]')!.textContent = snapshot.score.toLocaleString(); root.querySelector('[data-health]')!.textContent = String(snapshot.health); root.querySelector('[data-nitro]')!.textContent = String(snapshot.nitro); root.querySelector('[data-boost]')!.classList.toggle('active', snapshot.nitroActive); root.querySelector('.nitro-button')!.classList.toggle('active', snapshot.nitroActive); if (snapshot.feedback) showFeedback(root, snapshot.feedback); if (!snapshot.running) onFinish(snapshot) })
  let last = performance.now(); let steer = 0; let nitro = false
  const loop = (now: number): void => { engine.update(Math.min(.05, (now - last) / 1000)); last = now; const state = engine.getRenderState(); paintRace(ctx, canvas.clientWidth || 360, canvas.clientHeight || 700, car, state.playerX, state.items, state.elapsed, state.nitroActive); if (engine.getSnapshot().running) requestAnimationFrame(loop) }
  const setSteer = (event: PointerEvent): void => { const rect = canvas.getBoundingClientRect(); steer = ((event.clientX - rect.left) / rect.width) * 360 < 180 ? -1 : 1; engine.handleInput({ steer, nitro }) }
  canvas.addEventListener('pointerdown', setSteer); canvas.addEventListener('pointermove', (event) => { if (event.buttons) setSteer(event) })
  const key = (event: KeyboardEvent, pressed: boolean): void => { if (['ArrowLeft', 'a', 'A'].includes(event.key)) steer = pressed ? -1 : 0; if (['ArrowRight', 'd', 'D'].includes(event.key)) steer = pressed ? 1 : 0; if (event.code === 'Space') nitro = pressed; engine.handleInput({ steer, nitro }) }
  window.addEventListener('keydown', (event) => key(event, true)); window.addEventListener('keyup', (event) => key(event, false))
  const nitroButton = root.querySelector('.nitro-button'); nitroButton?.addEventListener('pointerdown', () => { nitro = true; engine.handleInput({ steer, nitro }) }); nitroButton?.addEventListener('pointerup', () => { nitro = false; engine.handleInput({ steer, nitro }) })
  root.querySelector('.pause-button')?.addEventListener('click', () => { if (engine.getSnapshot().paused) { engine.resume(); root.querySelector('.pause-button')!.textContent = 'Ⅱ' } else { engine.pause(); root.querySelector('.pause-button')!.textContent = '▶' } })
  document.addEventListener('visibilitychange', () => { if (document.hidden) engine.pause() })
  root.querySelector('.race-screen')?.addEventListener('dblclick', onExit)
  engine.start(); requestAnimationFrame(loop)
}

const showFeedback = (root: HTMLElement, feedback: FeedbackEvent): void => {
  const raceScreen = root.querySelector<HTMLElement>('.race-screen')
  if (!raceScreen) return
  const text = document.createElement('div')
  text.className = `floating-feedback ${feedback.type}`
  text.textContent = feedback.text
  raceScreen.append(text)
  window.setTimeout(() => text.remove(), 850)
  if (feedback.type === 'collision') {
    raceScreen.classList.remove('damage-flash')
    void raceScreen.offsetWidth
    raceScreen.classList.add('damage-flash')
    window.setTimeout(() => raceScreen.classList.remove('damage-flash'), 320)
  }
}
