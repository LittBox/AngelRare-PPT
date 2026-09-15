<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideTeamMembers.vue (实际是团队精神页)
 * 第 21 页：团队精神
 *
 * 使用真实团队活动照片
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队精神')
const slogan = ref('敢想 · 会创 · 同行 · 共进')

// 9 张调研/协作照片，体现团队共同经历与协作过程
const photos = [
  { src: '/assets/images/content/field-investigation/1.jpg', caption: '实地走访调研' },
  { src: '/assets/images/content/field-investigation/2.jpg', caption: '访谈与讨论' },
  { src: '/assets/images/content/field-investigation/3.jpg', caption: '团队研讨' },
  { src: '/assets/images/content/field-investigation/4.jpg', caption: '项目推进会议' },
  { src: '/assets/images/content/field-investigation/5.jpg', caption: '协作共创' },
  { src: '/assets/images/content/field-investigation/6.jpg', caption: '实践行动' },
  { src: '/assets/images/content/field-investigation/7.jpg', caption: '集体讨论' },
  { src: '/assets/images/content/field-investigation/8.jpg', caption: '协同工作' },
  { src: '/assets/images/content/field-investigation/9.jpg', caption: '团队同行' }
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

      <!-- 活动照片网格 · 体现团队共同经历 -->
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
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

/* 3×3 照片网格 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.photo-item {
  position: relative;
  border-radius: var(--radius-md);
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
  border-radius: var(--radius-md);
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
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
  color: rgba(255,255,255,0.9);
  font-size: var(--text-sm);
  letter-spacing: 2px;
  font-weight: 400;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.sub-slogan {
  text-align: center;
  font-size: var(--text-base);
  color: var(--color-text-muted);
  letter-spacing: 3px;
  font-weight: 300;
  flex-shrink: 0;
}
</style>
