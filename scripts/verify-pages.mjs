/**
 * verify-pages.mjs
 * 逐页切换 PPT 截图，验证每页都有内容
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
const OUTPUT_DIR = path.join(ROOT_DIR, 'export', 'screenshots', 'pages-verify')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function startServer() {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    }
    const server = http.createServer(async (req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url)
      try {
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch (err) {
        res.writeHead(404)
        res.end('Not Found')
      }
    })
    server.listen(4174, () => resolve(server))
  })
}

async function verify() {
  console.log('📑 逐页验证 PPT 内容...\n')
  await ensureDir(OUTPUT_DIR)

  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
    await page.goto(`http://localhost:4174/`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('.slide-canvas-wrapper')
    await new Promise(r => setTimeout(r, 2000))

    // 检查 fullpage_api 是否存在
    const hasApi = await page.evaluate(() => typeof window.fullpage_api !== 'undefined')
    console.log(`🌐 fullpage_api 可用: ${hasApi}\n`)

    // 检查每页是否有内容
    const pageStats = await page.evaluate(() => {
      const sections = document.querySelectorAll('.fp-section')
      return Array.from(sections).map((s, i) => {
        const wrapper = s.querySelector('.slide-canvas-wrapper')
        if (!wrapper) return { index: i + 1, hasWrapper: false }
        // 检查 wrapper 内是否有实际的 Vue 组件渲染内容
        const text = wrapper.innerText.trim()
        const html = wrapper.innerHTML
        const hasContent = text.length > 10  // 至少有一些文字
        return {
          index: i + 1,
          hasWrapper: true,
          hasContent,
          textLength: text.length,
          textPreview: text.slice(0, 60),
          htmlLength: html.length
        }
      })
    })

    console.log(`📊 共 ${pageStats.length} 页内容检查：\n`)
    pageStats.forEach(p => {
      if (!p.hasWrapper) {
        console.log(`  第 ${String(p.index).padStart(2)} 页: ❌ 无 wrapper`)
      } else if (!p.hasContent) {
        console.log(`  第 ${String(p.index).padStart(2)} 页: ⚠️  无文字内容`)
      } else {
        console.log(`  第 ${String(p.index).padStart(2)} 页: ✅ ${p.textLength} 字 - "${p.textPreview}..."`)
      }
    })

    // 截图前 5 页 + 最后 1 页
    const pagesToScreenshot = [1, 2, 3, 4, 5, 7, 13, 17, 22, 29]
    for (const pageNum of pagesToScreenshot) {
      await page.evaluate((num) => {
        if (window.fullpage_api) window.fullpage_api.moveTo(num)
      }, pageNum)
      await new Promise(r => setTimeout(r, 1500))

      const activeText = await page.evaluate(() => {
        const active = document.querySelector('.fp-section.active .slide-canvas-wrapper')
        return active ? active.innerText.slice(0, 80) : 'NONE'
      })

      const screenshotPath = path.join(OUTPUT_DIR, `page-${String(pageNum).padStart(2, '0')}.png`)
      await page.screenshot({ path: screenshotPath })
      console.log(`\n📸 第 ${pageNum} 页 截图: ${screenshotPath}`)
      console.log(`   文字预览: "${activeText}"`)
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log('\n✅ 完成')
}

verify().catch(err => {
  console.error('❌ 失败:', err)
  process.exit(1)
})
