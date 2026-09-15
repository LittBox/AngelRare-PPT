<script setup>import { ref } from 'vue'


/**
 * SlidePractice.vue
 * 第 7 页：实践足迹（时间线）
 *
 * 内容来源（参考设计稿 slide7）：
 * - 2025.02 团队正式成立
 * - 2025.07 与罕见病患者线上访谈
 * - 2025.08 到基金会交流项目商业模式
 * - 2025.12 到云南省第一人民医院进行交流合作
 * - 2026.01 初代产品问世
 * - 2026.04 社交平台正式开启运营
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('逻辑正确')
const slogan = ref('在证伪中，走向正确')

const milestones = [
  { date: '2025.02', title: '团队正式成立', desc: '项目团队组建，确立罕见病方向' },
  { date: '2025.07', title: '患者线上访谈', desc: '与罕见病患者深度访谈，了解实际情况' },
  { date: '2025.08', title: '基金会商业模式交流', desc: '到基金会交流项目商业模式' },
  { date: '2025.12', title: '云南省一人民医院', desc: '到云南省第一人民医院进行交流合作' },
  { date: '2026.01', title: '初代产品问世', desc: '初代 AngelRare 产品正式发布' },
  { date: '2026.04', title: '社交平台开启运营', desc: '官方社交平台正式开启运营' }
]
</script>

<template>
  <div class="slide-practice">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div class="timeline-items">
        <div v-for="(m, i) in milestones" :key="i" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">{{ m.date }}</div>
          <div class="timeline-card">
            <div class="timeline-title">{{ m.title }}</div>
            <div class="timeline-desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-practice {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}

.header {
  margin-bottom: 30px;
}

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
  margin: 30px 0 60px 0;
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

.timeline-container {
  position: relative;
  padding: 40px 0;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary));
}

.timeline-items {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  position: relative;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: var(--color-accent);
  border: 4px solid #0a0a1a;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 16px rgba(0, 212, 255, 0.6);
}

.timeline-date {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-accent);
  font-family: var(--font-mono);
  letter-spacing: 2px;
}

.timeline-card {
  width: 100%;
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
}

.timeline-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
}
</style>
