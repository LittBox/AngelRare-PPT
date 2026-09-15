/**
 * capture-final.mjs — 截最终关键页面（修正索引）
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
const OUT = path.join(ROOT, 'export/screenshots/final-keys')
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
await new Promise(r => s.listen(4193, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4193/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  // 关键页面：P02=2, P05=5, P18=17, P21=20, P22=21
  const targets = [
    { idx: 2, label: 'P02-目录' },
    { idx: 5, label: 'P05-调研深入' },
    { idx: 17, label: 'P18-落地前景' },
    { idx: 20, label: 'P21-团队精神' },
    { idx: 21, label: 'P22-团队结构' },
  ]

  for (const { idx, label } of targets) {
    await p.evaluate((i) => window.fullpage_api && window.fullpage_api.moveTo(i), idx)
    await new Promise(r => setTimeout(r, 800))

    const info = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return { error: 'no active' }
      const badge = active.querySelector('.badge')
      const slogan = active.querySelector('.slogan')
      const h1 = active.querySelector('h1')
      const imgs = Array.from(active.querySelectorAll('img'))
      return {
        pageIndex: active.dataset.pageIndex,
        navTitle: active.dataset.navTitle,
        badge: badge ? badge.innerText.trim() : null,
        slogan: slogan ? slogan.innerText.trim() : null,
        h1: h1 ? h1.innerText.trim() : null,
        imgCount: imgs.length,
        imgSrcs: imgs.slice(0, 3).map(img => img.src.split('/').pop().slice(0, 20))
      }
    })

    await p.screenshot({ path: path.join(OUT, label + '.png') })
    console.log(label + ' -> pageIndex=' + info.pageIndex + ' navTitle="' + info.navTitle + '" badge="' + info.badge + '" imgs=' + info.imgCount)
  }

  console.log('\n完成')
} finally {
  await b.close()
  s.close()
}
