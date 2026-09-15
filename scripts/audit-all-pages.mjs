/**
 * audit-all-pages.mjs
 * 全页截图审计：检查文字裁切 / 布局问题 / 素材引用
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
const OUT = path.join(ROOT, 'export/screenshots/audit-all')

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
await new Promise(r => s.listen(4189, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080 })
  await p.goto('http://localhost:4189/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  const slides = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('.section')).map(s => ({
      pageIndex: parseInt(s.dataset.pageIndex),
      type: s.dataset.type,
      section: s.dataset.section || '',
      navTitle: s.dataset.navTitle || ''
    }))
  })

  console.log('总页数:', slides.length)

  for (let i = 0; i < slides.length; i++) {
    await p.evaluate((idx) => window.fullpage_api && window.fullpage_api.moveTo(idx), i)
    await new Promise(r => setTimeout(r, 500))

    const pi = String(i + 1).padStart(2, '0')
    await p.screenshot({ path: path.join(OUT, 'p' + pi + '.png') })

    // 检查文字溢出
    const overflowInfo = await p.evaluate(() => {
      const issues = []
      const allText = document.querySelectorAll('*')

      // 查找被裁切的文字容器（overflow hidden + 固定高度）
      allText.forEach(el => {
        const style = window.getComputedStyle(el)
        const rect = el.getBoundingClientRect()

        if (style.overflow === 'hidden' || style.overflowX === 'hidden') {
          const scrollH = el.scrollHeight
          const clientH = el.clientHeight
          if (scrollH > clientH && clientH > 0) {
            issues.push({
              tag: el.tagName,
              className: el.className.slice(0, 60),
              overflow: style.overflow,
              scrollH,
              clientH,
              diff: scrollH - clientH
            })
          }
        }
      })
      return issues
    })

    const dump = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return null

      // 查找所有文字元素
      const texts = Array.from(active.querySelectorAll('[class*="text"], [class*="content"], [class*="body"], [class*="desc"], h1, h2, h3, p, span')).slice(0, 30)
      return texts.map(el => ({
        tag: el.tagName,
        className: el.className.slice(0, 50),
        innerText: el.innerText.slice(0, 80),
        rect: (() => {
          const r = el.getBoundingClientRect()
          return { w: Math.round(r.width), h: Math.round(r.height), overflowX: window.getComputedStyle(el).overflowX }
        })()
      }))
    })

    console.log('\nP' + pi + ' [' + slides[i].type + '] ' + slides[i].navTitle)
    if (overflowInfo.length > 0) {
      console.log('  ⚠️ 溢出裁切检测:')
      overflowInfo.forEach(o => console.log('    ' + o.tag + '.' + o.className + ' scrollH=' + o.scrollH + ' clientH=' + o.clientH + ' diff=' + o.diff))
    } else {
      console.log('  ✓ 无溢出')
    }
    if (dump) {
      // 只打印关键文字
      dump.filter(d => d.innerText.trim()).slice(0, 8).forEach(d => {
        const truncated = d.innerText.length > 60 ? d.innerText.slice(0, 60) + '...' : d.innerText
        console.log('  ' + d.tag + ' "' + truncated + '"')
      })
    }

    // 每5页汇报一次
    if ((i + 1) % 5 === 0) console.log('\n--- 已审查 ' + (i + 1) + ' / ' + slides.length + ' 页 ---')
  }

  console.log('\n全页审计完成。截图已保存至 ' + OUT)
} finally {
  await b.close()
  s.close()
}
