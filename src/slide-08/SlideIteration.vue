<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideIteration.vue
 * 第 7 页：知识掌握与应用能力
 *
 * 视觉重构（2026-09-15）：
 * 原文案不变，视觉按规范重做。
 *
 * 核心视觉逻辑：
 *  数学 ──→ AI ──→ 医疗
 *  贝叶斯推理 ──→ 大模型+多智能体 ──→ 罕见病真实场景
 *  三段大留白叙事，不是12张小卡片
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('知识掌握与应用能力')
const slogan = ref('所学不止于书本，所知终用于真实')

// 三个知识领域
const pillars = [
  {
    label: '数学',
    pillar: 'PILLAR 01',
    title: '概率与推理规则',
    keywords: ['贝叶斯推断', 'Log-Odds', '统计建模', '概率图模型'],
    color: '#3C8DFF',
    highlight: '贝叶斯',
    icon: '∑',
  },
  {
    label: 'AI',
    pillar: 'PILLAR 02',
    title: '计算与智能能力',
    keywords: ['大语言模型', '多智能体系统', 'ArguLoop论辩', 'NHSC Agent'],
    color: '#78A6FF',
    highlight: '多智能体',
    icon: '◆',
  },
  {
    label: '医疗',
    pillar: 'PILLAR 03',
    title: '真实问题与场景',
    keywords: ['罕见病诊断', '循证推理', 'PAP管理', '真实世界数据RWE'],
    color: '#E8B35C',
    highlight: '罕见病',
    icon: '✦',
  },
]

// 核心案例：贝叶斯仲裁器
const bayesCase = {
  title: '贝叶斯仲裁器',
  subtitle: '数学 × AI × 医疗的交汇点',
  description: '当S1快思考与S2慢推理出现分歧时，贝叶斯仲裁器根据"原来有多相信"+"新证据到底有多强"，重新计算每个结论的可信程度。',
  steps: [
    { phase: 'S1快思考', result: '疾病A 70% · B 20% · C 10%', color: '#FF9800' },
    { phase: 'S2慢推理', result: '发现基因证据指向B', color: '#3C8DFF' },
    { phase: 'ArguLoop', result: '辩论后MetaEvaluator仲裁', color: '#78A6FF' },
    { phase: '贝叶斯仲裁', result: 'A 30% · B 62% · C 8%', color: '#4CAF50' },
  ],
}

// 底部核心句
const coreSentence = ref('数学给出推理规则，AI赋予计算能力，医疗提供真实问题')
</script>

<template>
  <div class="slide-iter">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 三段大留白叙事 -->
      <div class="pillars">
        <div
          v-for="(p, i) in pillars"
          :key="i"
          class="pillar"
          :style="{ '--pillar-color': p.color }"
        >
          <div class="pillar-index">{{ p.pillar }}</div>
          <div class="pillar-label">{{ p.label }}</div>
          <div class="pillar-title">{{ p.title }}</div>
          <div class="pillar-icon">{{ p.icon }}</div>
          <div class="pillar-keywords">
            <span
              v-for="(kw, j) in p.keywords"
              :key="j"
              class="kw-tag"
              :class="{ 'kw-highlight': kw === p.highlight }"
            >{{ kw }}</span>
          </div>

          <!-- 连接箭头（除最后一个） -->
          <div v-if="i < pillars.length - 1" class="pillar-arrow">→</div>
        </div>
      </div>

      <!-- 核心案例：贝叶斯仲裁器 -->
      <div class="bayes-case">
        <div class="bc-header">
          <div class="bc-title">{{ bayesCase.title }}</div>
          <div class="bc-subtitle">{{ bayesCase.subtitle }}</div>
        </div>
        <div class="bc-desc">{{ bayesCase.description }}</div>
        <div class="bc-steps">
          <div
            v-for="(step, i) in bayesCase.steps"
            :key="i"
            class="bc-step"
          >
            <div class="bs-num" :style="{ background: step.color }">{{ i + 1 }}</div>
            <div class="bs-phase">{{ step.phase }}</div>
            <div class="bs-result" :style="{ color: step.color }">{{ step.result }}</div>
            <div v-if="i < bayesCase.steps.length - 1" class="bs-arrow">›</div>
          </div>
        </div>
      </div>

      <!-- 底部核心句 -->
      <div class="core-sentence">
        <span class="cs-icon">✦</span>
        <span class="cs-text">{{ coreSentence }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-iter {
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
  padding: 60px 120px 48px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

/* 三段叙事 */
.pillars {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  align-items: stretch;
  flex: 1;
}

.pillar {
  position: relative;
  padding: 40px 36px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--pillar-color, rgba(255, 255, 255, 0.08));
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pillar:first-child { border-left: 3px solid var(--pillar-color); }
.pillar:last-child  { border-right: 3px solid var(--pillar-color); }

.pillar-index {
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--pillar-color);
  font-weight: 600;
  opacity: 0.6;
}

.pillar-label {
  font-size: 56px;
  font-weight: 900;
  color: var(--pillar-color);
  line-height: 1;
  letter-spacing: 4px;
}

.pillar-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: white;
  letter-spacing: 2px;
}

.pillar-icon {
  font-size: 80px;
  line-height: 1;
  color: var(--pillar-color);
  opacity: 0.15;
  position: absolute;
  bottom: 20px;
  right: 24px;
}

.pillar-keywords {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.kw-tag {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  font-weight: 300;
  letter-spacing: 1px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--pillar-color);
}

.kw-tag.kw-highlight {
  color: white;
  background: rgba(255, 255, 255, 0.08);
  font-weight: 500;
}

/* 连接箭头 */
.pillar-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: rgba(57, 141, 255, 0.4);
  padding: 0 12px;
}

/* 贝叶斯案例 */
.bayes-case {
  padding: 32px 40px;
  background: linear-gradient(
    135deg,
    rgba(57, 141, 255, 0.06) 0%,
    rgba(232, 179, 92, 0.04) 100%
  );
  border: 1px solid rgba(57, 141, 255, 0.20);
  border-radius: var(--radius-lg);
}

.bc-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 12px;
}

.bc-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: white;
  letter-spacing: 3px;
}

.bc-subtitle {
  font-size: var(--text-base);
  color: var(--color-gold);
  font-weight: 400;
  letter-spacing: 1px;
}

.bc-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  font-weight: 300;
  margin-bottom: 20px;
}

.bc-steps {
  display: flex;
  align-items: center;
  gap: 0;
}

.bc-step {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.bs-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
}

.bs-phase {
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
}

.bs-result {
  font-size: var(--text-sm);
  font-weight: 400;
  flex: 1;
  text-align: right;
}

.bs-arrow {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.25);
  padding: 0 8px;
}

/* 底部核心句 */
.core-sentence {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-top: 1px solid rgba(232, 179, 92, 0.20);
  margin-top: auto;
}

.cs-icon {
  font-size: 20px;
  color: var(--color-gold);
}

.cs-text {
  font-size: var(--text-xl);
  font-weight: 600;
  color: white;
  letter-spacing: 2px;
}
</style>
