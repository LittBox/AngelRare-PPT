<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideIteration.vue
 * 第 7 页：知识掌握与应用能力
 *
 * 视觉重构（2026-09-15 revision02）：
 * - 内容方向保留"数学 → AI → 医疗"主线
 * - 负责人是计算科学/数学专业，把概率、数学、贝叶斯原理迁移到医疗场景
 * - 贝叶斯仲裁器继续作为核心案例
 * - 修复三栏对齐：同顶线/同底线/同宽/列表同一基线/箭头同一水平线
 * - 不扩展成"三学科知识墙"，保留主线叙事
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('知识掌握与应用能力')
const slogan = ref('所学不止于书本，所知终用于真实')

// 三个知识领域（主线：数学 → AI → 医疗）
const pillars = [
  {
    label: '数学',
    pillar: 'PILLAR 01',
    title: '概率与推理规则',
    keywords: ['贝叶斯推断', '统计建模', '概率图模型'],
    bullets: [
      '概率与推理规则',
      '贝叶斯方法',
      'Log-Odds 表达',
    ],
    color: '#3C8DFF',
    icon: '∑',
  },
  {
    label: 'AI',
    pillar: 'PILLAR 02',
    title: '计算与智能能力',
    keywords: ['大语言模型', '多智能体系统', 'ArguLoop论辩'],
    bullets: [
      '大模型与多智能体',
      '检索增强生成 (RAG)',
      '动态论辩机制',
    ],
    color: '#78A6FF',
    icon: '◆',
  },
  {
    label: '医疗',
    pillar: 'PILLAR 03',
    title: '真实问题与场景',
    keywords: ['罕见病诊断', '循证推理', '真实世界数据'],
    bullets: [
      '罕见病临床场景',
      'PAP 全病程数据',
      'RWE 真实世界证据',
    ],
    color: '#E8B35C',
    icon: '✦',
  },
]

// 核心案例：贝叶斯仲裁器（放大展示）
const bayesCase = {
  title: '贝叶斯仲裁器',
  subtitle: '数学 × AI × 医疗的交汇点',
  description: '负责人是计算科学/数学专业，将概率与贝叶斯原理迁移到医疗场景，同时结合计算机代码与人工智能，在罕见病诊疗中实际应用。',
  steps: [
    { phase: 'S1 快思考', result: 'A 70% · B 20% · C 10%', color: '#FF9800' },
    { phase: 'S2 慢推理', result: '关键基因证据指向 B', color: '#3C8DFF' },
    { phase: 'ArguLoop', result: '证据冲突，触发辩论', color: '#78A6FF' },
    { phase: '贝叶斯仲裁', result: 'A 30% · B 62% · C 8%', color: '#4CAF50' },
  ],
}

// 底部核心句
const coreSentence = ref('数学给出推理规则，AI赋予计算能力，医疗提供真实问题 —— 三者交汇于贝叶斯仲裁器')
</script>

<template>
  <div class="slide-iteration">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 三栏（数学 → AI → 医疗） -->
      <div class="pillars">
        <div
          v-for="(p, i) in pillars"
          :key="i"
          class="pillar"
          :style="{ '--pillar-color': p.color }"
        >
          <!-- 顶部：序号 + icon + 大标签 -->
          <div class="pillar-head">
            <div class="pillar-pillar">{{ p.pillar }}</div>
            <div class="pillar-icon">{{ p.icon }}</div>
            <div class="pillar-label">{{ p.label }}</div>
          </div>

          <!-- 标题 -->
          <div class="pillar-title">{{ p.title }}</div>

          <!-- 同一基线列表 -->
          <ul class="pillar-list">
            <li
              v-for="(kw, j) in p.bullets"
              :key="j"
              class="pillar-list-item"
            >
              <span class="kw-bullet">·</span>
              <span>{{ kw }}</span>
            </li>
          </ul>

          <!-- 关键词标签（同一基线） -->
          <div class="pillar-keywords">
            <span
              v-for="(kw, j) in p.keywords"
              :key="j"
              class="kw-tag"
            >{{ kw }}</span>
          </div>

          <!-- 底部对齐锚 -->
          <div class="pillar-foot"></div>

          <!-- 连接箭头（除最后一个） -->
          <div v-if="i < pillars.length - 1" class="pillar-arrow">→</div>
        </div>
      </div>

      <!-- 核心案例：贝叶斯仲裁器 -->
      <div class="case">
        <div class="case-left">
          <div class="case-badge">核心案例</div>
          <h3 class="case-title">{{ bayesCase.title }}</h3>
          <div class="case-subtitle">{{ bayesCase.subtitle }}</div>
          <p class="case-description">{{ bayesCase.description }}</p>
        </div>
        <div class="case-right">
          <div
            v-for="(s, i) in bayesCase.steps"
            :key="i"
            class="case-step"
            :style="{ '--step-color': s.color }"
          >
            <div class="cs-phase">{{ s.phase }}</div>
            <div class="cs-result">{{ s.result }}</div>
            <div v-if="i < bayesCase.steps.length - 1" class="cs-arrow">↓</div>
          </div>
        </div>
      </div>

      <!-- 底部核心句 -->
      <div class="core-sentence">
        <span class="cs-mark">"</span>
        <span class="cs-text">{{ coreSentence }}</span>
        <span class="cs-mark">"</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-iteration {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
}

.content {
  position: relative;
  z-index: var(--z-base);
  padding: 36px 80px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  min-height: 0;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ==== 三栏：同顶线/同底线/同宽/列表同一基线 ==== */
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  /* 三栏必须同宽：grid 已保证 */
  flex-shrink: 0;
}

.pillar {
  position: relative;
  padding: 18px 22px 16px 22px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--pillar-color) 8%, transparent) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 3px solid var(--pillar-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  /* 强制对齐：同顶线/同底线 */
  align-items: stretch;
  min-height: 320px;
}

.pillar-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-shrink: 0;
  /* 顶部对齐锚：所有栏的同一基线 */
}

.pillar-pillar {
  font-size: 20px;
  letter-spacing: 3px;
  color: var(--pillar-color);
  font-weight: 600;
  opacity: 0.65;
  line-height: 1;
}

.pillar-icon {
  font-size: 36px;
  font-weight: 700;
  color: var(--pillar-color);
  line-height: 1;
  margin-left: auto;
  opacity: 0.7;
}

.pillar-label {
  font-size: 36px;
  font-weight: 800;
  color: white;
  letter-spacing: 4px;
  line-height: 1;
  flex: 1;
  min-height: 36px;
  /* 保证中文字标签垂直居中或顶部对齐 */
  display: flex;
  align-items: center;
}

.pillar-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--pillar-color);
  margin: 12px 0 14px 0;
  letter-spacing: 1px;
  line-height: 1.3;
  flex-shrink: 0;
  /* 同一基线：标题块起止位置一致 */
  min-height: 30px;
}

.pillar-list {
  list-style: none;
  margin: 0 0 14px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  /* 列表同一基线：固定条高度 */
  flex: 1;
}

.pillar-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  /* 关键：每条高度统一，保证三栏同一基线 */
  height: 38px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  line-height: 1;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.kw-bullet {
  color: var(--pillar-color);
  font-weight: 700;
  font-size: 22px;
  flex-shrink: 0;
}

.pillar-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  /* 关键词标签：同一基线（与 pillar-foot 对齐） */
  min-height: 32px;
  align-items: flex-start;
  flex-shrink: 0;
}

.kw-tag {
  display: inline-block;
  padding: 4px 10px;
  background: color-mix(in srgb, var(--pillar-color) 15%, transparent);
  color: var(--pillar-color);
  border-radius: 999px;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}

/* 底部对齐锚：保证三栏底部在同一基线 */
.pillar-foot {
  height: 0;
  margin-top: auto;
  border-top: 1px solid transparent;
  flex-shrink: 0;
}

/* 箭头（同一水平线：三栏中部） */
.pillar-arrow {
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28px;
  font-weight: 900;
  color: rgba(57, 141, 255, 0.6);
  z-index: 5;
  background: var(--color-bg);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(57, 141, 255, 0.3);
}

/* ==== 核心案例：贝叶斯仲裁器 ==== */
.case {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 18px;
  padding: 16px 22px;
  background: rgba(76, 175, 80, 0.04);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.case-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}

.case-badge {
  display: inline-block;
  padding: 3px 12px;
  background: rgba(76, 175, 80, 0.18);
  color: #4CAF50;
  border-radius: 999px;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  align-self: flex-start;
}

.case-title {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: white;
  letter-spacing: 2px;
}

.case-subtitle {
  font-size: 20px;
  color: #4CAF50;
  font-weight: 500;
  letter-spacing: 1px;
}

.case-description {
  margin: 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.55;
  font-weight: 300;
}

.case-right {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.case-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid color-mix(in srgb, var(--step-color) 30%, transparent);
  border-radius: var(--radius-sm);
  position: relative;
  /* 关键：四条同顶线/同底线/内部对齐 */
  justify-content: center;
  min-height: 100px;
}

.cs-phase {
  font-size: 20px;
  font-weight: 700;
  color: var(--step-color);
  letter-spacing: 1px;
}

.cs-result {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-mono);
  text-align: center;
  line-height: 1.4;
}

.cs-arrow {
  position: absolute;
  bottom: -4px;
  right: 6px;
  font-size: 14px;
  color: var(--step-color);
  opacity: 0.6;
}

/* 底部核心句 */
.core-sentence {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(57, 141, 255, 0.2);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.cs-mark {
  font-size: 28px;
  color: rgba(57, 141, 255, 0.6);
  line-height: 1;
  font-weight: 700;
}

.cs-text {
  font-size: 20px;
  color: white;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-align: center;
}
</style>