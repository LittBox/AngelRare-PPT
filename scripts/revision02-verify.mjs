/**
 * revision02-verify.mjs
 * 对 revision02 指定的页面进行 1920x1080 真实渲染截图
 * 验证：文案 / Slogan / 图片加载 / 对齐 / 裁切
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
const OUT = path.join(ROOT, 'export/screenshots/revision02-verify')
await fs.mkdir(OUT, { recursive: true })

const PORT = 4173
const s = http.createServer(async (req, res) => {
  const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' }
  let fp = path.join(DIST, req.url === '/' ? '/index.html' : req.url)
  try {
    const c = await fs.readFile(fp)
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp)] || 'application/octet-stream' })
    res.end(c)
  } catch { res.writeHead(404); res.end('NF') }
})
await new Promise(r => s.listen(PORT, r))

const b = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

let allOk = true
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

  const jsErrors = []
  p.on('pageerror', e => jsErrors.push(e.message))
  p.on('console', msg => {
    if (msg.type() === 'error') jsErrors.push(msg.text())
  })

  await p.goto('http://localhost:' + PORT + '/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3500))

  const renderError = await p.evaluate(() => {
    const el = document.querySelector('.render-error')
    return el ? el.querySelector('pre').textContent : null
  })

  if (renderError) {
    console.log('RENDER ERROR: ' + renderError)
    process.exit(1)
  }

  const sections = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('.section')).map((s) => ({
      pageIndex: parseInt(s.dataset.pageIndex),
      type: s.dataset.type,
      section: s.dataset.section || '',
      navTitle: s.dataset.navTitle || '',
    }))
  })

  console.log('=== 25 页结构 ===')
  sections.forEach(s => console.log('  P' + String(s.pageIndex).padStart(2, '0') + ' ' + s.type + ' ' + s.navTitle + ' / ' + s.section))
  console.log('共 ' + sections.length + ' 页')

  // 验证完整 25 页 + 顺序
  const expectedNavTitles = [
    '封面', '目录', '个人成长', '立德树人', '调研深入', '逻辑正确',
    '知识掌握与应用能力', '人才培养成效', '项目创新', '问题导向',
    '目标导向', '创新成效｜技术创新', '创新成效｜服务模式创新', '创新成效｜商业模式创新',
    '产业价值', '产业认知', '市场定位', '落地前景', '社会影响',
    '团队协作', '团队精神', '团队结构', '团队效能', '团队资源', '致谢'
  ]

  if (sections.length !== 25) {
    console.log('❌ 页面总数应为 25，实际 ' + sections.length)
    allOk = false
  }

  const targetPages = [
    { idx: 0, name: 'p01-cover', desc: '封面' },
    { idx: 1, name: 'p02-toc', desc: '总目录' },
    { idx: 2, name: 'p03-chapter01', desc: '个人成长章节扉页' },
    { idx: 3, name: 'p04-policy', desc: '立德树人' },
    { idx: 4, name: 'p05-ideaStage', desc: '调研深入' },
    { idx: 6, name: 'p07-iteration', desc: '知识掌握与应用能力' },
    { idx: 7, name: 'p08-achievements', desc: '人才培养成效' },
    { idx: 9, name: 'p10-storyIntro', desc: '问题导向' },
    { idx: 20, name: 'p21-teamMembers', desc: '团队精神' },
    { idx: 21, name: 'p22-teamStructure', desc: '团队结构' },
  ]

  console.log('\n=== 开始 1920×1080 截图 ===')
  for (const t of targetPages) {
    // 移动到目标页
    await p.evaluate((idx) => {
      const api = window.fullpage_api
      if (api && api.moveTo) {
        api.moveTo(idx)
      }
    }, t.idx)
    await new Promise(r => setTimeout(r, 900))

    // 强制激活并截图
    await p.evaluate((idx) => {
      document.querySelectorAll('.section').forEach((el, i) => {
        el.classList.toggle('active', i === idx)
      })
    }, t.idx)
    await new Promise(r => setTimeout(r, 300))

    const activeInfo = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return null
      const imgList = Array.from(active.querySelectorAll('img')).map((img) => ({
        src: img.src || '',
        natW: img.naturalWidth,
        natH: img.naturalHeight,
        alt: img.alt,
      }))
      const sloganEl = active.querySelector('.slogan')
      const badgeEl = active.querySelector('.badge')
      const allText = active.innerText
      // 检查所有文字是否 < 20px
      const smallTexts = []
      active.querySelectorAll('*').forEach(el => {
        const cs = window.getComputedStyle(el)
        const fs = parseFloat(cs.fontSize)
        if (fs > 0 && fs < 20 && el.innerText && el.innerText.trim().length > 0 && !el.closest('.slogan')) {
          // 排除纯数字/单字符
          const text = el.innerText.trim()
          if (text.length >= 2 && !/^[·★►→↓↑•.\s]+$/.test(text)) {
            smallTexts.push({ tag: el.tagName, fs, text: text.slice(0, 30) })
          }
        }
      })
      // 检查 overflow
      const overflowEls = []
      active.querySelectorAll('*').forEach(el => {
        const cs = window.getComputedStyle(el)
        if (cs.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0) {
          overflowEls.push({
            tag: el.tagName,
            cls: el.className.toString().slice(0, 40),
            scrollH: el.scrollHeight,
            clientH: el.clientHeight,
          })
        }
      })
      return {
        pageIndex: parseInt(active.dataset.pageIndex),
        navTitle: active.dataset.navTitle,
        section: active.dataset.section,
        type: active.dataset.type,
        slogan: sloganEl ? sloganEl.innerText.trim().slice(0, 60) : null,
        badge: badgeEl ? badgeEl.innerText.trim() : null,
        imgCount: imgList.length,
        brokenImgs: imgList.filter(i => !i.natW || !i.natH),
        imgs: imgList.slice(0, 5),
        smallTextCount: smallTexts.length,
        smallTexts: smallTexts.slice(0, 5),
        overflowEls: overflowEls.slice(0, 3),
      }
    })

    const screenshotPath = path.join(OUT, t.name + '.png')
    await p.screenshot({ path: screenshotPath, fullPage: false })

    if (!activeInfo) {
      console.log('\n  ❌ ' + t.desc + ' (P' + String(t.idx + 1).padStart(2, '0') + ') - activeInfo = NULL')
      allOk = false
      continue
    }

    const hasIssue = activeInfo.brokenImgs.length > 0
    const marker = hasIssue ? '❌' : '✅'
    console.log('\n  ' + marker + ' ' + t.desc + ' (P' + String(t.idx + 1).padStart(2, '0') + ')')
    console.log('     type=' + activeInfo.type + ' navTitle="' + activeInfo.navTitle + '"')
    console.log('     slogan="' + (activeInfo.slogan || 'NULL') + '"')
    console.log('     图片: 共 ' + activeInfo.imgCount + ' 张, 未加载 ' + activeInfo.brokenImgs.length + ' 张')
    if (activeInfo.brokenImgs.length > 0) {
      activeInfo.brokenImgs.forEach(b => console.log('       ❌ broken: ' + b.alt + ' - ' + b.src.slice(-50)))
      allOk = false
    }
    if (activeInfo.smallTextCount > 0) {
      console.log('     字号 < 20px: ' + activeInfo.smallTextCount + ' 处')
      activeInfo.smallTexts.forEach(t => console.log('       ⚠️ ' + t.tag + ' fs=' + t.fs + ' "' + t.text + '"'))
    }
    if (activeInfo.overflowEls.length > 0) {
      console.log('     ⚠️ overflow:hidden + 实际裁切: ' + activeInfo.overflowEls.length + ' 处')
      activeInfo.overflowEls.forEach(o => console.log('       ⚠️ ' + o.tag + '.' + o.cls + ' scrollH=' + o.scrollH + ' > clientH=' + o.clientH))
    }
  }

  console.log('\n=== JS 错误 ===')
  if (jsErrors.length === 0) {
    console.log('  ✅ 无 JS 错误')
  } else {
    jsErrors.forEach(e => console.log('  ❌ ' + e))
    allOk = false
  }

  console.log('\n=== 最终结论 ===')
  if (allOk) {
    console.log('✅ ALL CHECKS PASSED')
  } else {
    console.log('❌ 有问题需要修复')
  }

  console.log('\n截图已保存到: ' + OUT)
} finally {
  await b.close()
  s.close()
}