<script setup>
import { ref } from 'vue'

// 章节扉页背景图：团队讨论 / 合作 / 路演 / 活动照片
import chapterBgUrl from '@assets/images/content/field-investigation/5.jpg'

const chapterNum = '04'
const chapterTitle = '团队协作'
const subtitle = 'Team Collaboration & Resources'

const bgUrl = ref(chapterBgUrl)
</script>

<template>
  <div class="slide-chapter">
    <!-- 真实背景照片：团队讨论 / 合作 -->
    <div class="bg-photo" :style="{ backgroundImage: `url(${bgUrl})` }"></div>

    <!-- 深色蒙版 -->
    <div class="bg-mask"></div>
    <div class="bg-line-top"></div>

    <div class="content">
      <div class="chapter-index-bg">{{ chapterNum }}</div>
      <div class="chapter-content">
        <div class="chapter-num">{{ chapterNum }}</div>
        <h1 class="chapter-title">{{ chapterTitle }}</h1>
        <div class="chapter-subtitle">{{ subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-chapter {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: #020817;
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 真实背景照片：团队讨论 / 合作 */
.bg-photo {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  opacity: 0.5;
  filter: brightness(0.7) contrast(1.05) saturate(1.0);
  z-index: 0;
}

/* 深色蒙版（团队协作用绿色生命感） */
.bg-mask {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 65% at 50% 50%, rgba(2, 8, 23, 0.78) 0%, rgba(2, 8, 23, 0.55) 50%, transparent 100%),
    linear-gradient(180deg, rgba(2, 8, 23, 0.45) 0%, transparent 25%, transparent 75%, rgba(2, 8, 23, 0.45) 100%);
  z-index: 1;
}

.bg-line-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.5), transparent);
  z-index: 2;
}

.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.chapter-index-bg {
  position: absolute;
  font-size: 600px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: rgba(76, 175, 80, 0.05);
  letter-spacing: -20px;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}
.chapter-content {
  position: relative;
  z-index: 2;
}
.chapter-num {
  font-size: 160px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-mono);
  margin-bottom: 24px;
}
.chapter-title {
  font-size: 96px;
  font-weight: 800;
  letter-spacing: 24px;
  margin: 0 0 24px 0;
  background: linear-gradient(135deg, #ffffff 0%, #81C784 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
}
.chapter-subtitle {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 8px;
  font-weight: 300;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
}
</style>