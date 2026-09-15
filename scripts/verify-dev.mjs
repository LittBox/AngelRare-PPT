/**
 * verify-dev.mjs
 * 在 dev 服务器上测试（更接近你的实际环境）
 */
import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'dev-server')

async function mk(dir) { await fs.mkdir(dir, { recursive: true }) }

async function test(viewport, port = 5174) {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const p = await b.newPage()
    await p.setViewport(viewport)
    const errors = []
    p.on('pageerror', e => errors.push('pageerror: ' + e.message))
    p.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()) })

    await p.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 3000))

    // 翻页到第 2、3、5、10、13 页
    const pages = [1, 2, 4, 9, 12]
    const results = []
    for (const idx of pages) {
      await p.evaluate((i) => window.fullpage_api?.moveTo(i), idx)
      await new Promise(r => setTimeout(r, 1200))
      const file = path.join(OUT, `${viewport.width}x${viewport.height}-p${idx + 1}.png`)
      await p.screenshot({ path: file })

      const dump = await p.evaluate(() => {
        const active = document.querySelector('.section.active')
        if (!active) return { error: 'no active' }
        const wrapper = active.querySelector('.slide-canvas-wrapper')
        if (!wrapper) return { error: 'no wrapper' }
        const wr = wrapper.getBoundingClientRect()
        return {
          idx: parseInt(active.dataset.index) + 1,
          wrapper: { x: wr.x.toFixed(0), y: wr.y.toFixed(0), w: wr.width.toFixed(0), h: wr.height.toFixed(0) },
          wrapperInView: wr.x >= 0 && wr.y >= 0 && wr.x + wr.width <= window.innerWidth && wr.y + wr.height <= window.innerHeight,
          opacity: window.getComputedStyle(active).opacity,
          textPreview: wrapper.innerText.slice(0, 30).replace(/\n/g, ' | ')
        }
      })
      results.push(dump)
    }
    return { viewport, results, errors }
  } finally {
    await b.close()
  }
}

async function main() {
  await mk(OUT)
  // 测试两个关键视口：用户可能的实际尺寸
  for (const v of [{ width: 1920, height: 1080 }, { width: 2560, height: 1440 }, { width: 1440, height: 900 }]) {
    const { results, errors } = await test(v)
    console.log(`\n=== ${v.width}×${v.height} ===`)
    if (errors.length) {
      console.log('⚠️ console errors:')
      errors.forEach(e => console.log('   ', e))
    }
    for (const r of results) {
      const mark = r.wrapperInView ? '✅' : '❌'
      console.log(`${mark} 第 ${r.idx} 页: opacity=${r.opacity} wrapper=(${r.wrapper.x},${r.wrapper.y},${r.wrapper.w},${r.wrapper.h})`)
      console.log(`   text: "${r.textPreview}"`)
    }
  }
}

main().catch(e => { console.error('❌', e); process.exit(1) })
