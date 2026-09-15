<script setup>
/**
 * SlideRevenueModel.vue
 * 第 19 页：收入模型 + 财务预测
 *
 * 内容来源（参考设计稿 slide18 + slide19）：
 * - 启动资金结构 67 万元（现金 22 万 + 资源折价 45 万）
 * - 三年盈利路径
 * - 投资回报率 (ROI): 1273%
 * - 盈利能力指数 (PI): 10
 * - 静态投资回收期: 2.8 年
 * - 内部收益率 (IRR): >60%
 *
 * 三步走：
 * 1. 科研服务起步（数据采集与治理 8-15 万/项目）
 * 2. 数据网络放大（免费部署临床决策工具 嵌入转诊流程 换取脱敏数据入口）
 * 3. 药企付费变现（脱敏数据订阅 + 定制分析与 RWS 合作 30-60 万/年/客户）
 */
const steps = [
  { num: '1', name: '科研服务先行', desc: '数据采集与治理', price: '8-15 万 / 项目' },
  { num: '2', name: '基层网络扩张', desc: '免费部署临床决策工具，嵌入转诊流程', price: '换取脱敏数据入口' },
  { num: '3', name: '药企规模变现', desc: '脱敏数据订阅 + 定制分析 + RWS 合作', price: '30-60 万 / 年 / 客户' }
]
</script>

<template>
  <div class="slide-rev">
    <div class="header">
      <div class="badge">收入模型</div>
      <h1 class="title">科研服务起步，数据网络放大，药企付费变现</h1>
    </div>

    <!-- 三步走 -->
    <div class="steps">
      <div v-for="(step, i) in steps" :key="i" class="step-card">
        <div class="step-num">{{ step.num }}</div>
        <div class="step-content">
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div class="step-price">{{ step.price }}</div>
        </div>
        <div v-if="i < steps.length - 1" class="step-arrow">→</div>
      </div>
    </div>

    <!-- 财务指标 -->
    <div class="finance">
      <div class="finance-title">三年盈利路径 · 关键财务指标</div>
      <div class="finance-grid">
        <div class="fin-card">
          <div class="fin-num">1273%</div>
          <div class="fin-label">投资回报率 ROI</div>
        </div>
        <div class="fin-card">
          <div class="fin-num">10</div>
          <div class="fin-label">盈利能力指数 PI</div>
        </div>
        <div class="fin-card">
          <div class="fin-num">2.8 年</div>
          <div class="fin-label">静态投资回收期</div>
        </div>
        <div class="fin-card">
          <div class="fin-num">&gt;60%</div>
          <div class="fin-label">内部收益率 IRR</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-rev {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 100px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 40px; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(76, 175, 80, 0.15); color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title {
  font-size: var(--text-2xl); font-weight: 700; letter-spacing: 2px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.steps {
  display: grid; grid-template-columns: 1fr 60px 1fr 60px 1fr; gap: 16px;
  align-items: stretch;
  margin-bottom: 40px;
}
.step-card {
  display: flex; align-items: stretch;
  padding: 28px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  position: relative;
}
.step-num {
  font-size: 64px; font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-family: var(--font-mono); margin-right: 24px;
}
.step-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.step-name { font-size: var(--text-xl); font-weight: 700; color: white; margin-bottom: 8px; letter-spacing: 2px; }
.step-desc { font-size: var(--text-base); color: var(--color-text-muted); margin-bottom: 12px; font-weight: 300; }
.step-price {
  font-size: var(--text-lg); color: var(--color-accent); font-weight: 600;
  font-family: var(--font-mono); letter-spacing: 1px;
}
.step-arrow {
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; color: var(--color-accent); opacity: 0.6;
}
.finance {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(0, 212, 255, 0.02) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-lg);
  padding: 32px 40px;
}
.finance-title {
  font-size: var(--text-lg); color: #81c784; font-weight: 700;
  margin-bottom: 24px; letter-spacing: 2px;
}
.finance-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px; }
.fin-card { text-align: center; padding: 16px; }
.fin-num {
  font-size: 56px; font-weight: 900;
  background: linear-gradient(135deg, #81c784, var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px; font-family: var(--font-mono);
}
.fin-label { font-size: var(--text-base); color: var(--color-text-muted); letter-spacing: 2px; }
</style>
