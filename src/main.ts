import './styles/base.css'

const root = document.querySelector<HTMLDivElement>('#app')

if (!root) {
  throw new Error('App mount point is missing')
}

root.innerHTML = `
  <main class="game-shell">
    <section class="game-stage" aria-label="霓虹竞速游戏">
      <div id="screen" class="screen"></div>
    </section>
  </main>
`

const screen = document.querySelector<HTMLDivElement>('#screen')

if (!screen) {
  throw new Error('Screen mount point is missing')
}

screen.innerHTML = `
  <div class="hero-screen">
    <span class="eyebrow">NEON DRIVE / H5 ARCADE</span>
    <h1>霓虹竞速</h1>
    <p>选一辆属于你的赛车，在霓虹公路上冲得更远。</p>
    <button class="primary-button" type="button">开始游戏</button>
  </div>
`
