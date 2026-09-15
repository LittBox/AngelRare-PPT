/**
 * check-errors.mjs
 * 检查浏览器控制台错误
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
    server.listen(4177, () => resolve(server))
  })
}

async function check() {
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  try {
    const page = await browser.newPage()

    // 捕获控制台消息
    const logs = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push({ type: 'ERROR', text: msg.text() })
      } else if (msg.type() === 'warning') {
        logs.push({ type: 'WARN', text: msg.text() })
      }
    })

    page.on('pageerror', err => {
      logs.push({ type: 'PAGE_ERROR', text: err.message })
    })

    await page.goto(`http://localhost:4177/`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await new Promise(r => setTimeout(r, 3000))

    // 检查 DOM 状态
    const domState = await page.evaluate(() => {
      return {
        bodyHasChildren: document.body.children.length > 0,
        appMounted: !!document.querySelector('#app > *'),
        hasPresentation: !!document.querySelector('.presentation'),
        hasSection: !!document.querySelector('.section'),
        hasWrapper: !!document.querySelector('.slide-canvas-wrapper'),
        hasFullpageCSS: !!document.querySelector('.fp-watermark, .fp-section, .fp-table'),
        appInnerHTML: document.querySelector('#app')?.innerHTML?.slice(0, 200),
        bodyChildren: document.body.children.length
      }
    })

    console.log('=== DOM 状态 ===')
    Object.entries(domState).forEach(([k, v]) => {
      console.log(`  ${k}: ${JSON.stringify(v)}`)
    })

    console.log('\n=== 控制台消息 ===')
    if (logs.length === 0) {
      console.log('  无错误/警告')
    } else {
      logs.forEach(l => console.log(`  [${l.type}] ${l.text.slice(0, 200)}`))
    }

    // 截图
    await page.screenshot({ path: '/tmp/check-errors.png' })
    console.log('\n📸 截图已保存: /tmp/check-errors.png')
  } finally {
    await browser.close()
    server.close()
  }
}

check().catch(err => {
  console.error('❌:', err)
  process.exit(1)
})
