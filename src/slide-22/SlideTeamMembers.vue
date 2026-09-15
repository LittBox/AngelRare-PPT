<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

// 9 张调研/协作照片 - 用 import 引用保证资源加载稳定
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
 * SlideTeamMembers.vue (实际是团队精神页)
 * 第 21 页：团队精神
 *
 * 使用真实团队活动照片（9 张），体现团队共同经历与协作过程
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队精神')
const slogan = ref('敢想 · 会创 · 同行 · 共进')

// 4 个精神标签，对应照片
const spiritTags = [
  { label: '敢想', desc: '看见不一样的可能', color: '#3C8DFF', photo: photo1 },
  { label: '会创', desc: '把可能变成产品', color: '#19C6FF', photo: photo4 },
  { label: '同行', desc: '一起走最难的路', color: '#4CAF50', photo: photo7 },
  { label: '共进', desc: '共同成长彼此成就', color: '#E8B35C', photo: photo9 },
]

// 完整 9 张照片网格
const photos = [
  { src: photo1, caption: '实地走访调研' },
  { src: photo2, caption: '访谈与讨论' },
  { src: photo3, caption: '团队研讨' },
  { src: photo4, caption: '项目推进会议' },
  { src: photo5, caption: '协作共创' },
  { src: photo6, caption: '实践行动' },
  { src: photo7, caption: '集体讨论' },
  { src: photo8, caption: '协同工作' },
  { src: photo9, caption: '团队同行' },
]

const subSlogan = '从一个人出发，因同一目标相聚，在行动中彼此成就'
</script>

<template>
  <div class="slide-team-spirit">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 4 标签 + 大照片 -->
      <div class="spirit-row">
        <div
          v-for="(tag, i) in spiritTags"
          :key="i"
          class="spirit-card"
          :style="{ '--tag-color': tag.color }"
        >
          <div class="spirit-photo">
            <img :src="tag.photo" :alt="tag.label" />
          </div>
          <div class="spirit-info">
            <div class="spirit-label">{{ tag.label }}</div>
            <div class="spirit-desc">{{ tag.desc }}</div>
          </div>
        </div>
      </div>

      <!-- 9 张活动照片网格（具体团队实践）-->
      <div class="photo-grid">
        <div v-for="(photo, i) in photos" :key="i" class="photo-item">
          <div class="photo-frame">
            <img :src="photo.src" :alt="photo.caption" />
            <div class="photo-caption">{{ photo.caption }}</div>
          </div>
        </div>
      </div>

      <!-- 底部副标语 -->
      <div class="sub-slogan">{{ subSlogan }}</div>
    </div>
  </div>
</template>

<style scoped>
.slide-team-spirit {
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
  gap: 14px;
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

/* 4 标签行 */
.spirit-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex-shrink: 0;
}

.spirit-card {
  background: linear-gradient(135deg, color-mix(in srgb, var(--tag-color) 8%, transparent) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid color-mix(in srgb, var(--tag-color) 25%, transparent);
  border-radius: var(--radius-md);
  padding: 12px;
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 12px;
  align-items: center;
}

.spirit-photo {
  width: 90px;
  height: 90px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tag-color) 40%, transparent);
}

.spirit-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.spirit-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.spirit-label {
  font-size: 26px;
  font-weight: 800;
  color: var(--tag-color);
  letter-spacing: 3px;
  line-height: 1;
}

.spirit-desc {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
  font-weight: 300;
}

/* 3×3 照片网格 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.photo-item {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.photo-frame {
  width: 100%;
  height: 100%;
  position: relative;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-sm);
  transition: transform 0.3s ease;
}

.photo-frame:hover img {
  transform: scale(1.05);
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 400;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
}

.sub-slogan {
  text-align: center;
  font-size: 20px;
  color: var(--color-text-muted);
  letter-spacing: 3px;
  font-weight: 300;
  flex-shrink: 0;
  padding: 6px 0;
}
</style>