import type { PlayerSave } from '../types'

export const renderHome = (root: HTMLElement, save: PlayerSave, onStart: () => void): void => {
  root.innerHTML = `<div class="hero-screen"><span class="eyebrow">NEON DRIVE / H5 ARCADE</span><h1>霓虹竞速</h1><p>选一辆属于你的赛车，在霓虹公路上冲得更远。</p><div class="score-pill">最高分 <strong>${save.bestScore.toLocaleString()}</strong></div><button class="primary-button" type="button">开始游戏</button><small class="control-hint">电脑：方向键 / A D　手机：拖动赛车</small></div>`
  root.querySelector('button')?.addEventListener('click', onStart)
}
