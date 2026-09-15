<script setup>
import { ref } from 'vue'
import photo1 from '@assets/images/content/field-investigation/1.jpg'
import photo2 from '@assets/images/content/field-investigation/2.jpg'
import photo3 from '@assets/images/content/field-investigation/3.jpg'
import photo4 from '@assets/images/content/field-investigation/4.jpg'
import photo5 from '@assets/images/content/field-investigation/5.jpg'
import photo6 from '@assets/images/content/field-investigation/6.jpg'

const secondLevelNav = ref('调研深入')
const slogan = ref('脚下有泥，心中才有答案')

// 调研过程三阶段
const phases = [
  {
    label: '项目负责人',
    title: '假期自学开发',
    desc: '项目完成从 0 到 1 的飞跃',
    photo: photo1,
    photoCaption: '自主学习与项目立项'
  },
  {
    label: '团队组建',
    title: '线上调研，锚定项目方向',
    desc: '组织团队成员开展线上调研工作，围绕国内外罕见病相关扶持政策、行业前沿研究动向展开资料搜集与深度研读。',
    photo: photo2,
    photoCaption: '线上调研与资料搜集'
  },
  {
    label: '项目启动',
    title: '小组研讨与方向校准',
    desc: '定期召开小组研讨会议，梳理行业现状与真实的临床需求，为后续项目开发筑牢理论基础、找准前进方向。',
    photo: photo3,
    photoCaption: '小组研讨与方向校准'
  }
]

// 额外展示调研过程照片组
const extraPhotos = [photo4, photo5, photo6]
</script>

<template>
  <div class="slide-idea">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 三阶段调研过程（文字 + 照片） -->
    <div class="phases">
      <div v-for="(phase, i) in phases" :key="i" class="phase-card">
        <div class="phase-label">{{ phase.label }}</div>
        <h3 class="phase-title">{{ phase.title }}</h3>
        <p class="phase-desc">{{ phase.desc }}</p>
        <!-- 调研过程照片 -->
        <div class="phase-photo">
          <img :src="phase.photo" :alt="phase.photoCaption" />
          <div class="phase-photo-caption">{{ phase.photoCaption }}</div>
        </div>
        <div class="phase-num">0{{ i + 1 }}</div>
      </div>
    </div>

    <!-- 额外调研照片组 -->
    <div class="extra-photos">
      <div v-for="(src, i) in extraPhotos" :key="i" class="extra-photo-item">
        <img :src="src" alt="调研现场" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-idea {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 80px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}

.header { margin-bottom: 16px; }

.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(74, 108, 247, 0.12);
  color: var(--color-accent, #00d4ff);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 999px;
  font-size: 16px;
  letter-spacing: 6px;
  font-weight: 400;
}

.slogan {
  margin: 0 0 24px 0;
  padding: 0;
  font-size: 84px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 6px;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 三阶段卡片 + 照片 */
.phases {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 16px;
}

.phase-card {
  position: relative;
  padding: 28px 28px 100px 28px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.phase-label {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(74, 108, 247, 0.2);
  color: var(--color-primary-light);
  border-radius: var(--radius-full);
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.phase-title {
  font-size: var(--text-xl);
  color: white;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.phase-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
  font-weight: 300;
  margin-bottom: 0;
  /* 确保文字不被裁切 */
  overflow: visible;
  white-space: normal;
  word-break: break-word;
}

.phase-photo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  overflow: hidden;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
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
  top: 12px;
  right: 16px;
  font-size: 48px;
  font-weight: 900;
  color: rgba(74, 108, 247, 0.12);
  font-family: var(--font-mono);
}

/* 额外调研照片组 */
.extra-photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: 160px;
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
