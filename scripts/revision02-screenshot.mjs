/**
 * revision02-screenshot.mjs
 * 对 revision02 指定页面进行 1920x1080 截图验证
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

const PORT = 4188
const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }

const s = http.createServer(async (req, res) => {
  let url = req.url
  if (url.startsWith('/AngelRare-PPT')) url = url.slice('/AngelRare-PPT'.length) || '/'
  if (!url.startsWith('/')) url = '/' + url
  // 用 URL 解析以正确解码百分号编码（如中文文件名）
  let pathname
  try { pathname = decodeURIComponent(new URL(url, 'http://x').pathname) } catch { pathname = url }
  const fp = path.join(DIST, pathname === '/' ? '/index.html' : pathname)
  try {
    const content = await fs.readFile(fp)
    const ext = path.extname(fp)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(content)
  } catch {
    res.writeHead(404); res.end('Not Found: ' + fp)
  }
})
await new Promise(r => s.listen(PORT, '127.0.0.1', r))
console.log('HTTP server on port', PORT)

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
let allOk = true
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
  const jsErrors = []
  p.on('pageerror', e => jsErrors.push(e.message))
  p.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()) })
  p.on('response', r => {
    if (r.status() >= 400 && !r.url().includes('favicon')) {
      jsErrors.push('HTTP ' + r.status() + ': ' + r.url())
    }
  })

  await p.goto('http://127.0.0.1:' + PORT + '/', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 4000))

  // 等图片完全加载
  await p.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'))
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve()
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
        setTimeout(resolve, 5000)
      })
    }))
  })

  // 收集所有 .section，包括那些 pageIndex 为 null 的
  const sections = await p.evaluate(() =>
    Array.from(document.querySelectorAll('.section')).map((s, i) => ({
      arrIdx: i,
      pageIndex: s.dataset.pageIndex || null,
      type: s.dataset.type || null,
      navTitle: s.dataset.navTitle || null,
      section: s.dataset.section || null,
    }))
  )
  console.log('\n=== Sections in DOM ===')
  sections.forEach(s => console.log(`  [${s.arrIdx}] pageIndex=${s.pageIndex} type=${s.type} navTitle=${s.navTitle} section=${s.section}`))
  console.log('共', sections.length, '个 section')

  // 检查有 pageIndex 的
  const validPages = sections.filter(s => s.pageIndex !== null)
  console.log('有效 pageIndex:', validPages.length)
  if (validPages.length !== 25) {
    console.log('❌ 有效 section 应为 25，实际', validPages.length)
    allOk = false
  }

  // 找出多余的 section（null pageIndex）
  const nullPages = sections.filter(s => s.pageIndex === null)
  if (nullPages.length > 0) {
    console.log('⚠️ 多余 section（无 pageIndex）:')
    nullPages.forEach(p => console.log('   arrIdx=' + p.arrIdx))
  }

  // 目标截图页（基于 pageIndex）
  // 我们的 targetPages 中 idx 是 0-based 数组索引（按渲染顺序）
  const targetPages = [
    { arrIdx: 0,  pageIndex: 1,  name: 'p01-cover',      desc: '封面' },
    { arrIdx: 1,  pageIndex: 2,  name: 'p02-toc',        desc: '总目录' },
    { arrIdx: 2,  pageIndex: 3,  name: 'p03-chapter01',  desc: '个人成长章节扉页' },
    { arrIdx: 3,  pageIndex: 4,  name: 'p04-policy',     desc: '立德树人' },
    { arrIdx: 4,  pageIndex: 5,  name: 'p05-ideaStage',  desc: '调研深入' },
    { arrIdx: 6,  pageIndex: 7,  name: 'p07-iteration',  desc: '知识掌握与应用能力' },
    { arrIdx: 7,  pageIndex: 8,  name: 'p08-achievements', desc: '人才培养成效' },
    { arrIdx: 9,  pageIndex: 10, name: 'p10-storyIntro', desc: '问题导向' },
    { arrIdx: 20, pageIndex: 21, name: 'p21-teamMembers', desc: '团队精神' },
    { arrIdx: 21, pageIndex: 22, name: 'p22-teamStructure', desc: '团队结构' },
  ]

  console.log('\n=== 1920×1080 截图 ===')
  for (const t of targetPages) {
    // 1. 直接通过数组索引激活对应 section
    await p.evaluate((arrIdx) => {
      const secs = document.querySelectorAll('.section')
      secs.forEach((el, i) => {
        el.classList.toggle('active', i === arrIdx)
      })
    }, t.arrIdx)
    await new Promise(r => setTimeout(r, 600))

    // 2. 读取信息
    const info = await p.evaluate(() => {
      const active = document.querySelector('.section.active')
      if (!active) return null
      const imgs = Array.from(active.querySelectorAll('img')).map(img => ({
        natW: img.naturalWidth, natH: img.naturalHeight,
        alt: img.alt || '', complete: img.complete,
      }))
      const slogan = active.querySelector('.slogan')
      const badge = active.querySelector('.badge')

      // 检查 < 20px 文本（只在直接文字节点查找）
      const smallTexts = []
      active.querySelectorAll('p, span, div, li, h1, h2, h3, h4, h5, h6').forEach(el => {
        const cs = window.getComputedStyle(el)
        const fs = parseFloat(cs.fontSize)
        // 只检查直接子节点的 fontSize（避免把整个 innerText 算上去）
        const directText = Array.from(el.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent.trim())
          .join('').trim()
        if (fs > 0 && fs < 20 && directText.length >= 2) {
          smallTexts.push({ fs, text: directText.slice(0, 30) })
        }
      })

      return {
        pageIndex: active.dataset.pageIndex,
        navTitle: active.dataset.navTitle,
        type: active.dataset.type,
        section: active.dataset.section,
        slogan: slogan ? slogan.innerText.trim().slice(0, 60) : null,
        badge: badge ? badge.innerText.trim() : null,
        imgCount: imgs.length,
        brokenImgs: imgs.filter(i => !i.natW || !i.natH),
        smallTexts: smallTexts.slice(0, 5),
      }
    })

    if (!info) {
      console.log(`\n  ❌ ${t.desc} (P${String(t.pageIndex).padStart(2,'0')}) - active=NULL`)
      allOk = false
      continue
    }

    const hasBroken = info.brokenImgs.length > 0
    const marker = hasBroken ? '❌' : '✅'
    console.log(`\n  ${marker} ${t.desc} (P${String(t.pageIndex).padStart(2,'0')})`)
    console.log(`     type=${info.type} navTitle="${info.navTitle}"`)
    console.log(`     slogan="${info.slogan || 'NULL'}"`)
    console.log(`     badge="${info.badge || 'NULL'}"`)
    console.log(`     图片: ${info.imgCount} 张, 未加载 ${info.brokenImgs.length} 张`)
    if (hasBroken) {
      info.brokenImgs.forEach(bi => console.log(`       ❌ broken: alt="${bi.alt}" w=${bi.natW} h=${bi.natH}`))
      allOk = false
    }
    if (info.smallTexts.length > 0) {
      console.log(`     ⚠️ 字号 < 20px: ${info.smallTexts.length} 处`)
      info.smallTexts.forEach(st => console.log(`       ⚠️ ${st.fs}px: "${st.text}"`))
    }

    // 截图
    await p.screenshot({ path: path.join(OUT, t.name + '.png'), fullPage: false })
    console.log(`     📷 已保存`)
  }

  console.log('\n=== JS 错误 ===')
  if (jsErrors.length === 0) {
    console.log('  ✅ 无 JS 错误')
  } else {
    [...new Set(jsErrors)].forEach(e => console.log('  ❌ ' + e))
    allOk = false
  }

  console.log('\n=== 最终结论 ===')
  if (allOk) console.log('✅ ALL CHECKS PASSED')
  else console.log('❌ 有问题需要修复')
  console.log('\n截图目录: ' + OUT)
} finally {
  await b.close()
  s.close()
}