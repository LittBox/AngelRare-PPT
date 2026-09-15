<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideIdeaStage.vue
 * 第 5 页：调研深入
 *
 * 视觉重构（2026-09-15）：
 * - 使用真实调研照片
 * - 三阶段卡片 + 额外照片组
 * - 下部可以加入调研足迹路线、5省调研地图等
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('调研深入')
const slogan = ref('脚下有泥，心中才有答案')

// 调研足迹数字
const footprints = [
  { num: '5', unit: '省', label: '实地调研覆盖' },
  { num: '3', unit: '家', label: '医院深度访谈' },
  { num: '10+', unit: '', label: '医生与专家' },
  { num: '33', unit: '类', label: '罕见病种' },
  { num: '76', unit: '个', label: '患者社群' },
  { num: '6000+', unit: '', label: '案例积累' },
]

// 调研过程三阶段
const phases = [
  {
    label: '项目负责人',
    title: '假期自学开发',
    desc: '项目完成从 0 到 1 的飞跃',
    photoUrl: '/assets/images/content/field-investigation/1.jpg',
    photoCaption: '自主学习与项目立项'
  },
  {
    label: '团队组建',
    title: '线上调研，锚定项目方向',
    desc: '组织团队成员开展线上调研工作，围绕国内外罕见病相关扶持政策、行业前沿研究动向展开资料搜集与深度研读。',
    photoUrl: '/assets/images/content/field-investigation/2.jpg',
    photoCaption: '线上调研与资料搜集'
  },
  {
    label: '项目启动',
    title: '小组研讨与方向校准',
    desc: '定期召开小组研讨会议，梳理行业现状与真实的临床需求，为后续项目开发筑牢理论基础、找准前进方向。',
    photoUrl: '/assets/images/content/field-investigation/3.jpg',
    photoCaption: '小组研讨与方向校准'
  }
]

// 额外展示调研过程照片组
const extraPhotos = [
  { src: '/assets/images/content/field-investigation/4.jpg', alt: '调研现场4' },
  { src: '/assets/images/content/field-investigation/5.jpg', alt: '调研现场5' },
  { src: '/assets/images/content/field-investigation/6.jpg', alt: '调研现场6' },
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

      <!-- 调研足迹数字 -->
      <div class="footprints">
        <div v-for="(f, i) in footprints" :key="i" class="footprint-item">
          <div class="fi-num">{{ f.num }}<span class="fi-unit">{{ f.unit }}</span></div>
          <div class="fi-label">{{ f.label }}</div>
        </div>
      </div>

      <!-- 三阶段调研过程（文字 + 照片） -->
      <div class="phases">
        <div v-for="(phase, i) in phases" :key="i" class="phase-card">
          <div class="phase-label">{{ phase.label }}</div>
          <h3 class="phase-title">{{ phase.title }}</h3>
          <p class="phase-desc">{{ phase.desc }}</p>
          <div class="phase-photo">
            <img :src="phase.photoUrl" :alt="phase.photoCaption" />
            <div class="phase-photo-caption">{{ phase.photoCaption }}</div>
          </div>
          <div class="phase-num">0{{ i + 1 }}</div>
        </div>
      </div>

      <!-- 额外调研照片组 -->
      <div class="extra-photos">
        <div v-for="(p, i) in extraPhotos" :key="i" class="extra-photo-item">
          <img :src="p.src" :alt="p.alt" />
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
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  min-height: 0;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 调研足迹 */
.footprints {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  flex-shrink: 0;
}

.footprint-item {
  text-align: center;
  padding: 14px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.fi-num {
  font-size: var(--text-2xl);
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--color-blue-bright);
  line-height: 1;
  margin-bottom: 4px;
}

.fi-unit {
  font-size: var(--text-base);
  font-weight: 600;
  margin-left: 2px;
}

.fi-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 三阶段卡片 */
.phases {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.phase-card {
  position: relative;
  padding: 20px 20px 90px 20px;
  background: linear-gradient(135deg, rgba(57, 141, 255, 0.08) 0%, rgba(25, 198, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.phase-label {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(57, 141, 255, 0.2);
  color: var(--color-blue-bright);
  border-radius: var(--radius-full);
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.phase-title {
  font-size: var(--text-lg);
  color: white;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.phase-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
  overflow: visible;
  white-space: normal;
  word-break: break-word;
}

.phase-photo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  overflow: hidden;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.phase-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.phase-photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px 8px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: rgba(255,255,255,0.8);
  font-size: 11px;
  letter-spacing: 1px;
}

.phase-num {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 40px;
  font-weight: 900;
  color: rgba(57, 141, 255, 0.12);
  font-family: var(--font-mono);
}

/* 额外调研照片组 */
.extra-photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  height: 100px;
  flex-shrink: 0;
}

.extra-photo-item {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.extra-photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
