/**
 * apply-final-mapping.mjs
 *
 * 将 slogan-canon.json 的 page → {navTitle, slogan} 映射
 * 应用到对应的 slide 组件中（badge + slogan ref）
 *
 * 运行前：确保 slogan-canon.json 的 pages 数组顺序是正确的（已按用户定稿排好）
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const manifest = JSON.parse(await fs.readFile(path.join(ROOT, 'assets/data/slogan-canon.json'), 'utf-8'))

// pageIndex → {navTitle, slogan, slideComponent}
const mapping = {}
for (const p of manifest.pages) {
  mapping[p.slideComponent] = { navTitle: p.navTitle, slogan: p.slogan, pageIndex: p.pageIndex }
}

console.log('Applying mapping to slide components:')
for (const [comp, meta] of Object.entries(mapping)) {
  console.log('  ' + comp + ' → ' + meta.navTitle + ' | ' + meta.slogan.slice(0, 20))
}

async function updateComponent(compName, { navTitle, slogan }) {
  // 找到对应文件
  const dirs = await fs.readdir(path.join(ROOT, 'src'))
  let found = null
  for (const d of dirs) {
    if (!d.startsWith('slide-')) continue
    const files = await fs.readdir(path.join(ROOT, 'src', d))
    const f = files.find(f => f === compName + '.vue')
    if (f) { found = path.join(ROOT, 'src', d, f); break }
  }
  if (!found) {
    console.log('  SKIP ' + compName + ': file not found')
    return
  }

  let src = await fs.readFile(found, 'utf-8')

  // 1. 更新 script 中的 secondLevelNav ref
  if (/secondLevelNav\s*=\s*ref\(/.test(src)) {
    src = src.replace(
      /secondLevelNav\s*=\s*ref\(['"]([^'"]*)['"]\)/,
      "secondLevelNav = ref('" + navTitle + "')"
    )
    src = src.replace(
      /const\s+secondLevelNav\s*=\s*ref\(['"]([^'"]*)['"]\)/,
      "const secondLevelNav = ref('" + navTitle + "')"
    )
  } else {
    // 在 import { ref } 后插入
    src = src.replace(
      /(import\s+\{[^}]*ref[^}]*\}\s+from\s+'vue')/,
      "$1\n// secondLevelNav injected by apply-final-mapping"
    )
    // 兜底
  }

  // 2. 更新 slogan ref
  src = src.replace(
    /slogan\s*=\s*ref\(['"]([^'"]*)['"]\)/g,
    "slogan = ref('" + slogan.replace(/'/g, "\\'") + "')"
  )

  // 3. 更新 template 中的 {{ secondLevelNav }} 和 {{ slogan }}
  // (如果已经是 {{ secondLevelNav }} 就保持不变，只改 script)

  await fs.writeFile(found, src, 'utf-8')
  console.log('  OK ' + compName + ' → ' + navTitle)
}

async function main() {
  let ok = 0
  for (const [comp, meta] of Object.entries(mapping)) {
    try {
      await updateComponent(comp, meta)
      ok++
    } catch (e) {
      console.log('  FAIL ' + comp + ': ' + e.message)
    }
  }
  console.log('\nDone ' + ok + '/' + Object.keys(mapping).length + ' components updated')
}

main().catch(e => { console.error('ERROR:', e); process.exit(1) })
