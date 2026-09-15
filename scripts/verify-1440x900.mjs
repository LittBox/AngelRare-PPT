/**
 * verify-1440x900.mjs - 你的实际视口尺寸
 */
import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'verify-1440x900')
await fs.mkdir(OUT, { recursive: true })

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  // 你的实际视口
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
  const errors = []
  p.on('pageerror', e => errors.push('pageerror: ' + e.message))
  p.on('console', msg => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text())
  })

  await p.goto(`http://localhost:4182/`, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  console.log('=== 1440×900 (MacBook 13") 测试所有页 ===\n')
  for (let i = 0; i < 29; i++) {
    await p.evaluate((idx) => window.fullpage_api?.moveTo(idx), i)
    await new Promise(r => setTimeout(r, 600))
    const dump = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return { idx: 0, error: 'no active' }
      const wrapper = active.querySelector('.slide-canvas-wrapper')
      if (!wrapper) return { idx: 0, error: 'no wrapper' }
      const wr = wrapper.getBoundingClientRect()
      const op = window.getComputedStyle(active).opacity
      const v = window.getComputedStyle(active).visibility
      return {
        idx: parseInt(active.dataset.index) + 1,
        wrapper: `${wr.x.toFixed(0)},${wr.y.toFixed(0)},${wr.width.toFixed(0)}×${wr.height.toFixed(0)}`,
        inView: wr.x >= 0 && wr.y >= 0 && wr.x + wr.width <= window.innerWidth && wr.y + wr.height <= window.innerHeight,
        op, v,
        text: wrapper.innerText.slice(0, 30).replace(/\n/g, '|')
      }
    })
    const mark = dump.inView ? '✅' : '❌'
    if (i === 0 || i === 1 || i === 4 || i === 12 || i === 16 || i === 28 || !dump.inView) {
      console.log(`${mark} p${dump.idx}: wrapper=(${dump.wrapper}) op=${dump.op} v=${dump.v}  text="${dump.text}..."`)
      if (!dump.inView) console.log(`   ⚠️ 视口外！`)
    }
    // 每页都截图
    await p.screenshot({ path: path.join(OUT, `p${String(i + 1).padStart(2, '0')}.png`) })
  }
  if (errors.length) {
    console.log('\n⚠️ JS 错误:')
    errors.forEach(e => console.log('   ', e))
  } else {
    console.log('\n✅ 无 JS 错误')
  }
} finally {
  await b.close()
}
