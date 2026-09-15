<script setup>
/**
 * SlideCover.vue
 * 第 1 页：封面
 *
 * 内容来源（参考设计稿 slide1）：
 * - 标题：罕见病科研与准入的嵌入式服务基础设施
 * - 副标题：AngelRare
 * - 负责人：郭俨霆
 * - 比赛赛道：高教主赛道
 * - 参赛院校：云南大学
 * - 组别：本科生组
 */
import { ref } from 'vue'
import logoUrl from '@assets/images/icons/project-logo.png'

const title = ref('罕见病科研与准入的嵌入式服务基础设施')
const subtitle = ref('AngelRare')
const leader = ref('郭俨霆')
const track = ref('高教主赛道')
const school = ref('云南大学')
const group = ref('本科生组')
</script>

<template>
  <div class="slide-cover">
    <!-- 背景装饰（占位，等待设计稿确定） -->
    <div class="bg-decoration"></div>

    <!-- 主内容 -->
    <div class="content">
      <!-- 左上角 logo -->
      <div class="logo-area">
        <img :src="logoUrl" alt="AngelRare Logo" class="logo" />
      </div>

      <!-- 中间主标题 -->
      <div class="main-content">
        <div class="brand-name">{{ subtitle }}</div>
        <h1 class="main-title">{{ title }}</h1>
        <div class="divider"></div>
        <div class="subtitle-en">Embedded Service Infrastructure for Rare Disease Research and Access</div>
      </div>

      <!-- 底部信息 -->
      <div class="info-bar">
        <div class="info-item">
          <span class="info-label">负责人</span>
          <span class="info-value">{{ leader }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">赛道</span>
          <span class="info-value">{{ track }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">院校</span>
          <span class="info-value">{{ school }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">组别</span>
          <span class="info-value">{{ group }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-cover {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%);
  color: white;
  overflow: hidden;
  font-family: var(--font-display);
}

/* 背景装饰（待设计稿确定具体样式） */
.bg-decoration {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(74, 108, 247, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 40%);
  pointer-events: none;
}

/* 主内容容器 */
.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 100px;
}

/* Logo 区域 */
.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 12px;
}

/* 中间主标题 */
.main-content {
  text-align: center;
  margin: auto 0;
}

.brand-name {
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 8px;
  color: var(--color-accent);
  margin-bottom: 32px;
  text-transform: uppercase;
}

.main-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 auto;
  max-width: 1400px;
  background: linear-gradient(135deg, #ffffff 0%, #b0c4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.divider {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  margin: 48px auto;
  border-radius: 2px;
}

.subtitle-en {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  letter-spacing: 2px;
  font-weight: 300;
}

/* 底部信息栏 */
.info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
  border-right: none;
}

.info-label {
  font-size: var(--text-sm);
  color: var(--color-text-dim);
  letter-spacing: 2px;
}

.info-value {
  font-size: var(--text-xl);
  font-weight: 600;
  color: white;
}
</style>
