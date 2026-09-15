<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

// 调研照片：9 张全部用 import 引入，确保资源加载稳定
import photo1 from '@assets/images/content/field-investigation/1.jpg'
import photo2 from '@assets/images/content/field-investigation/2.jpg'
import photo3 from '@assets/images/content/field-investigation/3.jpg'
import photo4 from '@assets/images/content/field-investigation/4.jpg'
import photo5 from '@assets/images/content/field-investigation/5.jpg'
import photo6 from '@assets/images/content/field-investigation/6.jpg'
import photo7 from '@assets/images/content/field-investigation/7.jpg'
import photo8 from '@assets/images/content/field-investigation/8.jpg'
import photo9 from '@assets/images/content/field-investigation/9.jpg'


/**
 * SlideIdeaStage.vue
 * 第 5 页：调研深入
 *
 * 视觉重构（2026-09-15 revision02）：
 * 顶部数字作为成果总览保留：
 *   5省 / 3家医院 / 10+医生 / 33类罕见病 / 76个社群 / 6000+案例
 *
 * 正文按《网评ppt方案【文字版】》要求重构：
 *   01 调研方法
 *      线上社群 / 案例分析 / 医生访谈 / 实地走访
 *   02 调研过程
 *      地域、医院、医生、患者、产业多主体调研足迹（9 张照片）
 *   03 调研成果
 *      从个体观察形成核心问题认知和项目定位
 *
 * 删除旧文案（假期自学开发 / 线上调研锚定方向 / 小组研讨方向校准）。
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('调研深入')
const slogan = ref('脚下有泥，心中才有答案')

// 顶部调研足迹数字（成果总览）
const footprints = [
  { num: '5', unit: '省', label: '实地调研覆盖' },
  { num: '3', unit: '家', label: '医院深度访谈' },
  { num: '10+', unit: '', label: '医生与专家' },
  { num: '33', unit: '类', label: '罕见病种' },
  { num: '76', unit: '个', label: '患者社群' },
  { num: '6000+', unit: '', label: '案例积累' },
]

// 01 调研方法
const methods = [
  { label: '线上社群', desc: '进入 76 个罕见病患者社群，沉淀真实诉求' },
  { label: '案例分析', desc: '梳理 6000+ 真实病例，挖掘共性痛点' },
  { label: '医生访谈', desc: '10+ 三甲医生深度访谈，校准临床方向' },
  { label: '实地走访', desc: '横跨 5 省 3 家医院，亲历诊疗全流程' },
]

// 02 调研过程：多主体调研足迹（用 9 张真实照片呈现）
const footprints_photos = [
  { src: photo1, label: '一线调研 · 北京' },
  { src: photo2, label: '一线调研 · 上海' },
  { src: photo3, label: '一线调研 · 云南' },
  { src: photo4, label: '医院访谈' },
  { src: photo5, label: '医生交流' },
  { src: photo6, label: '患者社群' },
  { src: photo7, label: '合作研讨' },
  { src: photo8, label: '产业对接' },
  { src: photo9, label: '实地访谈' },
]

// 03 调研成果
const outcomes = [
  {
    title: '从个体到群体',
    detail: '从单个患者的就医困境，识别出整个罕见病群体共同面对的系统性问题'
  },
  {
    title: '从观察到定位',
    detail: '把临床痛点转化为项目核心定位：诊断后的服务体系，而非单纯诊断工具'
  },
  {
    title: '从调研到产品',
    detail: '把真实需求收敛为产品方向：PAP / RWE / 多智能体协同的产业服务基础设施'
  },
]
</script>

<template>
  <div class="slide-idea">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 顶部数字（成果总览）-->
      <div class="footprints">
        <div v-for="(f, i) in footprints" :key="i" class="footprint-item">
          <div class="fi-num">{{ f.num }}<span class="fi-unit">{{ f.unit }}</span></div>
          <div class="fi-label">{{ f.label }}</div>
        </div>
      </div>

      <!-- 主体：左侧 01+02 / 右侧 03 + 照片网格 -->
      <div class="main-grid">
        <!-- 左列：01 调研方法 + 02 调研过程照片 -->
        <div class="left-col">
          <!-- 01 调研方法 -->
          <section class="block methods">
            <div class="block-head">
              <span class="block-num">01</span>
              <span class="block-title">调研方法</span>
            </div>
            <div class="methods-grid">
              <div v-for="(m, i) in methods" :key="i" class="method-card">
                <div class="method-label">{{ m.label }}</div>
                <div class="method-desc">{{ m.desc }}</div>
              </div>
            </div>
          </section>

          <!-- 02 调研过程：9 张真实照片 -->
          <section class="block photos">
            <div class="block-head">
              <span class="block-num">02</span>
              <span class="block-title">调研过程 · 多主体足迹</span>
            </div>
            <div class="photo-grid">
              <div v-for="(p, i) in footprints_photos" :key="i" class="photo-item">
                <img :src="p.src" :alt="p.label" />
                <div class="photo-cap">{{ p.label }}</div>
              </div>
            </div>
          </section>
        </div>

        <!-- 右列：03 调研成果 -->
        <div class="right-col">
          <section class="block outcomes">
            <div class="block-head">
              <span class="block-num">03</span>
              <span class="block-title">调研成果</span>
            </div>
            <div class="outcome-stack">
              <div v-for="(o, i) in outcomes" :key="i" class="outcome-item">
                <div class="outcome-index">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="outcome-body">
                  <div class="outcome-title">{{ o.title }}</div>
                  <div class="outcome-detail">{{ o.detail }}</div>
                </div>
              </div>
            </div>
            <div class="outcomes-quote">
              <span class="oq-mark">"</span>
              <span class="oq-text">调研不是走过场，而是把"看见一个"变成"理解一群"</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-idea {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
}

.content {
  position: relative;
  z-index: var(--z-base);
  padding: 36px 80px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  min-height: 0;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 调研足迹数字 */
.footprints {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  flex-shrink: 0;
}

.footprint-item {
  text-align: center;
  padding: 10px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.fi-num {
  font-size: 32px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--color-blue-bright);
  line-height: 1;
  margin-bottom: 4px;
}

.fi-unit {
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
}

.fi-label {
  font-size: 20px;
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 主体两列 */
.main-grid {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.left-col, .right-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.block-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.block-num {
  font-size: 28px;
  font-weight: 900;
  font-family: var(--font-mono);
  background: linear-gradient(135deg, #3C8DFF, #19C6FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.block-title {
  font-size: 22px;
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

/* 01 调研方法 */
.methods {
  flex-shrink: 0;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.method-card {
  padding: 12px 14px;
  background: rgba(57, 141, 255, 0.08);
  border: 1px solid rgba(57, 141, 255, 0.2);
  border-radius: var(--radius-md);
}

.method-label {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-blue-bright);
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.method-desc {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 300;
  line-height: 1.5;
}

/* 02 调研过程：照片网格（3×3） */
.photos {
  flex: 1;
  min-height: 0;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  flex: 1;
  min-height: 0;
}

.photo-item {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid rgba(57, 141, 255, 0.15);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-cap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 400;
}

/* 03 调研成果 */
.outcomes {
  flex: 1;
  background: rgba(76, 175, 80, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.outcome-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.outcome-item {
  display: flex;
  gap: 14px;
  flex: 1;
  min-height: 0;
  align-items: flex-start;
}

.outcome-index {
  font-size: 36px;
  font-weight: 900;
  font-family: var(--font-mono);
  background: linear-gradient(135deg, #4CAF50, #81C784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  flex-shrink: 0;
}

.outcome-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.outcome-title {
  font-size: 22px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.outcome-detail {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
  font-weight: 300;
}

.outcomes-quote {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid #4CAF50;
  border-radius: 4px;
  flex-shrink: 0;
}

.oq-mark {
  font-size: 26px;
  color: #4CAF50;
  line-height: 1;
}

.oq-text {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  font-style: italic;
}
</style>