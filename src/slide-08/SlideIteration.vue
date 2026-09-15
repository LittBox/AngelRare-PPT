<script setup>
/**
 * SlideIteration.vue
 * 第 8 页：产品迭代 1.0-5.0（证伪过程）
 *
 * 内容来源（参考设计稿 slide8）：
 * - 不是从未犯错，而是在不断证伪中走向正确
 * - 1.0 搭建四方多边平台 → 放弃（建设与信任成本过高）
 * - 2.0 患者端收费 → 放弃（资源消耗超出早期团队承载力）
 * - 3.0 聚焦医生科研（保留）
 * - 4.0 药企准入 / 5.0 PAP 管理
 * - 放弃疾病组合收费、放弃 CRO 直接承接
 */
const iterations = [
  { version: '1.0', name: '四方多边平台', status: '放弃', reason: '建设与信任成本过高', kept: false },
  { version: '2.0', name: '患者端收费', status: '放弃', reason: '资源消耗超出早期团队承载力', kept: false },
  { version: '3.0', name: '聚焦医生科研', status: '保留', reason: '切入口稳定，逐步验证', kept: true },
  { version: '4.0', name: '药企准入', status: '保留', reason: '数据沉淀到产业服务', kept: true },
  { version: '5.0', name: 'PAP 管理', status: '保留', reason: '形成产业闭环', kept: true }
]
</script>

<template>
  <div class="slide-iter">
    <div class="header">
      <div class="badge">产品迭代</div>
      <h1 class="title">从 1.0 到 5.0 的五次主动收缩</h1>
      <p class="subtitle">不是从未犯错，而是在不断证伪中走向正确</p>
    </div>

    <div class="iter-grid">
      <div
        v-for="(iter, i) in iterations"
        :key="i"
        class="iter-card"
        :class="{ 'kept': iter.kept }"
      >
        <div class="iter-version">{{ iter.version }}</div>
        <div class="iter-name">{{ iter.name }}</div>
        <div class="iter-status" :class="iter.kept ? 'status-keep' : 'status-giveup'">
          {{ iter.status }}
        </div>
        <div class="iter-reason">{{ iter.reason }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-iter {
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
  margin-bottom: 60px;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(76, 175, 80, 0.15);
  color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.title {
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  font-weight: 300;
  letter-spacing: 2px;
}

.iter-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
}

.iter-card {
  position: relative;
  padding: 32px 24px;
  background: rgba(244, 67, 54, 0.06);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: var(--radius-lg);
  text-align: center;
}

.iter-card.kept {
  background: rgba(76, 175, 80, 0.06);
  border-color: rgba(76, 175, 80, 0.2);
}

.iter-version {
  font-size: 56px;
  font-weight: 900;
  font-family: var(--font-mono);
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f44336, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.iter-card.kept .iter-version {
  background: linear-gradient(135deg, #4caf50, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.iter-name {
  font-size: var(--text-lg);
  color: white;
  font-weight: 600;
  margin-bottom: 16px;
}

.iter-status {
  display: inline-block;
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  margin-bottom: 16px;
}

.status-giveup {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.4);
}

.status-keep {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.4);
}

.iter-reason {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
}
</style>
