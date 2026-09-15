<script setup>
/**
 * Presentation.vue
 * 整个 PPT 的主容器（最终版：25 页 5 类型）
 *
 * 完整结构（永久冻结）：
 *   P01 封面
 *   P02 总目录
 *   P03 一级章节扉页：个人成长
 *   P04-P08 5 个二级内容页（个人成长）
 *   P09 一级章节扉页：项目创新
 *   P10-P14 5 个二级内容页（项目创新）
 *   P15 一级章节扉页：产业价值
 *   P16-P19 4 个二级内容页（产业价值）
 *   P20 一级章节扉页：团队协作
 *   P21-P24 4 个二级内容页（团队协作）
 *   P25 致谢
 *
 * 铁律：
 *   1. 页面总数永远保持 25 页
 *   2. 五种 type 必须区分：cover / toc / section / content / thanks
 *   3. 不得删除任何一类页面（包括 cover / thanks）
 *   4. 此次任务允许修改"页面怎么设计"，不允许修改"有哪些页面、页面叫什么、页面排在哪里"
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFullpage } from '@/composables/useFullpage.js'
import pageManifest from '@/../assets/data/slogan-canon.json'

// ============== P01 封面 ==============
import SlideCover from '@/slide-01/SlideCover.vue'

// ============== P02 总目录 ==============
import SlideAgenda from '@/slide-02/SlideAgenda.vue'

// ============== 一级章节扉页 ==============
import SlideChapter01 from '@/slide-03/SlideChapter01.vue'
import SlideChapter02 from '@/slide-09/SlideChapter02.vue'
import SlideChapter03 from '@/slide-16/SlideChapter03.vue'
import SlideChapter04 from '@/slide-21/SlideChapter04.vue'

// ============== 二级内容页（按 pageIndex 顺序） ==============
import SlidePolicy from '@/slide-05/SlidePolicy.vue'             // P04 立德树人
import SlideIdeaStage from '@/slide-06/SlideIdeaStage.vue'       // P05 调研深入
import SlidePractice from '@/slide-07/SlidePractice.vue'         // P06 逻辑正确
import SlideIteration from '@/slide-08/SlideIteration.vue'       // P07 知识掌握与应用能力
import SlideAchievements from '@/slide-26/SlideAchievements.vue' // P08 人才培养成效
import SlideStoryIntro from '@/slide-04/SlideStoryIntro.vue'      // P10 问题导向
import SlideAgents from '@/slide-12/SlideAgents.vue'             // P11 目标导向
import SlideArguLoop from '@/slide-13/SlideArguLoop.vue'         // P12 技术创新
import SlideExpResult from '@/slide-14/SlideExpResult.vue'       // P13 服务模式创新
import SlideBenchmark from '@/slide-15/SlideBenchmark.vue'       // P14 商业模式创新
import SlideBusinessModel from '@/slide-17/SlideBusinessModel.vue' // P16 产业认知
import SlideCompetitor from '@/slide-18/SlideCompetitor.vue'     // P17 市场定位
import SlideRevenueModel from '@/slide-19/SlideRevenueModel.vue' // P18 落地前景
import SlideFinance from '@/slide-20/SlideFinance.vue'           // P19 社会影响
import SlideTeamMembers from '@/slide-22/SlideTeamMembers.vue'   // P21 团队精神
import SlideTeamStructure from '@/slide-23/SlideTeamStructure.vue' // P22 团队结构
import SlideAdvisors from '@/slide-24/SlideAdvisors.vue'         // P23 团队效能
import SlideTechAdvisors from '@/slide-25/SlideTechAdvisors.vue' // P24 团队资源

// ============== P25 致谢 ==============
import SlideEnding from '@/slide-29/SlideEnding.vue'

// ============== 组件映射 ==============
const componentMap = {
  SlideCover, SlideAgenda, SlideEnding,
  SlideChapter01, SlideChapter02, SlideChapter03, SlideChapter04,
  SlidePolicy, SlideIdeaStage, SlidePractice, SlideIteration, SlideAchievements,
  SlideStoryIntro, SlideAgents, SlideArguLoop, SlideExpResult, SlideBenchmark,
  SlideBusinessModel, SlideCompetitor, SlideRevenueModel, SlideFinance,
  SlideTeamMembers, SlideTeamStructure, SlideAdvisors, SlideTechAdvisors
}

// ============== 强制顺序校验 ==============
function buildOrderedSlides() {
  // 🔒 强制按 pageIndex 排序
  const sorted = [...pageManifest.pages].sort((a, b) => a.pageIndex - b.pageIndex)

  // 🔒 强制校验：总数必须是 25 页
  if (sorted.length !== 25) {
    const msg = '顺序校验失败：页面总数必须为 25 页，实际 ' + sorted.length + ' 页'
    console.error(msg)
    throw new Error(msg)
  }

  // 🔒 强制校验：pageIndex 必须连续 1-25
  for (let i = 0; i < 25; i++) {
    if (sorted[i].pageIndex !== i + 1) {
      const msg = '顺序校验失败：pageIndex 不连续。预期 ' + (i + 1) + '，实际 ' + sorted[i].pageIndex
      console.error(msg)
      throw new Error(msg)
    }
  }

  // 🔒 强制校验：顺序必须与 expectedOrder 100% 一致
  const actualOrder = sorted.map((p) => {
    if (p.type === 'cover') return '封面'
    if (p.type === 'toc') return '目录'
    if (p.type === 'section') return (p.sectionIndex || '') + ' ' + p.section
    if (p.type === 'content') return p.navTitle
    if (p.type === 'thanks') return '致谢'
    return ''
  })
  const expected = pageManifest.expectedOrder

  if (actualOrder.length !== expected.length) {
    const msg = '顺序校验失败：expectedOrder 数量不匹配。预期 ' + expected.length + ' 项，实际 ' + actualOrder.length + ' 项'
    console.error(msg)
    throw new Error(msg)
  }

  for (let i = 0; i < expected.length; i++) {
    if (actualOrder[i] !== expected[i]) {
      const msg = '顺序校验失败：P' + (i + 1) + ' 不一致。预期 "' + expected[i] + '"，实际 "' + actualOrder[i] + '"'
      console.error(msg)
      console.error('  完整实际顺序:', actualOrder)
      throw new Error(msg)
    }
  }

  // 🔒 强制校验：5 种 type 都必须存在（每种至少 1 页）
  const typeCount = {}
  for (const p of sorted) {
    typeCount[p.type] = (typeCount[p.type] || 0) + 1
  }
  for (const t of ['cover', 'toc', 'section', 'content', 'thanks']) {
    if (!typeCount[t]) {
      const msg = '类型校验失败：缺失 type="' + t + '"。所有 5 种类型（cover/toc/section/content/thanks）都必须存在'
      console.error(msg)
      throw new Error(msg)
    }
  }

  // 🔒 强制校验：必须恰好 4 个 section（4 个一级章节）
  if (typeCount.section !== 4) {
    const msg = '章节扉页数量校验失败：必须恰好 4 个 section，实际 ' + typeCount.section
    console.error(msg)
    throw new Error(msg)
  }

  // 🔒 强制校验：必须恰好 18 个 content
  if (typeCount.content !== 18) {
    const msg = '二级内容页数量校验失败：必须恰好 18 个 content，实际 ' + typeCount.content
    console.error(msg)
    throw new Error(msg)
  }

  console.log('顺序校验通过：25 页结构完整（1封面+1目录+4扉页+18内容+1致谢），顺序与 expectedOrder 100% 一致')
  return sorted
}

// ============== 缩放 ==============
const containerRef = ref(null)
const { init } = useFullpage()
const scaleRatio = ref(1)
const renderError = ref(null)

function calculateScale() {
  const designWidth = 1920
  const designHeight = 1080
  scaleRatio.value = Math.min(
    window.innerWidth / designWidth,
    window.innerHeight / designHeight
  )
}

const canvasOffsetX = computed(() => -960 * scaleRatio.value)
const canvasOffsetY = computed(() => -540 * scaleRatio.value)

function handleResize() {
  calculateScale()
}

// ============== 构造 slides（强制排序） ==============
let slides
try {
  slides = buildOrderedSlides()
  // 🔒 打印最终 25 页顺序供人工核查
  console.log('\n最终 25 页结构：')
  slides.forEach((s) => {
    let label
    if (s.type === 'cover') label = '[封面] ' + s.title
    else if (s.type === 'toc') label = '[总目录] ' + s.title
    else if (s.type === 'section') label = '[' + s.sectionIndex + ' ' + s.section + '] (章节扉页)'
    else if (s.type === 'content') label = '[' + s.section + '] ' + s.navTitle + ' | ' + s.slogan
    else if (s.type === 'thanks') label = '[致谢] ' + s.title
    const pi = String(s.pageIndex).padStart(2, '0')
    console.log('  P' + pi + ' ' + label)
  })
  console.log('')
} catch (e) {
  renderError.value = e.message
  slides = []
}

// ============== 生命周期 ==============
onMounted(() => {
  if (renderError.value) return
  calculateScale()
  window.addEventListener('resize', handleResize)
  window.addEventListener('fullpage-resize', handleResize)
  init(containerRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div v-if="renderError" class="render-error">
    <h1>渲染失败</h1>
    <pre>{{ renderError }}</pre>
    <p>页面结构与定稿 Page Manifest 不一致。不得自行修复，请联系定稿提供方。</p>
  </div>

  <div v-else ref="containerRef" class="presentation">
    <div
      v-for="(slide, idx) in slides"
      :key="idx"
      class="section"
      :class="'type-' + slide.type"
      :data-page-index="slide.pageIndex"
      :data-type="slide.type"
      :data-section="slide.section || ''"
      :data-nav-title="slide.navTitle || slide.title || slide.type"
    >
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <component :is="componentMap[slide.slideComponent]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.presentation {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  background: #000;
}

.section {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease-in-out, visibility 0.6s;
  pointer-events: none;
}

.section.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.slide-canvas-wrapper {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: top left;
  will-change: transform;
}

.render-error {
  position: fixed;
  inset: 0;
  background: #1a0000;
  color: #ff6b6b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: monospace;
}
.render-error h1 { font-size: 48px; margin-bottom: 20px; }
.render-error pre {
  font-size: 18px;
  background: rgba(0,0,0,0.5);
  padding: 20px;
  border-radius: 8px;
  max-width: 80vw;
  white-space: pre-wrap;
}
.render-error p { font-size: 18px; margin-top: 20px; }
</style>

<!-- 25 节点圆点导航：5 种 type 视觉层级 -->
<style>
.fp-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  list-style: none;
  margin: 0;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.fp-nav li { display: flex; justify-content: center; }

.fp-nav a {
  display: block;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

/* 封面节点（最大圆点，渐变色） */
.fp-nav a.type-cover {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a6cf7, #00d4ff);
  box-shadow: 0 0 8px rgba(74, 108, 247, 0.7);
}

/* 总目录节点（大圆点） */
.fp-nav a.type-toc {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9800, #ffd180);
  box-shadow: 0 0 6px rgba(255, 152, 0, 0.6);
}

/* 一级章节扉页节点（中等菱形） */
.fp-nav a.type-section {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(45deg);
  border: 1px solid rgba(0, 212, 255, 0.6);
}

/* 二级内容页节点（小圆点） */
.fp-nav a.type-content {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

/* 致谢节点（最大圆点，渐变色） */
.fp-nav a.type-thanks {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ffd180);
  box-shadow: 0 0 8px rgba(255, 107, 107, 0.7);
}

.fp-nav a:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.3);
}

.fp-nav a.type-section:hover {
  transform: rotate(45deg) scale(1.3);
}

.fp-nav a.active {
  background: #ffffff !important;
  transform: scale(1.6);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
}

.fp-nav a.type-section.active {
  transform: rotate(45deg) scale(1.6);
}

/* Tooltip 悬浮提示 */
.fp-nav a[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
