<script setup>
import { ref } from 'vue'
import photo1 from '@assets/images/content/field-investigation/1.jpg'
import photo2 from '@assets/images/content/field-investigation/2.jpg'
import photo3 from '@assets/images/content/field-investigation/3.jpg'
import photo4 from '@assets/images/content/field-investigation/4.jpg'
import photo5 from '@assets/images/content/field-investigation/5.jpg'
import photo6 from '@assets/images/content/field-investigation/6.jpg'
import photo7 from '@assets/images/content/field-investigation/7.jpg'
import photo8 from '@assets/images/content/field-investigation/8.jpg'
import photo9 from '@assets/images/content/field-investigation/9.jpg'

const secondLevelNav = ref('团队精神')
const slogan = ref('敢想 · 会创 · 同行 · 共进')

// 9 张调研/协作照片，体现团队共同经历与协作过程
const photos = [
  { src: photo1, caption: '实地走访调研' },
  { src: photo2, caption: '访谈与讨论' },
  { src: photo3, caption: '团队研讨' },
  { src: photo4, caption: '项目推进会议' },
  { src: photo5, caption: '协作共创' },
  { src: photo6, caption: '实践行动' },
  { src: photo7, caption: '集体讨论' },
  { src: photo8, caption: '协同工作' },
  { src: photo9, caption: '团队同行' }
]
</script>

<template>
  <div class="slide-team-spirit">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

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
    <div class="sub-slogan">从一个人出发，因同一目标相聚，在行动中彼此成就</div>
  </div>
</template>

<style scoped>
.slide-team-spirit {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 100px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

/* 3×3 照片网格 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  flex: 1;
  overflow: hidden;
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
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 400;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.sub-slogan {
  margin-top: 16px;
  text-align: center;
  font-size: var(--text-base);
  color: var(--color-text-muted);
  letter-spacing: 3px;
  font-weight: 300;
}
</style>
