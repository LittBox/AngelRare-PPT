/**
 * verify-final.mjs
 * 验证自研翻页 + 新布局在所有常见视口下都正常
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
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'verify-final')

async function mk(dir) { await fs.mkdir(dir, { recursive: true }) }

function server() {
  return new Promise(resolve => {
    const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}
    const s = http.createServer(async (req, res) => {
      let fp = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url)
      try {
        const c = await fs.readFile(fp)
        res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
        res.end(c)
      } catch { res.writeHead(404); res.end('Not Found') }
    })
    s.listen(4182, () => resolve(s))
  })
}

async function test(viewport) {
  const s = await server()
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const p = await b.newPage()
    await p.setViewport(viewport)
    const errors = []
    p.on('pageerror', e => errors.push('pageerror: ' + e.message))
    p.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()) })

    await p.goto(`http://localhost:4182/`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 1500))

    // 切到第 2 页
    await p.evaluate(() => window.fullpage_api?.moveTo(1))
    await new Promise(r => setTimeout(r, 1200))

    const filePath = path.join(OUT, `${viewport.width}x${viewport.height}-p2.png`)
    await p.screenshot({ path: filePath })

    const dump = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return { error: 'no active section' }
      const wrapper = active.querySelector('.slide-canvas-wrapper')
      if (!wrapper) return { error: 'no wrapper' }
      const ar = active.getBoundingClientRect()
      const wr = wrapper.getBoundingClientRect()
      const wcs = window.getComputedStyle(wrapper)
      const wrapperOpacity = window.getComputedStyle(active).opacity
      const wrapperVisibility = window.getComputedStyle(active).visibility
      return {
        activeIndex: parseInt(active.dataset.index) + 1,
        section: { x: ar.x, y: ar.y, w: ar.width, h: ar.height, opacity: wrapperOpacity, visibility: wrapperVisibility },
        wrapper: { x: wr.x, y: wr.y, w: wr.width, h: wr.height, transform: wcs.transform },
        wrapperInView: wr.x >= 0 && wr.y >= 0 && wr.x + wr.width <= window.innerWidth && wr.y + wr.height <= window.innerHeight,
        textPreview: wrapper.innerText.slice(0, 30).replace(/\n/g, ' | '),
        totalSections: document.querySelectorAll('.section').length,
        visibleSections: document.querySelectorAll('.section.active').length
      }
    })

    return { viewport, filePath, dump, errors }
  } finally {
    await b.close(); s.close()
  }
}

async function main() {
  await mk(OUT)
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1680, height: 1050 }
  ]
  for (const v of viewports) {
    const { filePath, dump, errors } = await test(v)
    console.log(`\n=== ${v.width}×${v.height} ===`)
    if (errors.length) console.log('⚠️ errors:', errors)
    if (dump.error) {
      console.log('❌', dump.error)
    } else {
      console.log(`active section: idx=${dump.activeIndex} opacity=${dump.section.opacity} visibility=${dump.section.visibility}`)
      console.log(`section: x=${dump.section.x} y=${dump.section.y} w=${dump.section.w} h=${dump.section.h}`)
      console.log(`wrapper: x=${dump.wrapper.x.toFixed(0)} y=${dump.wrapper.y.toFixed(0)} w=${dump.wrapper.w.toFixed(0)} h=${dump.wrapper.h.toFixed(0)} inView=${dump.wrapperInView}`)
      console.log(`total sections=${dump.totalSections}, active=${dump.visibleSections}`)
      console.log(`text: "${dump.textPreview}"`)
      console.log('📸', filePath)
    }
  }
}

main().catch(e => { console.error('❌', e); process.exit(1) })
