import './styles/base.css'
import './styles/game.css'
import { cars } from './data/cars'
import { loadSave, saveSave } from './data/storage'
import { renderGarage } from './screens/garageScreen'
import { renderHome } from './screens/homeScreen'
import { renderRace } from './screens/raceScreen'
import { renderResult } from './screens/resultScreen'
import type { GameScreen, PlayerSave, RaceSnapshot } from './types'

const root = document.querySelector<HTMLDivElement>('#app')
if (!root) throw new Error('App mount point is missing')
root.innerHTML = '<main class="game-shell"><section class="game-stage" aria-label="霓虹竞速游戏"><div id="screen" class="screen"></div></section></main>'
const screen = document.querySelector<HTMLDivElement>('#screen')
if (!screen) throw new Error('Screen mount point is missing')
let save: PlayerSave = loadSave()
let selectedCarId = save.unlockedCarIds[0] ?? cars[0].id
let currentScreen: GameScreen = 'home'
const showHome = (): void => { currentScreen = 'home'; renderHome(screen, save, showGarage) }
const showGarage = (): void => { currentScreen = 'garage'; renderGarage(screen, cars, save, selectedCarId, (carId) => { selectedCarId = carId }, showRace) }
const showRace = (): void => { currentScreen = 'race'; const car = cars.find((item) => item.id === selectedCarId) ?? cars[0]; renderRace(screen, car, finishRace, showGarage) }
const finishRace = (snapshot: RaceSnapshot): void => { if (currentScreen !== 'race') return; currentScreen = 'result'; save = { bestScore: Math.max(save.bestScore, snapshot.score), coins: save.coins + snapshot.coins, unlockedCarIds: [...save.unlockedCarIds] }; cars.forEach((car) => { if (save.coins >= car.unlockCoins && !save.unlockedCarIds.includes(car.id)) save.unlockedCarIds.push(car.id) }); saveSave(save); renderResult(screen, snapshot, save, showRace, showGarage) }
showHome()
