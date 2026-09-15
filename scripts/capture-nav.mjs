/**
 * capture-nav.mjs - 单独截右侧导航圆点特写
 */
import puppeteer from 'puppeteer'
import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const OUT = path.join(ROOT, 'export/screenshots/nav-detail')

await fs.mkdir(OUT, { recursive: true })

const s = http.createServer(async (req, res) => {
  const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css'}
  let fp = path.join(DIST, req.url === '/' ? '/index.html' : req.url)
  try {
    const c = await fs.readFile(fp)
    res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
    res.end(c)
  } catch { res.writeHead(404); res.end('NF') }
})
await new Promise(r => s.listen(4188, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4188/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  // 截完整 1920x1080 看右侧导航
  await p.screenshot({ path: path.join(OUT, 'full-with-nav.png') })

  // 截右侧 200x1080 区域
  await p.screenshot({
    path: path.join(OUT, 'nav-zoom.png'),
    clip: { x: 1700, y: 0, width: 220, height: 1080 }
  })

  console.log('NAV screenshots saved')
} finally {
  await b.close()
  s.close()
}
