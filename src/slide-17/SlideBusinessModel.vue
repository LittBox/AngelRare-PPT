<script setup>
/**
 * SlideBusinessModel.vue
 * 第 17 页：商业模式（数据飞轮）
 *
 * 内容来源（参考设计稿 slide16 + slide17）：
 * - 非对称支付驱动数据飞轮
 * - 患者不收费，药企和医生科研收费
 * - 三条收入线闭环，18 个月净盈余 194 万元
 * - 数据越用越厚 / 服务越做越强 / 客户越用越黏 / 生态越转越大
 */
const flywheel = [
  { name: '数据越用越厚', desc: '医生病例 → PAP 全病程数据 → RWE → 更多产业服务' },
  { name: '服务越做越强', desc: '数据积累降低重复采集成本，提升科研与 RWE 交付效率' },
  { name: '客户越用越黏', desc: '医生信任网络 + 患者随访数据 + PAP 工作流形成长期转换成本' },
  { name: '生态越转越大', desc: 'B 端收入反哺 PAP → 服务更多患者 → 沉淀更多数据 → 再增强 B 端服务' }
]
const revenueLines = [
  { name: '数据采集与治理', price: '8-15 万 / 项目' },
  { name: '脱敏数据订阅', price: '30-60 万 / 年 / 客户' },
  { name: '定制分析与 RWS', price: '按项目议价' }
]
</script>

<template>
  <div class="slide-bm">
    <div class="header">
      <div class="badge">商业模式创新</div>
      <h1 class="title">非对称支付驱动数据飞轮</h1>
      <p class="subtitle">让最需要帮助的人，不成为买单的人 —— 三条收入线闭环，18 个月净盈余 194 万元</p>
    </div>

    <!-- 飞轮四要素 -->
    <div class="flywheel-grid">
      <div v-for="(item, i) in flywheel" :key="i" class="flywheel-card">
        <div class="fw-num">0{{ i + 1 }}</div>
        <div class="fw-name">{{ item.name }}</div>
        <div class="fw-desc">{{ item.desc }}</div>
      </div>
    </div>

    <!-- 收入线 -->
    <div class="revenue-section">
      <div class="revenue-title">三条收入线</div>
      <div class="revenue-grid">
        <div v-for="(line, i) in revenueLines" :key="i" class="revenue-card">
          <div class="rv-name">{{ line.name }}</div>
          <div class="rv-price">{{ line.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-bm {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 100px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 32px; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(76, 175, 80, 0.15); color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 8px;
}
.subtitle { font-size: var(--text-base); color: var(--color-text-muted); font-weight: 300; }
.flywheel-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
  margin-bottom: 32px;
}
.flywheel-card {
  padding: 28px 24px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-md);
  position: relative;
}
.fw-num {
  position: absolute; top: 16px; right: 20px;
  font-size: 32px; font-weight: 900; color: rgba(76, 175, 80, 0.3);
  font-family: var(--font-mono);
}
.fw-name {
  font-size: var(--text-lg); color: #81c784;
  font-weight: 700; margin-bottom: 12px; letter-spacing: 2px;
}
.fw-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; font-weight: 300; }
.revenue-section {
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-lg);
  padding: 24px 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.revenue-title {
  font-size: var(--text-lg); font-weight: 700; margin-bottom: 16px;
  color: var(--color-accent); letter-spacing: 2px;
}
.revenue-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
.revenue-card {
  padding: 20px 24px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: var(--radius-md);
  text-align: center;
}
.rv-name { font-size: var(--text-base); color: white; margin-bottom: 8px; font-weight: 500; }
.rv-price {
  font-size: var(--text-lg); font-weight: 700; color: var(--color-accent);
  font-family: var(--font-mono); letter-spacing: 1px;
}
</style>
