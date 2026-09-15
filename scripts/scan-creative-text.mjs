/**
 * scan-creative-text.mjs
 *
 * 检测所有 29 页 slide 是否违反「文案铁律」：
 * - 找出使用了"自创二级目录"或"自创 Slogan"的页面
 * - 必须 100% 使用 slogan-canon.json 中的原文
 *
 * 扫描关键词集合（每页里出现的"文案性"中文短语），与定稿对照
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')

const canon = JSON.parse(await fs.readFile(path.join(ROOT, 'assets/data/slogan-canon.json'), 'utf-8'))

// 构造定稿二级目录集合（用于反向检测"自创"）
const canonSections = new Set(canon.items.map(i => i.section))
const canonSlogans = new Set(canon.items.map(i => i.slogan))

// 已知的"危险"自创短语（曾出现过 + 容易写错的）
const suspiciousCreatives = [
  '故事引入', '真实患者的困境', '真实故事', '患者的困境',
  '行业背景', '市场概况', '项目概述', '产品介绍',
  '项目背景', '用户故事', '案例分享', '团队介绍',
  '财务概览', '前景展望', '未来规划'
]

// 找出所有 slide-XX/SlideXxx.vue
async function findSlides() {
  const dirs = await fs.readdir(SRC)
  const slides = []
  for (const d of dirs) {
    if (!d.startsWith('slide-')) continue
    const full = path.join(SRC, d)
    const stat = await fs.stat(full)
    if (!stat.isDirectory()) continue
    const files = await fs.readdir(full)
    for (const f of files) {
      if (f.startsWith('Slide') && f.endsWith('.vue')) {
        const num = parseInt(d.split('-')[1])
        slides.push({ page: num, path: path.join(full, f), dir: d })
      }
    }
  }
  slides.sort((a, b) => a.page - b.page)
  return slides
}

function extractText(content) {
  // 提取 <template> 中的中文文案、h1/title/badge 内容
  const tmpl = content.match(/<template>([\s\S]*?)<\/template>/)?.[1] || ''
  // 提取所有 mustache {{ ... }} 中的字符串字面量
  const interpolations = [...tmpl.matchAll(/\{\{\s*['"]([^'"]+)['"]/g)].map(m => m[1])
  // 提取 .badge/.title/.slogan 标签内的中文字符串
  const directTexts = [...tmpl.matchAll(/(?:badge|title|slogan|subtitle|nav|label)[^>]*>\s*([\u4e00-\u9fa5][^<{]+)/gi)].map(m => m[1].trim())
  // 提取 const xxx = ref('...')
  const scriptTexts = [...content.matchAll(/ref\(\s*['"]([^'"]+)['"]/g)].map(m => m[1])
  return [...new Set([...interpolations, ...directTexts, ...scriptTexts])]
}

async function main() {
  const slides = await findSlides()
  console.log(`\n🔍 扫描 ${slides.length} 页，检测文案违规\n`)

  const violations = []

  for (const s of slides) {
    const content = await fs.readFile(s.path, 'utf-8')
    const texts = extractText(content)
    const issues = []

    // 1) 检测是否含"危险"自创短语
    for (const susp of suspiciousCreatives) {
      if (texts.some(t => t.includes(susp))) {
        issues.push({ type: '危险自创短语', phrase: susp, where: texts.find(t => t.includes(susp)) })
      }
    }

    // 2) 检测是否使用了文案但不在 canon 列表（只针对有 slogan 的页面）
    const hasContentPage = [4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24, 25].includes(s.page)
    if (hasContentPage) {
      const expected = canon.items.find(i => i.page === s.page)
      if (!expected) {
        issues.push({ type: '缺失', phrase: `第 ${s.page} 页不在 canon 中` })
      } else {
        // 检查文案中是否包含 canon 的 section 和 slogan（任何一种字符串缺失都要警示）
        const hasSection = texts.some(t => t.includes(expected.section))
        const hasSlogan = texts.some(t => t.includes(expected.slogan))
        if (!hasSection) {
          issues.push({ type: '缺失二级目录', phrase: `预期: "${expected.section}"` })
        }
        if (!hasSlogan) {
          issues.push({ type: '缺失 Slogan', phrase: `预期: "${expected.slogan}"` })
        }
      }
    }

    if (issues.length) {
      violations.push({ page: s.page, file: path.basename(s.path), issues })
    }
  }

  if (violations.length === 0) {
    console.log('✅ 全部 29 页文案合规，未发现违规\n')
  } else {
    console.log(`❌ 发现 ${violations.length} 页违规：\n`)
    for (const v of violations) {
      console.log(`--- 第 ${v.page} 页 (${v.file}) ---`)
      for (const i of v.issues) {
        console.log(`  • ${i.type}: ${i.phrase}`)
      }
      console.log('')
    }
  }

  // 输出每页文案摘要（便于人工核查）
  console.log('\n📋 每页文案摘要：')
  for (const s of slides) {
    const content = await fs.readFile(s.path, 'utf-8')
    const texts = extractText(content)
    const cn = texts.filter(t => /[\u4e00-\u9fa5]/.test(t))
    console.log(`p${String(s.page).padStart(2, '0')}: ${cn.slice(0, 4).join(' | ')}`)
  }
}

main().catch(e => { console.error('❌', e); process.exit(1) })
