<script setup>import { ref } from 'vue'


/**
 * SlideArguLoop.vue
 * 第 13 页：ArguLoop 论辩机制（核心技术创新）
 *
 * 内容来源（参考设计稿 slide13）：
 * - 项目拟提出 ArguLoop 动态论辩攻防机制，在图论约束下协调七大专业智能体的交叉验证，自适应地消除大模型的自我服务偏差
 * - 单体大模型/简单智能体 易产生幻觉、无法解决深度逻辑冲突
 * - 七大子 Agent 并行推理
 *
 * 这是网评 PPT 最值得讲清楚的技术创新点
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜技术创新')
const slogan = ref('不只生成答案，更要证明答案（从普通生成式 AI 走向"可循证、可质证、可仲裁"）')

const steps = [
  { num: '01', name: '发现冲突', desc: '多个 Agent 出现证据冲突' },
  { num: '02', name: '发起攻击', desc: '质疑方 Agent 发起质证' },
  { num: '03', name: '重新辩护', desc: '被质疑 Agent 必须拿原始文献重新辩护' },
  { num: '04', name: '独立仲裁', desc: 'MetaEvaluator Agent 当法官判断哪一方证据更可靠' }
]
</script>

<template>
  <div class="slide-arguloop">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 问题对比 -->
    <div class="comparison">
      <div class="compare-card problem">
        <div class="compare-label">问题</div>
        <div class="compare-title">单体大模型 / 简单智能体</div>
        <ul>
          <li>· 易产生幻觉</li>
          <li>· 无法解决深度逻辑冲突</li>
          <li>· 简单投票掩盖证据强弱</li>
        </ul>
      </div>
      <div class="compare-arrow">→</div>
      <div class="compare-card solution">
        <div class="compare-label">方案</div>
        <div class="compare-title">七大子 Agent 并行推理 + ArguLoop</div>
        <ul>
          <li>· 在图论约束下协调七大专业智能体</li>
          <li>· 交叉验证，自适应消除自我服务偏差</li>
          <li>· 攻击—辩护—独立仲裁的动态循环</li>
        </ul>
      </div>
    </div>

    <!-- 流程图 -->
    <div class="flow">
      <div v-for="(step, i) in steps" :key="i" class="flow-step">
        <div class="step-num">{{ step.num }}</div>
        <div class="step-name">{{ step.name }}</div>
        <div class="step-desc">{{ step.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-arguloop {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 100px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 32px; text-align: center; }
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
.comparison {
  display: flex;
  align-items: stretch;
  gap: 32px;
  margin-bottom: 32px;
}
.compare-card {
  flex: 1;
  padding: 28px 32px;
  border-radius: var(--radius-lg);
}
.compare-card.problem {
  background: rgba(244, 67, 54, 0.06);
  border: 1px solid rgba(244, 67, 54, 0.2);
}
.compare-card.solution {
  background: rgba(76, 175, 80, 0.06);
  border: 1px solid rgba(76, 175, 80, 0.2);
}
.compare-label {
  font-size: var(--text-sm); letter-spacing: 4px;
  margin-bottom: 8px; font-weight: 600;
}
.problem .compare-label { color: #f44336; }
.solution .compare-label { color: #4caf50; }
.compare-title {
  font-size: var(--text-xl); font-weight: 700;
  margin-bottom: 16px;
}
.compare-card ul {
  list-style: none; font-size: var(--text-base); color: var(--color-text-muted);
  font-weight: 300; line-height: 1.8;
}
.compare-arrow {
  display: flex; align-items: center;
  font-size: 48px; color: var(--color-accent);
}
.flow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.flow-step {
  padding: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
  position: relative;
}
.step-num {
  font-size: 36px; font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px; font-family: var(--font-mono);
}
.step-name { font-size: var(--text-lg); font-weight: 700; margin-bottom: 8px; color: white; }
.step-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; line-height: 1.5; }
</style>
