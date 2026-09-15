/**
 * apply-text-laws.mjs
 *
 * 批量将 17 个内容页统一应用文案铁律：
 *   1. 删除自创 title，替换为定稿 Slogan（第一视觉中心 · 超大艺术字）
 *   2. 修改 badge 为定稿二级目录（顶部小标签 · 克制）
 *   3. 删除自创 subtitle（防止抢 Slogan 视觉）
 *
 * 策略：使用文案铁律中已确定的 page → {section, slogan} 映射，逐文件修改
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const canon = JSON.parse(await fs.readFile(path.join(ROOT, 'assets/data/slogan-canon.json'), 'utf-8'))

// 把 {section, slogan} 加到页面对象
const rules = Object.fromEntries(canon.items.map(i => [i.page, { section: i.section, slogan: i.slogan }]))

const slidesDir = path.join(ROOT, 'src')

async function processSlide(page) {
  const rule = rules[page]
  if (!rule) return null

  const dir = `slide-${String(page).padStart(2, '0')}`
  const files = await fs.readdir(path.join(slidesDir, dir))
  const file = files.find(f => f.startsWith('Slide') && f.endsWith('.vue'))
  if (!file) return null

  const fp = path.join(slidesDir, dir, file)
  let src = await fs.readFile(fp, 'utf-8')

  // 1. 在 <script setup> 内插入定稿文案（用 ref）
  // 寻找第一个 const xxx = [ 或 script 末尾
  const scriptTag = '<script setup>'
  const scriptEnd = '</script>'
  const scriptStart = src.indexOf(scriptTag)
  const scriptClose = src.indexOf(scriptEnd)
  if (scriptStart === -1 || scriptClose === -1) return { page, error: 'no script setup' }

  const scriptBody = src.slice(scriptStart + scriptTag.length, scriptClose)
  let newScriptBody = scriptBody

  // 已有 import { ref } from 'vue'？
  if (!/import\s*\{[^}]*\bref\b[^}]*\}\s*from\s*['"]vue['"]/.test(scriptBody)) {
    newScriptBody = `import { ref } from 'vue'\n\n` + newScriptBody
  }

  // 注入定稿文案（在第一个非空行后插入）
  const injections = `
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('${rule.section}')
const slogan = ref('${rule.slogan}')
`

  if (!/secondLevelNav\s*=\s*ref\(/.test(scriptBody)) {
    // 插入到 import 之后，第一个 const 之前
    const firstConst = newScriptBody.search(/\nconst\s+\w+\s*=/)
    if (firstConst > 0) {
      newScriptBody = newScriptBody.slice(0, firstConst) + injections + '\n' + newScriptBody.slice(firstConst).trimStart()
    } else {
      newScriptBody = newScriptBody.trimEnd() + injections
    }
  }

  src = src.slice(0, scriptStart + scriptTag.length) + newScriptBody + src.slice(scriptClose)

  // 2. 替换 template 中的 .header 部分
  // 模式：<div class="header">\s*<div class="badge">.*?</div>\s*<h1 class="title">.*?</h1>(?:<p class="subtitle">.*?</p>)?\s*</div>
  const headerRe = /<div class="header">\s*<div class="badge">[^<]*<\/div>\s*(?:<h1 class="title">[^<]*<\/h1>)?\s*(?:<p class="subtitle">[\s\S]*?<\/p>)?\s*<\/div>/
  if (headerRe.test(src)) {
    const newHeader = `<div class="header">\n      <div class="badge">{{ secondLevelNav }}</div>\n    </div>\n\n    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->\n    <h1 class="slogan">{{ slogan }}</h1>`
    src = src.replace(headerRe, newHeader)
  } else {
    // 兜底：仅替换 badge
    src = src.replace(
      /<div class="badge">[^<]+<\/div>\s*<h1 class="title">[^<]+<\/h1>/,
      `<div class="badge">{{ secondLevelNav }}</div>\n    </div>\n\n    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->\n    <h1 class="slogan">{{ slogan }}</h1>\n\n    <div class="header-stub"></div>\n\n    <div style="display:none">`
    )
  }

  // 3. 替换 CSS 中的 .title 为 .slogan 样式（超大艺术字）
  // 找到 .title { ... } 块，替换为 .slogan { ... }
  const titleCssRe = /\.title\s*\{[^}]*\}/
  if (titleCssRe.test(src)) {
    const titleMatch = src.match(titleCssRe)[0]
    // 转换：保留颜色相关，但把字号改成超大
    const inner = titleMatch.replace(/^\.title\s*\{/, '').replace(/\}$/, '')
    // 把 font-size 改成 84px（如果是 var(--text-3xl) 之类的，改成具体的）
    const newInner = inner
      .replace(/font-size\s*:\s*[^;]+;/, 'font-size: 84px;')
      .replace(/letter-spacing\s*:\s*[^;]+;/, 'letter-spacing: 6px;')
    const newSloganCss = `.slogan {\n  margin: 30px 0 60px 0;\n  padding: 0;\n  font-size: 84px;\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: 6px;\n  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}`
    src = src.replace(titleCssRe, newSloganCss)
  }

  // 4. CSS 中 .badge 改造为新版本（更克制）
  const badgeRe = /\.badge\s*\{[^}]*\}/
  if (badgeRe.test(src)) {
    const newBadgeCss = `.badge {\n  display: inline-block;\n  padding: 8px 24px;\n  background: rgba(74, 108, 247, 0.12);\n  color: var(--color-accent, #00d4ff);\n  border: 1px solid rgba(0, 212, 255, 0.3);\n  border-radius: 999px;\n  font-size: 16px;\n  letter-spacing: 6px;\n  font-weight: 400;\n}`
    src = src.replace(badgeRe, newBadgeCss)
  }

  // 5. .header margin-bottom 减小
  src = src.replace(/\.header\s*\{\s*margin-bottom:\s*\d+px;\s*\}/, '.header {\n  margin-bottom: 30px;\n}')

  // 6. 删除 .subtitle 块（让 Slogan 独占视觉）
  src = src.replace(/<p class="subtitle">[\s\S]*?<\/p>\n\s*/, '')
  src = src.replace(/\.subtitle\s*\{[^}]*\}\n\s*/, '')

  await fs.writeFile(fp, src, 'utf-8')
  return { page, file: path.basename(fp), ok: true }
}

const pages = [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24, 25]
console.log(`\n🔧 批量应用文案铁律到 ${pages.length} 页\n`)

let okCount = 0
for (const page of pages) {
  try {
    const r = await processSlide(page)
    if (r && r.ok) {
      console.log(`✅ p${page}: ${r.file}`)
      okCount++
    } else if (r && r.error) {
      console.log(`❌ p${page}: ${r.error}`)
    }
  } catch (e) {
    console.log(`❌ p${page}: ${e.message}`)
  }
}

console.log(`\n完成 ${okCount}/${pages.length} 页\n`)
