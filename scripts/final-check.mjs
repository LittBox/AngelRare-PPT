/**
 * final-check.mjs - 最终验证：在真实 1920×1080 视口下截图关键页面
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
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'final-check')

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
    s.listen(4179, () => resolve(s))
  })
}

async function check() {
  await mk(OUT)
  const s = await server()
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const p = await b.newPage()
    // 用真实 1920×1080 视口
    await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
    await p.goto(`http://localhost:4179/`, { waitUntil: 'networkidle0' })
    await p.waitForSelector('.slide-canvas-wrapper')
    await new Promise(r => setTimeout(r, 2000))

    // 检查第一页 wrapper 位置
    const info = await p.evaluate(() => {
      const w = document.querySelector('.fp-section.active .slide-canvas-wrapper')
      if (!w) return { error: 'no wrapper' }
      const r = w.getBoundingClientRect()
      return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    console.log('第 1 页 wrapper:', JSON.stringify(info))

    // 截图关键页面
    const pages = [1, 2, 3, 4, 7, 13, 17, 22, 29]
    for (const n of pages) {
      await p.evaluate(num => window.fullpage_api?.moveTo(num), n)
      await new Promise(r => setTimeout(r, 1000))
      const fp = path.join(OUT, `p${String(n).padStart(2,'0')}.png`)
      await p.screenshot({ path: fp })
      console.log(`第 ${n} 页 ✅`)
    }
    console.log('\n✅ 完成！截图目录:', OUT)
  } finally {
    await b.close(); s.close()
  }
}

check().catch(e => { console.error('❌', e); process.exit(1) })
