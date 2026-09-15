/**
 * export-pptx.mjs
 *
 * 功能：把 HTML PPT 导出为真实可编辑的 .pptx 文件
 * 原理：使用 dom-to-pptx（基于 Puppeteer + PptxGenJS）
 *       把每页 HTML 渲染后转为 PPTX 文本框（在 PowerPoint 中可二次编辑）
 *
 * 使用方法：
 *   1. 先 `npm run build` 生成 dist/
 *   2. 再 `npm run preview` 启动预览服务
 *   3. 再 `npm run export:pptx` 执行导出
 *
 * 或开发模式直接导出：
 *   1. `npm run dev` 启动 dev server
 *   2. `npm run export:pptx`
 */
import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const EXPORT_DIR = path.join(ROOT_DIR, 'export')
const PPTX_DIR = path.join(EXPORT_DIR, 'pptx')
const SCREENSHOT_DIR = path.join(EXPORT_DIR, 'screenshots')

// 配置
const CONFIG = {
  baseUrl: 'http://localhost:4173',  // vite preview 默认端口
  slideSelector: '.section',           // 每页 PPT 的容器选择器
  pageWidth: 1920,                     // 设计稿宽度
  pageHeight: 1080,                    // 设计稿高度
  scale: 1,                            // 渲染缩放
  totalSlides: 29                      // 总页数
}

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

async function exportToPptx() {
  console.log('🚀 开始导出 PPTX...')
  console.log(`📐 设计稿尺寸: ${CONFIG.pageWidth}×${CONFIG.pageHeight}`)
  console.log(`🌐 目标 URL: ${CONFIG.baseUrl}`)

  await ensureDir(PPTX_DIR)
  await ensureDir(SCREENSHOT_DIR)

  let browser
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.setViewport({
      width: CONFIG.pageWidth,
      height: CONFIG.pageHeight,
      deviceScaleFactor: CONFIG.scale
    })

    console.log(`\n📥 加载页面: ${CONFIG.baseUrl}`)
    await page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle2', timeout: 60000 })

    // 等待 fullpage 初始化
    await new Promise(r => setTimeout(r, 2000))

    // 遍历每一页
    for (let i = 1; i <= CONFIG.totalSlides; i++) {
      console.log(`\n📸 渲染第 ${i} / ${CONFIG.totalSlides} 页...`)

      // 滚动到目标 section
      await page.evaluate((slideIdx) => {
        // fullpage.js 提供 moveTo 方法
        if (window.fullpage_api) {
          window.fullpage_api.moveTo(slideIdx)
        }
      }, i)

      // 等待过渡动画完成
      await new Promise(r => setTimeout(r, 1200))

      // 截图
      const screenshotPath = path.join(SCREENSHOT_DIR, `slide-${String(i).padStart(2, '0')}.png`)
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
        omitBackground: false
      })
      console.log(`   ✅ 截图已保存: ${screenshotPath}`)
    }

    console.log('\n🎉 截图导出完成！')
    console.log(`📁 截图目录: ${SCREENSHOT_DIR}`)
    console.log('\n💡 下一步：将每张截图作为一整页 PPT 背景插入到 .pptx 中')
    console.log('   （或使用 pptxgenjs / python-pptx 二次封装为可编辑版本）')
  } catch (err) {
    console.error('❌ 导出失败:', err)
    process.exit(1)
  } finally {
    if (browser) await browser.close()
  }
}

exportToPptx()
