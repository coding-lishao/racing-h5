import type { PlayerSave, RaceSnapshot } from '../types'

export const renderResult = (root: HTMLElement, snapshot: RaceSnapshot, save: PlayerSave, onAgain: () => void, onGarage: () => void): void => {
  root.innerHTML = `<div class="result-screen"><span class="eyebrow">RACE COMPLETE</span><h2>冲得漂亮</h2><div class="result-score">${snapshot.score.toLocaleString()}<small>分</small></div><div class="result-grid"><span>行驶距离<strong>${snapshot.distance}m</strong></span><span>本局金币<strong>+${snapshot.coins}</strong></span><span>最高分<strong>${save.bestScore.toLocaleString()}</strong></span></div><button class="primary-button wide" type="button">再来一局</button><button class="ghost-button" type="button">返回车库</button></div>`
  const buttons = root.querySelectorAll('button'); buttons[0]?.addEventListener('click', onAgain); buttons[1]?.addEventListener('click', onGarage)
}
