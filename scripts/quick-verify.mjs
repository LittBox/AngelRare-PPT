/**
 * quick-verify.mjs — 关键页面快速验证
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
const OUT = path.join(ROOT, 'export/screenshots/quick-verify')
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
await new Promise(r => s.listen(4190, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4190/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  const targets = [2, 5, 18, 21, 22, 25]
  const labels = { 2: 'P02-目录', 5: 'P05-调研', 18: 'P18-落地前景', 21: 'P21-团队精神', 22: 'P22-团队结构', 25: 'P25-致谢' }

  for (const idx of targets) {
    await p.evaluate((i) => window.fullpage_api && window.fullpage_api.moveTo(i), idx)
    await new Promise(r => setTimeout(r, 500))

    // 截图
    await p.screenshot({ path: path.join(OUT, labels[idx] + '.png') })

    // 检测文字溢出
    const overflow = await p.evaluate(() => {
      const issues = []
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        if ((style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') && rect.height > 0) {
          if (el.scrollHeight > rect.height + 2) {
            issues.push({ tag: el.tagName, class: el.className.slice(0, 40), scrollH: el.scrollHeight, clientH: Math.round(rect.height) })
          }
        }
      })
      return issues
    })

    // 检测照片
    const photos = await p.evaluate(() => {
      const imgs = document.querySelectorAll('img')
      return Array.from(imgs).map(img => ({
        src: img.src.split('/').pop().slice(0, 30),
        width: img.naturalWidth,
        height: img.naturalHeight,
        loaded: img.complete && img.naturalWidth > 0
      }))
    })

    console.log('\n' + labels[idx] + ':')
    if (overflow.length > 0) {
      console.log('  ⚠️  文字溢出:')
      overflow.slice(0, 3).forEach(o => console.log('    ' + o.tag + '.' + o.class + ' scrollH=' + o.scrollH + ' clientH=' + o.clientH))
    } else {
      console.log('  ✅ 无文字溢出')
    }
    const loadedPhotos = photos.filter(p => p.loaded)
    if (loadedPhotos.length > 0) {
      console.log('  ✅ 照片: ' + loadedPhotos.length + ' 张已加载')
      loadedPhotos.slice(0, 4).forEach(p => console.log('    ' + p.src + ' (' + p.width + 'x' + p.height + ')'))
    } else {
      console.log('  ⚠️  无照片')
    }
  }
  console.log('\n完成')
} finally {
  await b.close()
  s.close()
}
