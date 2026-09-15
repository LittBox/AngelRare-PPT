<script setup>import { ref } from 'vue'


/**
 * SlideExpResult.vue
 * 第 14 页：实验结果（模型对比表）
 *
 * 内容来源（参考设计稿 slide14）：
 * - 模型配置对比表
 * - 准确率 (Accuracy) / 宏 F1 (Macro-F1) / 绝对提升
 * - 完整版 AngelRare (RAG + Opus 4.6): 0.680 / 0.535 / -
 * - 纯大语言模型 (无检索基线, Opus 4.6): 0.520 / 0.445 / 0.160
 * - 实验结果表明，引入系统的检索流水线后，整体准确率取得 16 个百分点的绝对提升（达 68%）
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜服务模式创新')
const slogan = ref('让最需要帮助的人，不成为买单的人')

const tableData = [
  { model: 'AngelRare (RAG + Opus 4.6)', acc: '0.680', f1: '0.535', delta: '—', highlight: true },
  { model: '纯大语言模型 (无检索基线)', acc: '0.520', f1: '0.445', delta: '-0.160', highlight: false }
]
</script>

<template>
  <div class="slide-exp">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 数据表 -->
    <div class="table-container">
      <div class="table-header">
        <div class="col col-model">模型配置</div>
        <div class="col col-num">准确率 (Accuracy)</div>
        <div class="col col-num">宏 F1 (Macro-F1)</div>
        <div class="col col-num">绝对提升</div>
      </div>
      <div
        v-for="(row, i) in tableData"
        :key="i"
        class="table-row"
        :class="{ highlight: row.highlight }"
      >
        <div class="col col-model">
          <span v-if="row.highlight" class="tag">完整版</span>
          {{ row.model }}
        </div>
        <div class="col col-num">{{ row.acc }}</div>
        <div class="col col-num">{{ row.f1 }}</div>
        <div class="col col-num">{{ row.delta }}</div>
      </div>
    </div>

    <!-- 关键数字 -->
    <div class="key-numbers">
      <div class="number-card">
        <div class="number">68%</div>
        <div class="label">整体准确率</div>
      </div>
      <div class="number-card">
        <div class="number">+16</div>
        <div class="label">百分点绝对提升</div>
      </div>
      <div class="number-card">
        <div class="number">0.535</div>
        <div class="label">宏 F1 分数</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-exp {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 48px; text-align: center; }
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
.hl {
  color: var(--color-accent); font-weight: 700;
  background: rgba(0, 212, 255, 0.15); padding: 4px 12px; border-radius: 6px;
}
.table-container {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 40px;
}
.table-header, .table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 24px 32px;
  align-items: center;
}
.table-header {
  background: rgba(74, 108, 247, 0.1);
  font-size: var(--text-base);
  color: var(--color-accent);
  letter-spacing: 2px;
  font-weight: 600;
}
.table-row {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: var(--text-lg);
}
.table-row.highlight {
  background: rgba(0, 212, 255, 0.05);
  color: var(--color-accent);
  font-weight: 600;
}
.col-num { font-family: var(--font-mono); text-align: center; font-size: var(--text-xl); }
.tag {
  display: inline-block; padding: 2px 10px;
  background: rgba(0, 212, 255, 0.2); color: var(--color-accent);
  border-radius: var(--radius-full); font-size: var(--text-sm);
  margin-right: 12px; vertical-align: middle;
}
.key-numbers { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
.number-card {
  padding: 32px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: var(--radius-lg);
  text-align: center;
}
.number {
  font-size: 72px; font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px; font-family: var(--font-mono);
}
.label { font-size: var(--text-base); color: var(--color-text-muted); letter-spacing: 2px; }
</style>
