/**
 * verify-all-pages.mjs
 * 截图全部 29 页，找出哪一页有问题
 */
import puppeteer from 'puppeteer'
import path from 'node:path'
import fs from 'node:fs/promises'
import http from 'node:http'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const OUTPUT_DIR = path.join(ROOT_DIR, 'export', 'screenshots', 'all-pages')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml'
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
    server.listen(4175, () => resolve(server))
  })
}

async function verify() {
  console.log('📑 截图全部 29 页...\n')
  await ensureDir(OUTPUT_DIR)
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
    await page.goto(`http://localhost:4175/`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.slide-canvas-wrapper')
    await new Promise(r => setTimeout(r, 2000))

    for (let i = 1; i <= 29; i++) {
      await page.evaluate((num) => {
        if (window.fullpage_api) window.fullpage_api.moveTo(num)
      }, i)
      await new Promise(r => setTimeout(r, 800))

      // 检测当前激活页和文字量
      const stats = await page.evaluate(() => {
        const active = document.querySelector('.fp-section.active')
        if (!active) return { error: 'no active section' }
        const wrapper = active.querySelector('.slide-canvas-wrapper')
        if (!wrapper) return { error: 'no wrapper in active' }
        // 检查 wrapper 在视口内是否可见
        const rect = wrapper.getBoundingClientRect()
        const inViewport = rect.x >= -10 && rect.y >= -10 &&
                          rect.x + rect.width <= window.innerWidth + 10 &&
                          rect.y + rect.height <= window.innerHeight + 10
        return {
          textLength: wrapper.innerText.trim().length,
          preview: wrapper.innerText.trim().slice(0, 40),
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
          inViewport,
          activeTransform: active.style.transform || window.getComputedStyle(active).transform.slice(0, 60)
        }
      })

      const screenshotPath = path.join(OUTPUT_DIR, `page-${String(i).padStart(2, '0')}.png`)
      await page.screenshot({ path: screenshotPath })

      const status = stats.error
        ? `❌ ${stats.error}`
        : stats.textLength < 5
          ? `⚠️  无内容`
          : stats.inViewport
            ? `✅ ${stats.textLength}字`
            : `⚠️  离屏 (${stats.rect.x.toFixed(0)},${stats.rect.y.toFixed(0)})`
      console.log(`  第 ${String(i).padStart(2)} 页 ${status} - "${stats.preview || ''}"`)
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log('\n✅ 完成，截图目录:', OUTPUT_DIR)
}

verify().catch(err => {
  console.error('❌ 失败:', err)
  process.exit(1)
})
