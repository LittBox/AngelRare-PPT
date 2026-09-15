/**
 * debug-position.mjs
 * 调试 wrapper 位置 - 检查具体 transform 和 parent 状态
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

function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
      '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml'
    }
    const server = http.createServer(async (req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url)
      try {
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch (err) { res.writeHead(404); res.end('Not Found') }
    })
    server.listen(4176, () => resolve(server))
  })
}

async function debug() {
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
    await page.goto(`http://localhost:4176/`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.slide-canvas-wrapper')
    await new Promise(r => setTimeout(r, 2000))

    // 跳到第 2 页
    await page.evaluate(() => window.fullpage_api.moveTo(2))
    await new Promise(r => setTimeout(r, 1500))

    // 详细分析
    const debug = await page.evaluate(() => {
      const sections = document.querySelectorAll('.fp-section')
      const result = []
      sections.forEach((s, i) => {
        const w = s.querySelector('.slide-canvas-wrapper')
        const cs = window.getComputedStyle(s)
        const wcs = w ? window.getComputedStyle(w) : null
        result.push({
          index: i + 1,
          isActive: s.classList.contains('active'),
          section: {
            transform: cs.transform,
            top: cs.top,
            paddingTop: cs.paddingTop,
            height: cs.height,
            display: cs.display
          },
          wrapper: w ? {
            transform: wcs.transform,
            top: wcs.top,
            left: wcs.left,
            position: wcs.position,
            rect: w.getBoundingClientRect()
          } : null
        })
      })
      return result
    })

    // 只显示前 3 页和当前 active
    debug.forEach((d, i) => {
      if (i < 3 || d.isActive) {
        console.log(`\n=== 第 ${d.index} 页${d.isActive ? ' [ACTIVE]' : ''} ===`)
        console.log('section.transform:', d.section.transform)
        console.log('section.top:', d.section.top)
        console.log('section.paddingTop:', d.section.paddingTop)
        console.log('section.height:', d.section.height)
        console.log('section.display:', d.section.display)
        if (d.wrapper) {
          console.log('wrapper.transform:', d.wrapper.transform)
          console.log('wrapper.top:', d.wrapper.top)
          console.log('wrapper.left:', d.wrapper.left)
          console.log('wrapper.rect:', JSON.stringify(d.wrapper.rect))
        }
      }
    })
  } finally {
    await browser.close()
    server.close()
  }
}

debug().catch(err => {
  console.error('❌:', err)
  process.exit(1)
})
