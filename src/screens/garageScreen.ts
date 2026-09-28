import type { CarDefinition, PlayerSave } from '../types'

export const renderGarage = (root: HTMLElement, cars: CarDefinition[], save: PlayerSave, selectedId: string, onSelect: (id: string) => void, onStart: () => void): void => {
  root.innerHTML = `<div class="garage-screen"><div class="screen-top"><div><span class="eyebrow">GARAGE</span><h2>选择赛车</h2></div><span class="coin-count">◈ ${save.coins}</span></div><div class="car-grid">${cars.map((car) => { const unlocked = save.unlockedCarIds.includes(car.id); return `<button class="car-card ${car.id === selectedId ? 'selected' : ''} ${unlocked ? '' : 'locked'}" data-car="${car.id}" type="button" ${unlocked ? '' : 'disabled'}><span class="mini-car" style="--car:${car.color};--accent:${car.accent}"></span><strong>${car.name}</strong><small>${unlocked ? car.subtitle : `收集 ${car.unlockCoins} 金币解锁`}</small><span class="stats">速 ${car.speed}　控 ${car.handling}　冲 ${car.acceleration}</span></button>` }).join('')}</div><button class="primary-button wide" type="button">开始比赛</button></div>`
  root.querySelectorAll<HTMLButtonElement>('[data-car]').forEach((button) => button.addEventListener('click', () => { const id = button.dataset.car ?? selectedId; onSelect(id); renderGarage(root, cars, save, id, onSelect, onStart) }))
  root.querySelector('.primary-button')?.addEventListener('click', onStart)
}
