<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideRevenueModel.vue
 * 第 19 页：落地前景
 *
 * 视觉重构（2026-09-15）：
 * - 三阶段横向铺满主体宽度
 * - 三阶段之间增加明显递进箭头
 * - 财务指标必须标注"预测 / 财务测算"
 * - ROI、PI、回收期、IRR均属于测算时，统一注明
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('落地前景')
const slogan = ref('能落地，才是真创新')

const steps = [
  { num: '1', name: '科研服务先行', desc: '数据采集与治理', price: '8-15 万 / 项目', color: '#3C8DFF' },
  { num: '2', name: '基层网络扩张', desc: '免费部署临床决策工具，嵌入转诊流程', price: '换取脱敏数据入口', color: '#19C6FF' },
  { num: '3', name: '药企规模变现', desc: '脱敏数据订阅 + 定制分析 + RWS 合作', price: '30-60 万 / 年', color: '#E8B35C' },
]

const financeMetrics = [
  { label: '投资回报率 ROI', value: '1273%', note: '预测测算', color: '#4CAF50' },
  { label: '盈利能力指数 PI', value: '10', note: '预测测算', color: '#3C8DFF' },
  { label: '静态投资回收期', value: '2.8 年', note: '预测测算', color: '#19C6FF' },
  { label: '内部收益率 IRR', value: '>60%', note: '预测测算', color: '#E8B35C' },
]
</script>

<template>
  <div class="slide-rev">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 三步走（横向铺满） -->
      <div class="steps-row">
        <div v-for="(s, i) in steps" :key="i" class="step-card" :style="{ '--step-color': s.color }">
          <div class="sc-num">{{ s.num }}</div>
          <div class="sc-body">
            <div class="sc-name">{{ s.name }}</div>
            <div class="sc-desc">{{ s.desc }}</div>
          </div>
          <div class="sc-price">{{ s.price }}</div>
        </div>
        <!-- 递进箭头（用CSS实现） -->
        <div class="arrows-overlay">
          <div class="arrow arrow-1">›</div>
          <div class="arrow arrow-2">›</div>
        </div>
      </div>

      <!-- 财务指标（明确标注预测） -->
      <div class="finance-card">
        <div class="fc-header">
          <div class="fc-label">三年盈利路径 · 关键财务指标</div>
          <div class="fc-note">以下数据为基于当前商业模型的预测测算</div>
        </div>
        <div class="metrics-row">
          <div v-for="m in financeMetrics" :key="m.label" class="metric-item" :style="{ '--m-color': m.color }">
            <div class="mi-value">{{ m.value }}</div>
            <div class="mi-label">{{ m.label }}</div>
            <div class="mi-note">{{ m.note }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-rev {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  z-index: var(--z-base);
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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

/* 三步走 */
.steps-row {
  display: flex;
  align-items: stretch;
  flex: 1;
  min-height: 0;
  gap: 0;
  position: relative;
}

.step-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 36px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 4px solid var(--step-color);
  border-radius: var(--radius-lg);
  flex: 1;
  min-width: 0;
}

.step-card:not(:first-child) {
  margin-left: 16px;
}

.sc-num {
  font-size: 56px;
  font-weight: 900;
  font-family: var(--font-mono);
  line-height: 1;
  color: var(--step-color);
}

.sc-body {
  flex: 1;
}

.sc-name {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.sc-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
}

.sc-price {
  font-size: var(--text-xl);
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--step-color);
}

/* 递进箭头 */
.arrows-overlay {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
}

.arrow {
  position: absolute;
  font-size: 48px;
  color: rgba(57, 141, 255, 0.5);
  top: 50%;
  transform: translateY(-50%);
}

.arrow-1 {
  left: calc(33.33% - 24px);
}

.arrow-2 {
  left: calc(66.66% - 24px);
}

/* 财务指标 */
.finance-card {
  padding: 28px 36px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(57, 141, 255, 0.04) 100%);
  border: 1px solid rgba(76, 175, 80, 0.20);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.fc-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.fc-label {
  font-size: var(--text-base);
  color: #4CAF50;
  font-weight: 700;
  letter-spacing: 2px;
}

.fc-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-sm);
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.metric-item {
  text-align: center;
  padding: 20px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.mi-value {
  font-size: 48px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--m-color);
  line-height: 1;
  margin-bottom: 8px;
}

.mi-label {
  font-size: var(--text-base);
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.mi-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
}
</style>
