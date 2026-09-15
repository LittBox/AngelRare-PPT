/**
 * check-p18.mjs — 单独检查 P18
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
const OUT = path.join(ROOT, 'export/screenshots/check')

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
await new Promise(r => s.listen(4192, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4192/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  // 直接去 P18
  await p.evaluate(() => window.fullpage_api && window.fullpage_api.moveTo(18))
  await new Promise(r => setTimeout(r, 1000))

  // 获取当前可见页面信息
  const info = await p.evaluate(() => {
    const active = document.querySelector('.section.active')
    if (!active) return { error: 'no active section' }
    const nav = active.querySelector('.badge')
    const slogan = active.querySelector('.slogan')
    const h1 = active.querySelector('h1')
    return {
      pageIndex: active.dataset.pageIndex,
      navTitle: active.dataset.navTitle,
      type: active.dataset.type,
      section: active.dataset.section,
      badge: nav ? nav.innerText.trim() : null,
      slogan: slogan ? slogan.innerText.trim() : null,
      h1: h1 ? h1.innerText.trim() : null,
      hasImage: active.querySelectorAll('img').length > 0,
      textContent: active.innerText.slice(0, 200)
    }
  })

  console.log('P18 当前可见页信息:', JSON.stringify(info, null, 2))
  await p.screenshot({ path: path.join(OUT, 'check-p18.png') })
  console.log('截图已保存')
} finally {
  await b.close()
  s.close()
}
