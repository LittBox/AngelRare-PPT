/**
 * black-screen-repro.mjs
 * 模拟用户实际浏览器尺寸：可能比 1920×1080 宽
 * 重点检查：fullpage 切到第 2 页时，wrapper 是否真的渲染在视口内
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
const OUT = path.join(ROOT_DIR, 'export', 'screenshots', 'black-screen-repro')

async function mk(dir) { await fs.mkdir(dir, { recursive: true }) }

function server() {
  return new Promise(resolve => {
    const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}
    const s = http.createServer(async (req, res) => {
      let fp = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url)
      try {
        const c = await fs.readFile(fp)
        res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
        res.end(c)
      } catch { res.writeHead(404); res.end('Not Found') }
    })
    s.listen(4181, () => resolve(s))
  })
}

async function test(viewport) {
  const s = await server()
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const p = await b.newPage()
    await p.setViewport(viewport)
    await p.goto(`http://localhost:4181/`, { waitUntil: 'networkidle0' })
    await p.waitForSelector('.slide-canvas-wrapper')
    await new Promise(r => setTimeout(r, 2000))

    // 切到第 2 页（黑屏报告最多的）
    await p.evaluate(() => window.fullpage_api?.moveTo(2))
    await new Promise(r => setTimeout(r, 1500))

    // 截图
    const filePath = path.join(OUT, `${viewport.width}x${viewport.height}-p2.png`)
    await p.screenshot({ path: filePath })

    // 检查 active section 和 wrapper
    const dump = await p.evaluate(() => {
      const active = document.querySelector('.fp-section.active')
      if (!active) return { error: 'no active section' }
      const wrapper = active.querySelector('.slide-canvas-wrapper')
      if (!wrapper) return { error: 'no wrapper' }
      const ar = active.getBoundingClientRect()
      const wr = wrapper.getBoundingClientRect()
      const acs = window.getComputedStyle(active)
      const wcs = window.getComputedStyle(wrapper)
      return {
        section: { x: ar.x, y: ar.y, w: ar.width, h: ar.height, transform: acs.transform, overflow: acs.overflow },
        wrapper: { x: wr.x, y: wr.y, w: wr.width, h: wr.height, transform: wcs.transform, scaleRatio: window.getComputedStyle(wrapper).transform },
        wrapperTextPreview: wrapper.innerText.slice(0, 40),
        wrapperHTMLSize: wrapper.innerHTML.length,
        // 检查 wrapper 是否被遮挡或超出视口
        wrapperInView: wr.x >= 0 && wr.y >= 0 && wr.x + wr.width <= window.innerWidth && wr.y + wr.height <= window.innerHeight
      }
    })

    return { viewport, filePath, dump }
  } finally {
    await b.close(); s.close()
  }
}

async function main() {
  await mk(OUT)
  // 测试多种视口：常见浏览器尺寸
  const viewports = [
    { width: 1920, height: 1080, label: '1920x1080' },
    { width: 2560, height: 1440, label: '2560x1440' },
    { width: 1440, height: 900, label: '1440x900' },
    { width: 1366, height: 768, label: '1366x768' },
    { width: 1680, height: 1050, label: '1680x1050' }
  ]
  for (const v of viewports) {
    const { filePath, dump } = await test(v)
    console.log(`\n=== ${v.label} ===`)
    if (dump.error) {
      console.log('❌', dump.error)
    } else {
      console.log(`section: x=${dump.section.x.toFixed(0)} y=${dump.section.y.toFixed(0)} w=${dump.section.w.toFixed(0)} h=${dump.section.h.toFixed(0)}`)
      console.log(`wrapper: x=${dump.wrapper.x.toFixed(0)} y=${dump.wrapper.y.toFixed(0)} w=${dump.wrapper.w.toFixed(0)} h=${dump.wrapper.h.toFixed(0)}`)
      console.log(`wrapper.transform: ${dump.wrapper.transform.slice(0, 60)}`)
      console.log(`wrapperInView: ${dump.wrapperInView}`)
      console.log(`textPreview: "${dump.wrapperTextPreview}..."`)
      console.log('📸', filePath)
    }
  }
}

main().catch(e => { console.error('❌', e); process.exit(1) })
