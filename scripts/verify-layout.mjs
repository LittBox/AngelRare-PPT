/**
 * verify-layout.mjs
 * 用 Puppeteer 在不同分辨率下截图，验证 PPT 布局是否正确
 *
 * 验证场景：
 * 1. 1920×1080 (16:9 标准)
 * 2. 2560×1440 (16:9 2K)
 * 3. 1440×900 (16:10 笔记本)
 * 4. 1366×768 (16:9 笔记本)
 * 5. 3440×1440 (21:9 超宽屏)
 *
 * 验收：幻灯片始终 16:9 居中，超宽屏只允许出现居中黑边
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
const OUTPUT_DIR = path.join(ROOT_DIR, 'export', 'screenshots', 'layout-verify')

const VIEWPORTS = [
  { name: '1920x1080-16x9', w: 1920, h: 1080 },
  { name: '2560x1440-16x9-2K', w: 2560, h: 1440 },
  { name: '1440x900-16x10', w: 1440, h: 900 },
  { name: '1366x768-16x9-laptop', w: 1366, h: 768 },
  { name: '3440x1440-21x9-ultrawide', w: 3440, h: 1440 }
]

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

/**
 * 启动一个简单的静态文件服务器服务于 dist/
 */
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
    server.listen(4173, () => resolve(server))
  })
}

async function verify() {
  console.log('🔍 开始布局验证...\n')
  await ensureDir(OUTPUT_DIR)

  // 启动 HTTP 服务器
  const server = await startServer()
  console.log('🌐 HTTP 服务器已启动: http://localhost:4173/\n')

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

    try {
      for (const vp of VIEWPORTS) {
        const page = await browser.newPage()
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 })
        await page.goto(`http://localhost:4173/`, { waitUntil: 'networkidle0', timeout: 30000 })

        // 等待 fullpage 初始化完成 + 第一页内容渲染
        await page.waitForSelector('.slide-canvas-wrapper', { timeout: 10000 })
        await page.waitForSelector('.fp-section.active', { timeout: 10000 })
        // 再等一下让字体/动画稳定
        await new Promise(r => setTimeout(r, 2500))

        // 强制 fullpage 跳到第 1 页并触发重绘
        await page.evaluate(() => {
          if (window.fullpage_api) {
            window.fullpage_api.moveTo(1)
          }
        })
        await new Promise(r => setTimeout(r, 1500))

    // 计算预期缩放比例
    const expectedScale = Math.min(vp.w / 1920, vp.h / 1080)
    const slideW = 1920 * expectedScale
    const slideH = 1080 * expectedScale
    const slideX = (vp.w - slideW) / 2
    const slideY = (vp.h - slideH) / 2

    // 用 JS 测量实际位置
    const measurement = await page.evaluate(() => {
      // 调试：看实际 DOM 里有什么
      const allSections = document.querySelectorAll('.section').length
      const allWrappers = document.querySelectorAll('.slide-canvas-wrapper').length
      const fpSections = document.querySelectorAll('.fp-section').length
      const fpWrappers = document.querySelectorAll('.fp-slide').length

      const wrapper = document.querySelector('.slide-canvas-wrapper')
      if (!wrapper) return { allSections, allWrappers, fpSections, fpWrappers, debug: 'no wrapper' }

      const rect = wrapper.getBoundingClientRect()
      const computed = window.getComputedStyle(wrapper)
      return {
        allSections, allWrappers, fpSections, fpWrappers,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        transform: computed.transform,
        bodyW: document.body.clientWidth,
        bodyH: document.body.clientHeight,
        winW: window.innerWidth,
        winH: window.innerHeight
      }
    })

    console.log(`📐 ${vp.name}`)
    console.log(`   视口: ${vp.w}×${vp.h}`)
    console.log(`   预期 scale: ${expectedScale.toFixed(4)}`)
    console.log(`   预期位置: x=${slideX.toFixed(1)}, y=${slideY.toFixed(1)}, size=${slideW.toFixed(0)}×${slideH.toFixed(0)}`)
    if (measurement && measurement.x !== undefined) {
      console.log(`   实际位置: x=${measurement.x.toFixed(1)}, y=${measurement.y.toFixed(1)}, size=${measurement.width.toFixed(0)}×${measurement.height.toFixed(0)}`)
      console.log(`   transform: ${measurement.transform ? measurement.transform.slice(0, 80) : 'none'}...`)
      console.log(`   DOM 元素数: section=${measurement.allSections}, wrapper=${measurement.allWrappers}, fp-section=${measurement.fpSections}, fp-slide=${measurement.fpWrappers}`)
      // 校验居中
      const dx = Math.abs(measurement.x - slideX)
      const dy = Math.abs(measurement.y - slideY)
      if (dx < 2 && dy < 2) {
        console.log(`   ✅ 居中正确`)
      } else {
        console.log(`   ❌ 居中偏移 dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}`)
      }
    } else {
      console.log(`   ❌ 未找到 .slide-canvas-wrapper`)
      console.log(`   debug:`, JSON.stringify(measurement))
    }

    // 截图
    const screenshotPath = path.join(OUTPUT_DIR, `${vp.name}.png`)
    await page.screenshot({ path: screenshotPath })
    console.log(`   📸 截图: ${screenshotPath}\n`)

      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log('\n✅ 验证完成！截图目录：', OUTPUT_DIR)
}

verify().catch(err => {
  console.error('❌ 验证失败:', err)
  process.exit(1)
})
