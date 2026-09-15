/**
 * diagnose.mjs
 * 精确诊断：第 2 页时各 section / wrapper / 容器的 transform
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
    s.listen(4180, () => resolve(s))
  })
}

async function go() {
  const s = await server()
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const p = await b.newPage()
    // 模拟你的宽屏视口（带左侧黑边那种）
    await p.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 })
    await p.goto(`http://localhost:4180/`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 2000))

    // 跳到第 2 页
    await p.evaluate(() => window.fullpage_api?.moveTo(2))
    await new Promise(r => setTimeout(r, 1200))

    const dump = await p.evaluate(() => {
      const result = {}
      // 1. presentation 容器
      const pres = document.querySelector('.presentation')
      result.presentation = {
        transform: pres ? window.getComputedStyle(pres).transform : 'NONE',
        rect: pres ? pres.getBoundingClientRect() : null
      }

      // 2. 所有 section 的状态
      const sections = document.querySelectorAll('.section, .fp-section')
      result.sections = []
      sections.forEach((s, i) => {
        const cs = window.getComputedStyle(s)
        const w = s.querySelector('.slide-canvas-wrapper')
        const ws = w ? window.getComputedStyle(w) : null
        result.sections.push({
          index: i + 1,
          classes: s.className,
          isActive: s.classList.contains('active'),
          position: cs.position,
          top: cs.top,
          left: cs.left,
          transform: cs.transform,
          rect: { x: s.getBoundingClientRect().x, y: s.getBoundingClientRect().y, w: s.getBoundingClientRect().width, h: s.getBoundingClientRect().height },
          wrapper: w ? {
            classes: w.className,
            transform: ws.transform,
            rect: { x: w.getBoundingClientRect().x, y: w.getBoundingClientRect().y, w: w.getBoundingClientRect().width, h: w.getBoundingClientRect().height }
          } : null
        })
      })

      // 3. 当前 active section 的 wrapper 文本预览
      const active = document.querySelector('.fp-section.active')
      if (active) {
        const wrapper = active.querySelector('.slide-canvas-wrapper')
        result.activeTextPreview = wrapper ? wrapper.innerText.slice(0, 60) : 'NO WRAPPER'
      }

      result.viewport = { w: window.innerWidth, h: window.innerHeight, bodyW: document.body.clientWidth, bodyH: document.body.clientHeight }
      return result
    })

    console.log(JSON.stringify(dump, null, 2))
  } finally {
    await b.close(); s.close()
  }
}

go().catch(e => { console.error('❌', e); process.exit(1) })
