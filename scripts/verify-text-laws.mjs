/**
 * verify-text-laws.mjs - 截图所有页验证文案铁律视觉
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
const OUT = path.join(ROOT, 'export/screenshots/text-laws-verify')
await fs.mkdir(OUT, { recursive: true })

const s = http.createServer(async (req, res) => {
  const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}
  let fp = path.join(DIST, req.url === '/' ? '/index.html' : req.url)
  try {
    const c = await fs.readFile(fp)
    res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
    res.end(c)
  } catch { res.writeHead(404); res.end('NF') }
})
await new Promise(r => s.listen(4185, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900 })
  const errors = []
  p.on('pageerror', e => errors.push(e.message))

  await p.goto(`http://localhost:4185/`, { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  console.log('=== 截图所有页 ===\n')
  for (let i = 0; i < 29; i++) {
    await p.evaluate((idx) => window.fullpage_api?.moveTo(idx), i)
    await new Promise(r => setTimeout(r, 500))
    const dump = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return null
      const badge = active.querySelector('.badge')
      const slogan = active.querySelector('.slogan')
      return {
        badge: badge?.innerText?.trim() || '(无)',
        slogan: slogan?.innerText?.trim() || '(无)',
        sloganFontSize: slogan ? window.getComputedStyle(slogan).fontSize : '?'
      }
    })
    const mark = (dump && dump.slogan !== '(无)' && dump.badge !== '(无)') ? '✅' : '⚠️'
    console.log(`${mark} p${i + 1}: badge="${dump?.badge}" slogan="${dump?.slogan?.slice(0, 30)}" (${dump?.sloganFontSize})`)
    await p.screenshot({ path: path.join(OUT, `p${String(i + 1).padStart(2, '0')}.png`) })
  }

  if (errors.length) console.log('\n⚠️ 错误:', errors)
  else console.log('\n✅ 无 JS 错误')
} finally {
  await b.close()
  s.close()
}
