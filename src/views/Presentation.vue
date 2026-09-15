<script setup>
/**
 * Presentation.vue
 * 整个 PPT 的主容器
 *
 * 布局核心（关键修复）：
 * - 浏览器窗口是"放映舞台"
 * - 每页 PPT 是 1920×1080 的固定 16:9 画布
 * - 不直接依赖浏览器尺寸排版，而是按比例 scale 后绝对居中
 * - scale = min(window.innerWidth / 1920, window.innerHeight / 1080)
 * - 居中 = position: absolute; left:50%; top:50%; translate(-50%,-50%) scale(...)
 *
 * 与 fullpage.js 的关系：
 * - fullpage 控制 .section 的滚动切换（不带 transform）
 * - .slide-canvas-wrapper 放在 .section 里，独立做 scale + translate 居中
 * - 导航圆点（fullpage 自带）position: fixed，不受 slide 缩放影响
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFullpage } from '@/composables/useFullpage.js'

// 引入所有 29 页幻灯片组件
import SlideCover from '@/slide-01/SlideCover.vue'
import SlideAgenda from '@/slide-02/SlideAgenda.vue'
import SlideBackground from '@/slide-03/SlideBackground.vue'
import SlideStoryIntro from '@/slide-04/SlideStoryIntro.vue'
import SlidePolicy from '@/slide-05/SlidePolicy.vue'
import SlideIdeaStage from '@/slide-06/SlideIdeaStage.vue'
import SlidePractice from '@/slide-07/SlidePractice.vue'
import SlideIteration from '@/slide-08/SlideIteration.vue'
import SlideChapter02 from '@/slide-09/SlideChapter02.vue'
import SlidePlatform from '@/slide-10/SlidePlatform.vue'
import SlidePlatformDetail from '@/slide-11/SlidePlatformDetail.vue'
import SlideAgents from '@/slide-12/SlideAgents.vue'
import SlideArguLoop from '@/slide-13/SlideArguLoop.vue'
import SlideExpResult from '@/slide-14/SlideExpResult.vue'
import SlideBenchmark from '@/slide-15/SlideBenchmark.vue'
import SlideChapter03 from '@/slide-16/SlideChapter03.vue'
import SlideBusinessModel from '@/slide-17/SlideBusinessModel.vue'
import SlideCompetitor from '@/slide-18/SlideCompetitor.vue'
import SlideRevenueModel from '@/slide-19/SlideRevenueModel.vue'
import SlideFinance from '@/slide-20/SlideFinance.vue'
import SlideChapter04 from '@/slide-21/SlideChapter04.vue'
import SlideTeamMembers from '@/slide-22/SlideTeamMembers.vue'
import SlideTeamStructure from '@/slide-23/SlideTeamStructure.vue'
import SlideAdvisors from '@/slide-24/SlideAdvisors.vue'
import SlideTechAdvisors from '@/slide-25/SlideTechAdvisors.vue'
import SlideAchievements from '@/slide-26/SlideAchievements.vue'
import SlideSocialImpact from '@/slide-27/SlideSocialImpact.vue'
import SlideVision from '@/slide-28/SlideVision.vue'
import SlideEnding from '@/slide-29/SlideEnding.vue'

const containerRef = ref(null)
const { init } = useFullpage()

// 缩放比例（让 1920×1080 的设计稿适配任意屏幕）
const scaleRatio = ref(1)

function calculateScale() {
  const designWidth = 1920
  const designHeight = 1080
  // 取较小比例，确保完整显示（不超出浏览器视口）
  scaleRatio.value = Math.min(
    window.innerWidth / designWidth,
    window.innerHeight / designHeight
  )
}

// 计算居中偏移（基于缩放后的实际像素值）
const canvasOffsetX = computed(() => -960 * scaleRatio.value)  // -1920/2 * scale
const canvasOffsetY = computed(() => -540 * scaleRatio.value)  // -1080/2 * scale
function handleResize() {
  calculateScale()
}

onMounted(() => {
  calculateScale()
  window.addEventListener('resize', handleResize)
  window.addEventListener('fullpage-resize', handleResize)

  // 初始化自研翻页（不接管 slide-canvas-wrapper，只控制 .section 切换）
  init(containerRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="containerRef" class="presentation">
    <!-- 第 1 页：封面 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideCover />
      </div>
    </div>

    <!-- 第 2 页：目录 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideAgenda />
      </div>
    </div>

    <!-- 第 3 页：第一章扉页 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideBackground />
      </div>
    </div>

    <!-- 第 4 页：故事引入 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideStoryIntro />
      </div>
    </div>

    <!-- 第 5 页：国家政策 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlidePolicy />
      </div>
    </div>

    <!-- 第 6 页：先期想法 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideIdeaStage />
      </div>
    </div>

    <!-- 第 7 页：实践足迹 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlidePractice />
      </div>
    </div>

    <!-- 第 8 页：产品迭代 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideIteration />
      </div>
    </div>

    <!-- 第 9 页：第二章扉页 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideChapter02 />
      </div>
    </div>

    <!-- 第 10 页：平台介绍 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlidePlatform />
      </div>
    </div>

    <!-- 第 11 页：平台介绍（详细） -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlidePlatformDetail />
      </div>
    </div>

    <!-- 第 12 页：SR/DP Agent -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideAgents />
      </div>
    </div>

    <!-- 第 13 页：ArguLoop -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideArguLoop />
      </div>
    </div>

    <!-- 第 14 页：实验结果 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideExpResult />
      </div>
    </div>

    <!-- 第 15 页：MedBrowseComp 测评 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideBenchmark />
      </div>
    </div>

    <!-- 第 16 页：第三章扉页 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideChapter03 />
      </div>
    </div>

    <!-- 第 17 页：商业模式 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideBusinessModel />
      </div>
    </div>

    <!-- 第 18 页：竞品分析 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideCompetitor />
      </div>
    </div>

    <!-- 第 19 页：收入模型 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideRevenueModel />
      </div>
    </div>

    <!-- 第 20 页：财务分析 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideFinance />
      </div>
    </div>

    <!-- 第 21 页：第四章扉页 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideChapter04 />
      </div>
    </div>

    <!-- 第 22 页：核心成员 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideTeamMembers />
      </div>
    </div>

    <!-- 第 23 页：团队结构 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideTeamStructure />
      </div>
    </div>

    <!-- 第 24 页：指导老师 + 医学专家 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideAdvisors />
      </div>
    </div>

    <!-- 第 25 页：技术顾问 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideTechAdvisors />
      </div>
    </div>

    <!-- 第 26 页：已有成果 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideAchievements />
      </div>
    </div>

    <!-- 第 27 页：社会效益 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideSocialImpact />
      </div>
    </div>

    <!-- 第 28 页：愿景规划 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideVision />
      </div>
    </div>

    <!-- 第 29 页：故事结尾 -->
    <div class="section">
      <div
        class="slide-canvas-wrapper"
        :style="{
          transform: `translate(${canvasOffsetX}px, ${canvasOffsetY}px) scale(${scaleRatio})`
        }"
      >
        <SlideEnding />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==============================================
   PPT 放映舞台布局（自研翻页核心）
   ==============================================
   - 整个 .presentation 是浏览器视口容器，position: relative 基准
   - 所有 .section 绝对定位叠在一起（不堆叠成纵向流）
   - 通过 active class 控制 visibility + opacity 切换
   - .slide-canvas-wrapper 是 1920×1080 固定画布，等比缩放居中
   - 不依赖 fullpage.js，不再有 transform 平移干扰
   ============================================== */

.presentation {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  background: #000;
}

/* 所有 section 绝对定位叠在一起
   fp-slide = 基础定位，opacity:0 隐藏
   active = 可见
   fp-leaving = 离开中的过渡态 */
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

/* PPT 画布：固定 1920×1080
   居中策略（最终正确版本）：
     1. wrapper 起始位置：absolute + left:50% + top:50% = section 中心
     2. transform: translate(-960*r, -540*r) scale(r)
        CSS 从右到左执行：先 scale(r) 缩放，再 translate 移动
        translate 量是 -960*r 和 -540*r (已经按 scale 算好的像素值)
        wrapper 最终位置：
          x = section_w/2 - 960*r = (section_w - 1920*r) / 2
          y = section_h/2 - 540*r = (section_h - 1080*r) / 2
        当 section_w = 1920*r, section_h = 1080*r 时，xy=0（完美填满）
        否则居中（左右上下等量黑边）
     3. transform-origin: top left 确保缩放基准稳定
*/
.slide-canvas-wrapper {
  width: 1920px;
  height: 1080px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: top left;
  /* translate + scale 由行内样式动态设置（基于 scaleRatio） */
  will-change: transform;
}
</style>

<!-- 圆点导航样式 -->
<style>
.fp-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  list-style: none;
  margin: 0;
  padding: 0;
}
.fp-nav li {
  margin: 8px 0;
  width: 12px;
  height: 12px;
}
.fp-nav a {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.fp-nav a:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}
.fp-nav a.active {
  background: #fff;
  transform: scale(1.4);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}
</style>
