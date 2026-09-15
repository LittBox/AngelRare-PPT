/**
 * verify-final-order.mjs
 * 最终验证：25 页完整结构（5 类型）
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
const OUT = path.join(ROOT, 'export/screenshots/25-final-order-verify')
await fs.mkdir(OUT, { recursive: true })

const expectedOrder = [
  "封面", "目录",
  "01 个人成长",
  "立德树人", "调研深入", "逻辑正确", "知识掌握与应用能力", "人才培养成效",
  "02 项目创新",
  "问题导向", "目标导向", "创新成效｜技术创新", "创新成效｜服务模式创新", "创新成效｜商业模式创新",
  "03 产业价值",
  "产业认知", "市场定位", "落地前景", "社会影响",
  "04 团队协作",
  "团队精神", "团队结构", "团队效能", "团队资源",
  "致谢"
]

const s = http.createServer(async (req, res) => {
  const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css'}
  let fp = path.join(DIST, req.url === '/' ? '/index.html' : req.url)
  try {
    const c = await fs.readFile(fp)
    res.writeHead(200, {'Content-Type': mime[path.extname(fp)] || 'application/octet-stream'})
    res.end(c)
  } catch { res.writeHead(404); res.end('NF') }
})
await new Promise(r => s.listen(4187, r))

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
try {
  const p = await b.newPage()
  await p.setViewport({ width: 1440, height: 900 })
  const jsErrors = []
  p.on('pageerror', e => jsErrors.push(e.message))
  p.on('console', msg => {
    if (msg.type() === 'error') jsErrors.push(msg.text())
  })

  await p.goto('http://localhost:4187/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))

  // 验证渲染错误
  const renderError = await p.evaluate(() => {
    const el = document.querySelector('.render-error')
    return el ? el.querySelector('pre').textContent : null
  })

  if (renderError) {
    console.log('RENDER ERROR: ' + renderError)
    await b.close()
    s.close()
    process.exit(1)
  }

  // 收集所有 section
  const sections = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('.section')).map((s) => ({
      pageIndex: parseInt(s.dataset.pageIndex),
      type: s.dataset.type,
      section: s.dataset.section || '',
      navTitle: s.dataset.navTitle || '',
      hasActive: s.classList.contains('active')
    }))
  })

  // 打印顺序
  console.log('\n=== 25 页实际顺序 ===')
  sections.forEach((s) => {
    const pi = String(s.pageIndex).padStart(2, '0')
    console.log('  P' + pi + ' type=' + s.type + ' navTitle="' + s.navTitle + '" section="' + s.section + '"')
  })

  // 校验总数
  console.log('\n=== 校验 ===')
  let allOk = true

  if (sections.length !== 25) {
    console.log('FAIL: 页面总数 ' + sections.length + '，预期 25')
    allOk = false
  } else {
    console.log('OK: 页面总数 25')
  }

  // 校验类型分布
  const typeCount = {}
  for (const s of sections) {
    typeCount[s.type] = (typeCount[s.type] || 0) + 1
  }
  console.log('  类型分布: ' + JSON.stringify(typeCount))

  const expectedTypes = { cover: 1, toc: 1, section: 4, content: 18, thanks: 1 }
  for (const [t, n] of Object.entries(expectedTypes)) {
    if (typeCount[t] !== n) {
      console.log('FAIL: type="' + t + '" 应有 ' + n + ' 个，实际 ' + (typeCount[t] || 0) + ' 个')
      allOk = false
    } else {
      console.log('OK: type="' + t + '" = ' + n)
    }
  }

  // 校验顺序
  const actualOrder = sections.map((s) => {
    if (s.type === 'cover') return '封面'
    if (s.type === 'toc') return '目录'
    if (s.type === 'section') {
      // 章节扉页：显示为 "01 个人成长" 这种格式
      const sectionIndex = s.pageIndex === 3 ? '01'
                          : s.pageIndex === 9 ? '02'
                          : s.pageIndex === 15 ? '03'
                          : s.pageIndex === 20 ? '04' : '??'
      return (sectionIndex + ' ' + s.section).trim()
    }
    if (s.type === 'content') return s.navTitle
    if (s.type === 'thanks') return '致谢'
    return ''
  })
  console.log('\n=== 顺序校验 ===')
  for (let i = 0; i < expectedOrder.length; i++) {
    const actual = actualOrder[i] || 'null'
    const expected = expectedOrder[i]
    const ok = actual === expected
    if (!ok) allOk = false
    console.log('  P' + String(i + 1).padStart(2, '0') + ' ' + (ok ? 'OK' : 'FAIL') + ' expected="' + expected + '" actual="' + actual + '"')
  }

  // 截图全部 25 页
  console.log('\n=== 截图 ===')
  for (let i = 0; i < 25; i++) {
    await p.evaluate((idx) => window.fullpage_api && window.fullpage_api.moveTo(idx), i)
    await new Promise(r => setTimeout(r, 400))
    await p.screenshot({ path: path.join(OUT, 'p' + String(i + 1).padStart(2, '0') + '.png') })
    if (i % 5 === 0 || i === 24) {
      const dump = await p.evaluate(() => {
        const active = document.querySelector('.section.active')
        if (!active) return null
        const badge = active.querySelector('.badge')
        const slogan = active.querySelector('.slogan')
        const title = active.querySelector('h1')
        return {
          badge: badge ? badge.innerText.trim() : null,
          slogan: slogan ? slogan.innerText.trim() : null,
          title: title ? title.innerText.trim() : null,
          navTitle: active.dataset.navTitle,
          type: active.dataset.type
        }
      })
      console.log('  P' + String(i + 1).padStart(2, '0') + ' type=' + dump.type + ' badge="' + (dump.badge || 'null') + '" slogan="' + (dump.slogan ? dump.slogan.slice(0,20) : 'null') + '" navTitle="' + dump.navTitle + '"')
    }
  }

  // 验证右侧导航圆点数
  const navCount = await p.evaluate(() => document.querySelectorAll('.fp-nav a').length)
  console.log('\n右侧导航圆点: ' + navCount + ' 个（预期 25）')
  if (navCount !== 25) {
    console.log('FAIL: 导航圆点数不对')
    allOk = false
  }

  console.log('\n=== 最终结论 ===')
  if (allOk) {
    console.log('ALL 25 PAGES PASSED ALL CHECKS')
  } else {
    console.log('SOME CHECKS FAILED')
  }

  if (jsErrors.length > 0) {
    console.log('\nJS Errors:')
    jsErrors.forEach(e => console.log('  ' + e))
  }

} finally {
  await b.close()
  s.close()
}
