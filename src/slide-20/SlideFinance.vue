<script setup>
/**
 * SlideFinance.vue
 * 第 20 页：财务分析
 *
 * 内容来源（参考设计稿 slide20）：
 * - 启动资金结构 67 万元
 * - 现金投入：22 万元
 * - 资源折价：45 万元
 */
const fundSource = [
  { label: '现金投入', value: 22, color: '#4caf50' },
  { label: '资源折价', value: 45, color: '#00d4ff' }
]
</script>

<template>
  <div class="slide-fin">
    <div class="header">
      <div class="badge">财务分析</div>
      <h1 class="title">启动资金结构与盈利能力</h1>
      <p class="subtitle">依靠高毛利数据服务和 SaaS 订阅实现快速盈利</p>
    </div>

    <!-- 启动资金饼图 -->
    <div class="finance-grid">
      <div class="fund-source">
        <div class="fs-title">启动资金结构</div>
        <div class="fs-total">67<span>万元</span></div>
        <div class="fs-bars">
          <div
            v-for="(item, i) in fundSource"
            :key="i"
            class="fs-bar-row"
          >
            <div class="fs-label">
              <span class="fs-dot" :style="{ background: item.color }"></span>
              {{ item.label }}
            </div>
            <div class="fs-track">
              <div class="fs-fill" :style="{ width: (item.value / 67) * 100 + '%', background: item.color }"></div>
            </div>
            <div class="fs-value">{{ item.value }} 万元</div>
          </div>
        </div>
        <div class="fs-percent">
          现金投入 <strong>33%</strong> · 资源折价 <strong>67%</strong>
        </div>
      </div>

      <div class="profit-card">
        <div class="pc-title">盈利能力指标</div>
        <div class="pc-rows">
          <div class="pc-row">
            <div class="pc-label">投资回报率 (ROI)</div>
            <div class="pc-value">1273%</div>
          </div>
          <div class="pc-row">
            <div class="pc-label">盈利能力指数 (PI)</div>
            <div class="pc-value">10</div>
          </div>
          <div class="pc-row">
            <div class="pc-label">静态投资回收期</div>
            <div class="pc-value">2.8 年</div>
          </div>
          <div class="pc-row">
            <div class="pc-label">内部收益率 (IRR)</div>
            <div class="pc-value">&gt;60%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fin {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 60px; text-align: center; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(76, 175, 80, 0.15); color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 20px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 12px;
}
.subtitle { font-size: var(--text-lg); color: var(--color-text-muted); font-weight: 300; }
.finance-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
}
.fund-source, .profit-card {
  padding: 40px 48px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}
.fs-title, .pc-title {
  font-size: var(--text-xl); font-weight: 700; margin-bottom: 32px;
  color: var(--color-accent); letter-spacing: 2px;
}
.fs-total {
  font-size: 96px; font-weight: 900; color: white; line-height: 1;
  font-family: var(--font-mono); margin-bottom: 32px;
  background: linear-gradient(135deg, #4caf50, var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.fs-total span {
  font-size: var(--text-lg); color: var(--color-text-muted);
  margin-left: 8px; font-family: var(--font-display);
}
.fs-bars { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
.fs-bar-row {
  display: grid; grid-template-columns: 140px 1fr 100px; align-items: center; gap: 16px;
}
.fs-label { font-size: var(--text-base); color: white; display: flex; align-items: center; gap: 8px; }
.fs-dot { width: 12px; height: 12px; border-radius: 50%; }
.fs-track { height: 12px; background: rgba(255, 255, 255, 0.08); border-radius: 6px; overflow: hidden; }
.fs-fill { height: 100%; border-radius: 6px; }
.fs-value { font-size: var(--text-base); color: var(--color-text); font-family: var(--font-mono); text-align: right; }
.fs-percent { font-size: var(--text-base); color: var(--color-text-muted); letter-spacing: 1px; }
.fs-percent strong { color: var(--color-accent); margin: 0 4px; }
.pc-rows { display: flex; flex-direction: column; gap: 20px; }
.pc-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px;
  background: rgba(0, 212, 255, 0.05);
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 212, 255, 0.15);
}
.pc-label { font-size: var(--text-base); color: var(--color-text-muted); }
.pc-value {
  font-size: var(--text-2xl); font-weight: 700; color: var(--color-accent);
  font-family: var(--font-mono); letter-spacing: 1px;
}
</style>
