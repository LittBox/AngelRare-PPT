<script setup>
import { ref } from 'vue'


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
 * 内容来源（文字版 二·3 创新成效·技术创新）：
 *   技术创新（成效：放实验结果）证明"技术有效"
 *   类脑双系统推理 + 多智能体专业协同 + ArguLoop动态论辩 + 贝叶斯全局仲裁
 *   模拟人脑"快思考—慢推理"的认知过程，让多个专业智能体像专家会诊一样分工、
 *   像法庭质证一样解决证据冲突，再通过贝叶斯仲裁融合结论，
 *   实现从"生成答案"向"循证推理"的转变。
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜技术创新')
const slogan = ref('不只生成答案，更要证明答案')

// 技术创新体系
const techStack = [
  {
    name: '类脑双系统推理',
    icon: '🧠',
    desc: '模拟人脑"快思考—慢推理"认知过程',
    detail: 'S1 快速直觉判断 + S2 深度证据推理',
    color: '#4a6cf7',
  },
  {
    name: '多智能体专业协同',
    icon: '🤖',
    desc: '多个专业智能体像专家会诊一样分工协作',
    detail: 'SR Agent + DP Agent + 7大专业子Agent',
    color: '#00d4ff',
  },
  {
    name: 'ArguLoop 动态论辩',
    icon: '⚖️',
    desc: '像法庭质证一样解决证据冲突',
    detail: '攻击—辩护—独立仲裁的动态循环',
    color: '#ff9800',
  },
  {
    name: '贝叶斯全局仲裁',
    icon: '📊',
    desc: '将快慢系统判断综合，给出最终置信度',
    detail: '基于 Log-Odds 的概率融合与证据累积',
    color: '#4caf50',
  },
]

// 实验结果
const expResult = {
  title: 'MedBrowseComp 外部测评结果',
  source: '哈佛大学医学AI基准数据集 · 1000+ 道题目',
  our: {
    model: 'AngelRare (RAG + Opus 4.6)',
    acc: '0.680',
    f1: '0.535',
    highlight: true,
  },
  baseline: {
    model: '纯大语言模型（无检索基线）',
    acc: '0.520',
    f1: '0.445',
    delta: '-0.160',
  },
  conclusion: '引入检索流水线后，准确率取得 16 个百分点的绝对提升，达 68%',
}

// 关键指标
const keyMetrics = [
  { label: '准确率', value: '68%', note: 'AngelRare' },
  { label: '宏F1', value: '0.535', note: 'Macro-F1' },
  { label: '绝对提升', value: '+16pt', note: 'vs 无检索基线' },
]
</script>

<template>
  <div class="slide-agents">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 技术创新体系 4列 -->
    <div class="tech-grid">
      <div
        v-for="(t, i) in techStack"
        :key="i"
        class="tech-card"
        :style="{ borderColor: t.color + '40', background: t.color + '08' }"
      >
        <div class="tc-icon" :style="{ color: t.color }">{{ t.icon }}</div>
        <div class="tc-name" :style="{ color: t.color }">{{ t.name }}</div>
        <div class="tc-desc">{{ t.desc }}</div>
        <div class="tc-detail">{{ t.detail }}</div>
      </div>
    </div>

    <!-- 实验结果 -->
    <div class="exp-section">
      <div class="exp-header">
        <div class="exp-title">{{ expResult.title }}</div>
        <div class="exp-source">{{ expResult.source }}</div>
      </div>

      <div class="exp-table">
        <div class="et-header">
          <div class="et-col et-model">模型配置</div>
          <div class="et-col et-num">准确率</div>
          <div class="et-col et-num">宏 F1</div>
          <div class="et-col et-num">相对基线</div>
        </div>
        <div
          class="et-row et-our"
          :class="{ highlight: expResult.our.highlight }"
        >
          <div class="et-col et-model">
            <span class="our-tag">完整版</span>
            {{ expResult.our.model }}
          </div>
          <div class="et-col et-num">{{ expResult.our.acc }}</div>
          <div class="et-col et-num">{{ expResult.our.f1 }}</div>
          <div class="et-col et-num">—</div>
        </div>
        <div class="et-row">
          <div class="et-col et-model">{{ expResult.baseline.model }}</div>
          <div class="et-col et-num">{{ expResult.baseline.acc }}</div>
          <div class="et-col et-num">{{ expResult.baseline.f1 }}</div>
          <div class="et-col et-num delta">{{ expResult.baseline.delta }}</div>
        </div>
      </div>

      <!-- 关键指标 -->
      <div class="key-metrics">
        <div v-for="(m, i) in keyMetrics" :key="i" class="metric-card">
          <div class="mc-value">{{ m.value }}</div>
          <div class="mc-label">{{ m.label }}</div>
          <div class="mc-note">{{ m.note }}</div>
        </div>
      </div>

      <div class="exp-conclusion">{{ expResult.conclusion }}</div>
    </div>
  </div>
</template>

<style scoped>
.slide-agents {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 48px 80px 40px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 8px;
}

.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(74, 108, 247, 0.12);
  color: var(--color-accent, #00d4ff);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: 6px;
  font-weight: 400;
}

.slogan {
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 72px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 5px;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 技术体系 4列 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.tech-card {
  padding: 20px 16px;
  border: 1px solid;
  border-radius: var(--radius-md);
}

.tc-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.tc-name {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.tc-desc {
  font-size: 12px;
  color: white;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: 8px;
}

.tc-detail {
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.4;
  font-weight: 300;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* 实验结果 */
.exp-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  margin-top: auto;
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

.exp-title {
  font-size: 14px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.exp-source {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
}

.exp-table {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 12px;
}

.et-header,
.et-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 12px 20px;
  align-items: center;
}

.et-header {
  background: rgba(74, 108, 247, 0.15);
  font-size: 12px;
  color: var(--color-accent);
  letter-spacing: 2px;
  font-weight: 600;
}

.et-row {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 13px;
}

.et-our {
  background: rgba(0, 212, 255, 0.05);
}

.et-col {
  display: flex;
  align-items: center;
  gap: 8px;
}

.et-model {
  color: white;
  font-weight: 400;
}

.et-our .et-model {
  color: var(--color-accent);
  font-weight: 600;
}

.et-num {
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 15px;
}

.et-our .et-num {
  color: var(--color-accent);
  font-weight: 700;
}

.delta {
  color: #f44336 !important;
}

.our-tag {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(0, 212, 255, 0.2);
  color: var(--color-accent);
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
}

/* 关键指标 */
.key-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 10px;
}

.metric-card {
  padding: 14px;
  background: rgba(74, 108, 247, 0.06);
  border: 1px solid rgba(74, 108, 247, 0.15);
  border-radius: var(--radius-sm);
  text-align: center;
}

.mc-value {
  font-size: 28px;
  font-weight: 900;
  font-family: var(--font-mono);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
}

.mc-label {
  font-size: 12px;
  color: white;
  font-weight: 600;
  margin-bottom: 2px;
}

.mc-note {
  font-size: 10px;
  color: var(--color-text-muted);
  font-weight: 300;
}

.exp-conclusion {
  font-size: 13px;
  color: #4caf50;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  padding: 8px;
  background: rgba(76, 175, 80, 0.08);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(76, 175, 80, 0.2);
}
</style>
