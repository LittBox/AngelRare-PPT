<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideArguLoop.vue
 * 第 13 页：创新成效｜技术创新
 *
 * 视觉重构（2026-09-15）：
 *   原文案不变，视觉按规范重做。
 *   核心：ArguLoop 论辩机制，四步流程。
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜技术创新')
const slogan = ref('不只生成答案，更要证明答案')

const steps = [
  { num: '01', name: '发现冲突', desc: '多个 Agent 出现证据冲突', color: '#FF9800' },
  { num: '02', name: '发起攻击', desc: '质疑方 Agent 发起质证', color: '#F44336' },
  { num: '03', name: '重新辩护', desc: '被质疑方必须拿原始文献重新辩护', color: '#3C8DFF' },
  { num: '04', name: '独立仲裁', desc: 'MetaEvaluator Agent 当法官，判断哪方证据更可靠', color: '#4CAF50' },
]

const problem = {
  title: '单体大模型 / 简单智能体',
  points: ['易产生幻觉', '无法解决深度逻辑冲突', '简单投票掩盖证据强弱'],
  color: '#F44336',
}

const solution = {
  title: '七大专业智能体 + ArguLoop',
  points: ['图论约束下的专业分工', '交叉验证，自适应消除偏差', '攻击—辩护—独立仲裁的动态循环'],
  color: '#3C8DFF',
}
</script>

<template>
  <div class="slide-arguloop">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 问题 vs 方案 -->
      <div class="comparison">
        <div class="compare-card problem" :style="{ borderColor: problem.color + '50' }">
          <div class="cc-header" :style="{ color: problem.color }">问题</div>
          <div class="cc-title">{{ problem.title }}</div>
          <div class="cc-points">
            <div v-for="(p, i) in problem.points" :key="i" class="cc-point">· {{ p }}</div>
          </div>
        </div>

        <div class="compare-arrow">→</div>

        <div class="compare-card solution" :style="{ borderColor: solution.color + '50' }">
          <div class="cc-header" :style="{ color: solution.color }">方案</div>
          <div class="cc-title">{{ solution.title }}</div>
          <div class="cc-points">
            <div v-for="(p, i) in solution.points" :key="i" class="cc-point">· {{ p }}</div>
          </div>
        </div>
      </div>

      <!-- 四步流程 -->
      <div class="flow">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="flow-step"
          :style="{ borderColor: step.color + '40' }"
        >
          <div class="fs-num" :style="{ background: step.color }">{{ step.num }}</div>
          <div class="fs-body">
            <div class="fs-name" :style="{ color: step.color }">{{ step.name }}</div>
            <div class="fs-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-arguloop {
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
  padding: 56px 120px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
}

.top { display: flex; flex-direction: column; gap: 12px; }

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

/* 问题 vs 方案 */
.comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  align-items: stretch;
}

.compare-card {
  padding: 28px 36px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid;
  border-radius: var(--radius-lg);
}

.cc-header {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.cc-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.cc-points {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cc-point {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.5;
}

.compare-arrow {
  display: flex;
  align-items: center;
  font-size: 40px;
  color: var(--color-blue-mid);
  padding: 0 8px;
}

/* 四步流程 */
.flow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex: 1;
}

.flow-step {
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fs-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 900;
  color: white;
  flex-shrink: 0;
}

.fs-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fs-name {
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: 1px;
}

.fs-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.6;
}
</style>
