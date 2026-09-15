/**
 * verify-1440x900-final.mjs - 你的实际视口尺寸
 */
import puppeteer from 'puppeteer'
import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'verify-1440x900-final')
await fs.mkdir(OUT, { recursive: true })

const s = http.createServer(async (req, res) => {
  const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}
  let fp = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url)
  try {
    const c = await fs.readFile(fp)
    res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
    res.end(c)
  } catch { res.writeHead(404); res.end('Not Found') }
})
await new Promise(r => s.listen(4183, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  const errors = []
  p.on('pageerror', e => errors.push('pageerror: ' + e.message))
  p.on('console', msg => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text())
  })

  await p.goto(`http://localhost:4183/`, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  console.log('=== 1440×900 (MacBook 13") 测试所有页 ===\n')
  const failures = []
  for (let i = 0; i < 29; i++) {
    await p.evaluate((idx) => window.fullpage_api?.moveTo(idx), i)
    await new Promise(r => setTimeout(r, 500))
    const dump = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return { idx: 0, error: 'no active' }
      const wrapper = active.querySelector('.slide-canvas-wrapper')
      if (!wrapper) return { idx: 0, error: 'no wrapper' }
      const wr = wrapper.getBoundingClientRect()
      const op = window.getComputedStyle(active).opacity
      return {
        idx: parseInt(active.dataset.index) + 1,
        x: wr.x.toFixed(0), y: wr.y.toFixed(0), w: wr.width.toFixed(0), h: wr.height.toFixed(0),
        inView: wr.x >= 0 && wr.y >= 0 && wr.x + wr.width <= window.innerWidth && wr.y + wr.height <= window.innerHeight,
        op,
        text: wrapper.innerText.slice(0, 30).replace(/\n/g, '|')
      }
    })
    const mark = dump.inView && dump.op === '1' ? '✅' : '❌'
    if (!dump.inView || dump.op !== '1') {
      failures.push(dump)
      console.log(`${mark} p${dump.idx}: x=${dump.x} y=${dump.y} w=${dump.w} h=${dump.h} op=${dump.op} text="${dump.text}..."`)
    } else {
      console.log(`${mark} p${dump.idx}`)
    }
    await p.screenshot({ path: path.join(OUT, `p${String(i + 1).padStart(2, '0')}.png`) })
  }
  if (errors.length) {
    console.log('\n⚠️ JS 错误:')
    errors.forEach(e => console.log('   ', e))
  } else {
    console.log('\n✅ 无 JS 错误')
  }
  console.log(`\n失败数: ${failures.length} / 29`)
} finally {
  await b.close()
  s.close()
}
