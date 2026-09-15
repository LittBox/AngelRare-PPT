/**
 * capture-keys.mjs — 截关键页面
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
await new Promise(r => s.listen(4191, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4191/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  const targets = [
    { idx: 1, label: 'P02-目录' },
    { idx: 4, label: 'P05-调研深入' },
    { idx: 17, label: 'P18-落地前景' },
    { idx: 20, label: 'P21-团队精神' },
    { idx: 21, label: 'P22-团队结构' },
  ]

  for (const { idx, label } of targets) {
    await p.evaluate((i) => window.fullpage_api && window.fullpage_api.moveTo(i), idx)
    await new Promise(r => setTimeout(r, 600))
    await p.screenshot({ path: path.join(OUT, label + '.png') })
    console.log('截取 ' + label)
  }

  console.log('完成')
} finally {
  await b.close()
  s.close()
}
