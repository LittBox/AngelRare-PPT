<script setup>
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
    <!-- 多层背景 -->
    <div class="bg-layer-1"></div>
    <div class="bg-layer-2"></div>
    <div class="bg-layer-3"></div>
    <div class="bg-layer-4"></div>
    <div class="bg-glow-tl"></div>
    <div class="bg-glow-br"></div>
    <div class="bg-dna-grid"></div>

    <!-- 主内容 -->
    <div class="content">
      <!-- 左上角 Logo -->
      <div class="logo-area">
        <img :src="logoUrl" alt="AngelRare Logo" class="logo" />
        <div class="logo-glow"></div>
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
          <span class="info-value gold">{{ leader }}</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-label">赛道</span>
          <span class="info-value">{{ track }}</span>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <span class="info-label">院校</span>
          <span class="info-value">{{ school }}</span>
        </div>
        <div class="info-divider"></div>
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
  background: #020817;
  color: white;
  overflow: hidden;
  font-family: var(--font-display);
}

/* 多层背景 */
.bg-layer-1 {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 120% 80% at 50% 0%, #040819 0%, #020817 60%, #010610 100%);
}
.bg-layer-2 {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(47, 128, 255, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 20% 80%, rgba(232, 179, 92, 0.05) 0%, transparent 70%);
}
.bg-layer-3 {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(2, 8, 23, 0.7) 100%);
}
.bg-layer-4 {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(57, 141, 255, 0.03) 0%, transparent 40%);
}
.bg-glow-tl {
  position: absolute;
  top: -200px;
  left: -200px;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(47, 128, 255, 0.12) 0%, transparent 70%);
  filter: blur(60px);
}
.bg-glow-br {
  position: absolute;
  bottom: -200px;
  right: -200px;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(232, 179, 92, 0.08) 0%, transparent 70%);
  filter: blur(60px);
}
.bg-dna-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(57, 141, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 141, 255, 0.04) 1px, transparent 1px);
  background-size: 100px 100px;
}

/* 主内容 */
.content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 140px;
}

/* Logo */
.logo-area {
  position: relative;
  display: inline-block;
}
.logo {
  width: 96px;
  height: 96px;
  object-fit: contain;
  position: relative;
  z-index: 2;
}
.logo-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(232, 179, 92, 0.25) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 1;
}

/* 中间主标题 */
.main-content {
  text-align: center;
  margin: auto 0;
}
.brand-name {
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 12px;
  color: var(--color-gold);
  margin-bottom: 32px;
  text-transform: uppercase;
}
.main-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.3;
  margin: 0 auto;
  max-width: 1400px;
  background: linear-gradient(135deg, #ffffff 0%, #c8d8ff 60%, #78A6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.divider {
  width: 160px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-blue-mid), var(--color-gold), transparent);
  margin: 48px auto;
  border-radius: 2px;
}
.subtitle-en {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 3px;
  font-weight: 300;
}

/* 底部信息栏 */
.info-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 28px 60px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
}
.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  padding: 0 40px;
}
.info-label {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 3px;
  text-transform: uppercase;
}
.info-value {
  font-size: var(--text-xl);
  font-weight: 600;
  color: white;
  letter-spacing: 2px;
}
.info-value.gold { color: var(--color-gold); }
.info-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.10);
  flex-shrink: 0;
}
</style>
