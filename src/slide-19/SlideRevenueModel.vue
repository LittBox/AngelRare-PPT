<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideRevenueModel.vue
 * 第 19 页：落地前景
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
  { label: '投资回报率 ROI', value: '1273%', color: '#4CAF50' },
  { label: '盈利能力指数 PI', value: '10', color: '#3C8DFF' },
  { label: '静态投资回收期', value: '2.8 年', color: '#19C6FF' },
  { label: '内部收益率 IRR', value: '>60%', color: '#E8B35C' },
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

      <!-- 三步走 -->
      <div class="steps-row">
        <div v-for="(s, i) in steps" :key="i" class="step-card" :style="{ borderTopColor: s.color }">
          <div class="sc-num" :style="{ color: s.color }">{{ s.num }}</div>
          <div class="sc-body">
            <div class="sc-name">{{ s.name }}</div>
            <div class="sc-desc">{{ s.desc }}</div>
          </div>
          <div class="sc-price" :style="{ color: s.color }">{{ s.price }}</div>
          <div v-if="i < steps.length - 1" class="sc-arrow">→</div>
        </div>
      </div>

      <!-- 财务指标 -->
      <div class="finance-card">
        <div class="fc-label">三年盈利路径 · 关键财务指标</div>
        <div class="metrics-row">
          <div v-for="m in financeMetrics" :key="m.label" class="metric-item">
            <div class="mi-value" :style="{ color: m.color }">{{ m.value }}</div>
            <div class="mi-label">{{ m.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-rev {
  width: 1920px; height: 1080px; position: relative;
  background: var(--color-bg); color: white;
  font-family: var(--font-display); overflow: hidden; display: flex; flex-direction: column;
}
.content {
  position: relative; z-index: var(--z-base);
  padding: 56px 120px 48px; display: flex; flex-direction: column; gap: 40px; height: 100%;
}
.top { display: flex; flex-direction: column; gap: 12px; }
.slogan {
  margin: 0; padding: 0; font-size: var(--text-4xl); font-weight: 800;
  line-height: 1.1; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.steps-row {
  display: grid; grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0; align-items: stretch;
}
.step-card {
  display: flex; flex-direction: column; gap: 16px;
  padding: 28px 32px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-top: 3px solid;
  border-radius: var(--radius-lg);
}
.sc-num {
  font-size: 56px; font-weight: 900; font-family: var(--font-mono); line-height: 1;
}
.sc-body { flex: 1; }
.sc-name { font-size: var(--text-2xl); font-weight: 700; color: white; letter-spacing: 2px; margin-bottom: 8px; }
.sc-desc { font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.6; font-weight: 300; }
.sc-price { font-size: var(--text-xl); font-weight: 900; font-family: var(--font-mono); }
.sc-arrow {
  display: flex; align-items: center; font-size: 36px; color: rgba(57,141,255,0.4);
  padding: 0 12px;
}
.finance-card {
  padding: 32px 40px;
  background: linear-gradient(135deg, rgba(76,175,80,0.06) 0%, rgba(57,141,255,0.04) 100%);
  border: 1px solid rgba(76,175,80,0.20); border-radius: var(--radius-lg);
  margin-top: auto;
}
.fc-label { font-size: var(--text-base); color: #4CAF50; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px; }
.metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.metric-item { text-align: center; padding: 16px; }
.mi-value { font-size: 56px; font-weight: 900; font-family: var(--font-mono); line-height: 1; margin-bottom: 8px; }
.mi-label { font-size: var(--text-base); color: var(--color-text-muted); letter-spacing: 1px; }
</style>
