/**
 * fullpage 黑屏诊断
 * 检查 fullpage 初始化后各 section 的 display 和 visibility
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
    server.listen(4178, () => resolve(server))
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
    await page.goto(`http://localhost:4178/`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 3000))

    // 检查 fullpage 初始化状态
    const state = await page.evaluate(() => {
      const sections = document.querySelectorAll('.section')
      const results = []
      sections.forEach((s, i) => {
        const cs = window.getComputedStyle(s)
        const wrapper = s.querySelector('.slide-canvas-wrapper')
        results.push({
          index: i + 1,
          isActive: s.classList.contains('active'),
          display: cs.display,
          visibility: cs.visibility,
          opacity: cs.opacity,
          transform: cs.transform,
          wrapperDisplay: wrapper ? window.getComputedStyle(wrapper).display : 'none',
          wrapperVisibility: wrapper ? window.getComputedStyle(wrapper).visibility : 'none',
          wrapperOpacity: wrapper ? window.getComputedStyle(wrapper).opacity : 'none',
          wrapperInView: wrapper ? (() => {
            const r = wrapper.getBoundingClientRect()
            return { x: r.x, y: r.y, w: r.width, h: r.height }
          })() : null
        })
      })

      // 检查 fullpage 是否正确初始化
      const fpLoaded = !!document.querySelector('.fp-enabled')
      const fpWrapper = !!document.querySelector('.fullpage-wrapper')
      const fpNav = !!document.querySelector('#fp-nav')
      const jsErrors = []

      return { sections: results, fpLoaded, fpWrapper, fpNav, jsErrors }
    })

    console.log('=== fullpage 状态 ===')
    console.log('fp-enabled:', state.fpLoaded)
    console.log('fullpage-wrapper:', state.fpWrapper)
    console.log('fp-nav:', state.fpNav)
    console.log('')

    // 只显示前 5 页和 active
    state.sections.slice(0, 5).forEach(s => {
      const marker = s.isActive ? ' [ACTIVE]' : ''
      console.log(`第 ${String(s.index).padStart(2)} 页${marker}:`)
      console.log(`  display=${s.display} visibility=${s.visibility} opacity=${s.opacity}`)
      console.log(`  transform=${s.transform}`)
      console.log(`  wrapper: display=${s.wrapperDisplay} visibility=${s.wrapperVisibility} opacity=${s.wrapperOpacity}`)
      if (s.wrapperInView) {
        console.log(`  wrapper in viewport: x=${s.wrapperInView.x.toFixed(0)} y=${s.wrapperInView.y.toFixed(0)} w=${s.wrapperInView.w.toFixed(0)} h=${s.wrapperInView.h.toFixed(0)}`)
      }
    })

    // 截图当前状态
    await page.screenshot({ path: '/tmp/fullpage-check.png' })
    console.log('\n📸 截图: /tmp/fullpage-check.png')
  } finally {
    await browser.close()
    server.close()
  }
}

check().catch(err => { console.error('❌', err); process.exit(1) })
