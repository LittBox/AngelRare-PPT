<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideAgents.vue
 * 第 12 页：创新成效｜技术创新
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「创新成效｜技术创新」
 *   Slogan：「不只生成答案，更要证明答案」
 *
 * 视觉重构（2026-09-15）：
 * - 上半部分：一条完整技术推理链（S1→S2→ArguLoop→贝叶斯）
 * - 下半部分：3个核心实验指标，不再是小表格
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜技术创新')
const slogan = ref('不只生成答案，更要证明答案')

// 技术推理链（4步）
const techChain = [
  {
    step: 'S1',
    name: '快思考',
    desc: '直觉判断，快速生成候选结论',
    icon: '⚡',
    color: '#FF9800',
  },
  {
    step: 'S2',
    name: '多智能体专业协同',
    desc: 'SR Agent + DP Agent + 7大专业子Agent协作',
    icon: '🤖',
    color: '#3C8DFF',
  },
  {
    step: 'S3',
    name: 'ArguLoop 动态论辩',
    desc: '像法庭质证一样解决证据冲突',
    icon: '⚖️',
    color: '#78A6FF',
  },
  {
    step: 'S4',
    name: '贝叶斯全局仲裁',
    desc: '基于Log-Odds的证据融合与置信度重估',
    icon: '📊',
    color: '#4CAF50',
  },
]

// 实验结果（3个核心指标）
const expResult = {
  title: 'MedBrowseComp 外部测评结果',
  source: '哈佛大学医学AI基准数据集 · 1000+ 道题目',
  metrics: [
    {
      label: '准确率',
      value: '68%',
      note: 'AngelRare',
      color: '#00d4ff',
      highlight: true,
    },
    {
      label: '相对基线提升',
      value: '+16pt',
      note: 'vs 无检索基线',
      color: '#4CAF50',
      highlight: true,
    },
    {
      label: 'Macro-F1',
      value: '0.535',
      note: '宏F1',
      color: '#E8B35C',
      highlight: false,
    },
  ],
  conclusion: '引入检索流水线后，准确率取得 16 个百分点的绝对提升',
}

// 对比数据
const comparison = {
  our: { model: 'AngelRare (RAG + Opus 4.6)', acc: '0.680', f1: '0.535' },
  baseline: { model: '纯大语言模型（无检索基线）', acc: '0.520', f1: '0.445' },
}
</script>

<template>
  <div class="slide-agents">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 上半部分：技术推理链 -->
      <div class="tech-chain">
        <div
          v-for="(t, i) in techChain"
          :key="i"
          class="tech-step"
          :style="{ '--step-color': t.color }"
        >
          <div class="ts-step">{{ t.step }}</div>
          <div class="ts-icon">{{ t.icon }}</div>
          <div class="ts-name">{{ t.name }}</div>
          <div class="ts-desc">{{ t.desc }}</div>
          <div v-if="i < techChain.length - 1" class="ts-arrow">›</div>
        </div>
      </div>

      <!-- 下半部分：3个核心指标 -->
      <div class="exp-section">
        <div class="exp-header">
          <div class="exp-title">{{ expResult.title }}</div>
          <div class="exp-source">{{ expResult.source }}</div>
        </div>

        <!-- 3个核心指标（放大展示） -->
        <div class="key-metrics">
          <div
            v-for="(m, i) in expResult.metrics"
            :key="i"
            class="metric-card"
            :class="{ highlight: m.highlight }"
            :style="{ '--m-color': m.color }"
          >
            <div class="mc-value">{{ m.value }}</div>
            <div class="mc-label">{{ m.label }}</div>
            <div class="mc-note">{{ m.note }}</div>
          </div>
        </div>

        <!-- 对比表格（简化，只留2行） -->
        <div class="compare-table">
          <div class="ct-row our">
            <div class="ct-model">
              <span class="our-tag">完整版</span>
              {{ comparison.our.model }}
            </div>
            <div class="ct-num">{{ comparison.our.acc }}</div>
            <div class="ct-num">{{ comparison.our.f1 }}</div>
          </div>
          <div class="ct-row">
            <div class="ct-model">{{ comparison.baseline.model }}</div>
            <div class="ct-num">{{ comparison.baseline.acc }}</div>
            <div class="ct-num delta">{{ comparison.baseline.f1 }}</div>
          </div>
        </div>

        <!-- 结论 -->
        <div class="exp-conclusion">{{ expResult.conclusion }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-agents {
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
  gap: 28px;
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
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 技术推理链 */
.tech-chain {
  display: flex;
  align-items: stretch;
  flex: 1;
  min-height: 0;
  gap: 0;
}

.tech-step {
  position: relative;
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top: 3px solid var(--step-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.ts-step {
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--step-color);
  font-weight: 600;
  opacity: 0.6;
}

.ts-icon {
  font-size: 40px;
  margin: 4px 0;
}

.ts-name {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--step-color);
  letter-spacing: 2px;
}

.ts-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.5;
  margin-top: auto;
}

.ts-arrow {
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  color: rgba(57, 141, 255, 0.4);
  z-index: 2;
}

/* 实验结果 */
.exp-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(57, 141, 255, 0.15);
  border-radius: var(--radius-md);
  padding: 24px 32px;
  flex-shrink: 0;
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.exp-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.exp-source {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 3个核心指标（放大展示） */
.key-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.metric-card {
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
}

.metric-card.highlight {
  background: color-mix(in srgb, var(--m-color) 8%, transparent);
  border-color: color-mix(in srgb, var(--m-color) 30%, transparent);
}

.mc-value {
  font-size: 48px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--m-color);
  line-height: 1;
  margin-bottom: 8px;
}

.mc-label {
  font-size: var(--text-base);
  color: white;
  font-weight: 600;
  margin-bottom: 4px;
}

.mc-note {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 对比表格（简化） */
.compare-table {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 12px;
}

.ct-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: var(--text-sm);
}

.ct-row.our {
  background: rgba(0, 212, 255, 0.05);
}

.ct-model {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-muted);
}

.ct-row.our .ct-model {
  color: var(--color-blue-bright);
  font-weight: 600;
}

.our-tag {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(0, 212, 255, 0.2);
  color: var(--color-blue-bright);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.ct-num {
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--color-text-muted);
}

.ct-row.our .ct-num {
  color: var(--color-blue-bright);
  font-weight: 700;
}

.delta {
  color: #f44336 !important;
}

/* 结论 */
.exp-conclusion {
  font-size: var(--text-base);
  color: #4CAF50;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  padding: 10px 16px;
  background: rgba(76, 175, 80, 0.08);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(76, 175, 80, 0.2);
}
</style>
