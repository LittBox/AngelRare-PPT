<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideSocialImpact.vue
 * 第 27 页：社会效益
 *
 * 视觉重构（2026-09-15）：
 * - Slogan 成为第一视觉中心
 * - 3个社会价值关键词卡片
 * - 媒体报道 + 社交媒体数据
 * - 使用真实截图或素材做视觉证据
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('社会影响')
const slogan = ref('让罕见被看见，让需要被回应')

// 社会价值关键词
const impacts = [
  {
    title: '赋能医疗公平',
    icon: '⚖️',
    items: [
      '提升基层复杂疾病识别能力',
      '缩小区域医疗能力差异',
      '修复医患信息不对称'
    ]
  },
  {
    title: '重塑数据资产',
    icon: '📊',
    items: [
      '碎片化数据结构化',
      '科研与临床双向流通',
      '形成真实世界研究生态'
    ]
  },
  {
    title: '推动普惠医疗',
    icon: '🤝',
    items: [
      '辅助基层医生决策',
      '高质量医疗能力下沉',
      '带动数字医疗就业生态'
    ]
  },
]

// 媒体报道
const mediaCoverage = [
  { outlet: '中国青年报', topic: '云南大学学生团队用AI助力罕见病诊疗', date: '2026.03' },
  { outlet: '云南省科技厅官网', topic: '数字云南健康医疗重点项目入选名单', date: '2026.01' },
]

// 社交媒体
const socialMedia = [
  { platform: '微信公众号', followers: '3,200+', reach: '阅读 8.5万+' },
  { platform: '小红书', followers: '1,800+', reach: '曝光 12万+' },
  { platform: 'B站', followers: '950+', reach: '播放 4.2万+' },
]
</script>

<template>
  <div class="slide-impact">
    <SlideBg />

    <!-- Slogan 背景层 -->
    <div class="slogan-bg">{{ slogan }}</div>

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="green" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 社会价值关键词 -->
      <div class="impact-grid">
        <div v-for="(imp, i) in impacts" :key="i" class="impact-card">
          <div class="impact-icon">{{ imp.icon }}</div>
          <div class="impact-title">{{ imp.title }}</div>
          <ul class="impact-items">
            <li v-for="(item, j) in imp.items" :key="j">
              <span class="item-bullet">›</span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 媒体报道 + 社交媒体 -->
      <div class="media-row">
        <!-- 媒体报道 -->
        <div class="media-panel">
          <div class="panel-label">媒体报道</div>
          <div class="media-list">
            <div v-for="(m, i) in mediaCoverage" :key="i" class="media-item">
              <div class="mi-date">{{ m.date }}</div>
              <div class="mi-body">
                <div class="mi-outlet">{{ m.outlet }}</div>
                <div class="mi-topic">{{ m.topic }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 社交媒体 -->
        <div class="social-panel">
          <div class="panel-label">社交媒体传播</div>
          <div class="social-list">
            <div v-for="(s, i) in socialMedia" :key="i" class="social-item">
              <div class="si-platform">{{ s.platform }}</div>
              <div class="si-stat">
                <span class="stat-val">{{ s.followers }}</span>
                <span class="stat-label">粉丝</span>
              </div>
              <div class="si-stat">
                <span class="stat-val">{{ s.reach }}</span>
                <span class="stat-label">触达</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-impact {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
}

/* Slogan 背景层 */
.slogan-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 180px;
  font-weight: 900;
  letter-spacing: 8px;
  white-space: nowrap;
  color: rgba(76, 175, 80, 0.04);
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

.content {
  position: relative;
  z-index: 1;
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  min-height: 0;
}

/* 顶部 */
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
  background: linear-gradient(135deg, #ffffff 0%, #81c784 60%, #4CAF50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 社会价值关键词 */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  flex-shrink: 0;
}

.impact-card {
  padding: 24px 28px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.18);
  border-radius: var(--radius-md);
  position: relative;
}

.impact-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.impact-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.impact-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.impact-items li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.5;
}

.item-bullet {
  color: #81c784;
  font-size: var(--text-lg);
  font-weight: 700;
}

/* 媒体报道 + 社交媒体 */
.media-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.media-panel,
.social-panel {
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.panel-label {
  font-size: var(--text-sm);
  color: #81c784;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 12px;
}

.media-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-item {
  display: flex;
  gap: 14px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  align-items: flex-start;
}

.mi-date {
  font-size: var(--text-xs);
  color: var(--color-gold);
  font-family: var(--font-mono);
  font-weight: 600;
  white-space: nowrap;
  min-width: 64px;
  padding-top: 2px;
}

.mi-body {
  flex: 1;
}

.mi-outlet {
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
}

.mi-topic {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.si-platform {
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  min-width: 80px;
}

.si-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-val {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-gold);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
}
</style>
