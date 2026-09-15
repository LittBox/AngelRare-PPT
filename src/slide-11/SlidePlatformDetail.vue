<script setup>
import { ref } from 'vue'


/**
 * SlidePlatformDetail.vue
 * 第 11 页：目标导向
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「目标导向」
 *   Slogan：「从真实需求出发，让产品不断收敛」
 *
 * 内容来源（文字版 二·2 目标导向）：
 *   · 通过患者、医生、医院、药企、公益组织等多方调研，持续校准项目定位
 *   · 从早期"做一个罕见病平台"，逐步收敛为：
 *     "以医生科研为切入口、以数据沉淀为基础、向PAP与RWE延伸的诊断后产业服务体系"
 *   · 明确总体目标：降低罕见病多主体协作成本，将分散信息转化为可追溯、可复核、可应用的可信证据
 *   · 分阶段推进：技术验证 → 医院/医生场景落地 → 多主体服务闭环 → 商业与产业化扩展
 *   · 用可量化指标衡量目标
 *
 * 页面核心引用：
 *   "不是先有产品，再找场景；而是先发现真实问题，再让产品不断向真实需求收敛。"
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('目标导向')
const slogan = ref('从真实需求出发，让产品不断收敛')

// 多方需求整合
const stakeholderNeeds = [
  { role: '患者', need: '确诊更快、信息透明、有人陪伴', color: '#4caf50' },
  { role: '医生', need: '减轻病例整理负担、提升科研效率', color: '#4a6cf7' },
  { role: '医院', need: '优化转诊流程、提升科研产出', color: '#00d4ff' },
  { role: '药企', need: '获取高质量脱敏数据、加速药物研发', color: '#ff9800' },
  { role: '公益组织', need: '精准对接患者需求、提升援助效率', color: '#e91e63' },
]

// 产品收敛历程
const convergence = [
  {
    phase: '早期想法',
    idea: '做一个罕见病综合平台',
    result: '过于宽泛，难以落地',
    status: '放弃',
    statusColor: '#f44336',
  },
  {
    phase: '中期调整',
    idea: '聚焦诊断辅助工具',
    result: '场景单一，难以形成壁垒',
    status: '调整',
    statusColor: '#ff9800',
  },
  {
    phase: '最终收敛',
    idea: '以医生科研为切入口，向PAP+RWE延伸的诊断后服务体系',
    result: '核心能力匹配，已通过市场验证',
    status: '保留',
    statusColor: '#4caf50',
  },
]

// 分阶段目标
const phasedGoals = [
  { phase: '第一阶段', title: '技术验证', metrics: 'NHSC Agent准确率达标、ArguLoop论辩有效率>80%' },
  { phase: '第二阶段', title: '医院场景落地', metrics: '3家医院签署合作意向书、100+医生注册使用' },
  { phase: '第三阶段', title: '多主体服务闭环', metrics: 'PAP管理>500患者、脱敏数据订阅3家药企' },
  { phase: '第四阶段', title: '商业与产业化扩展', metrics: '18个月净盈余194万、ROI>1273%' },
]

// 核心引用
const coreQuote = '不是先有产品，再找场景；而是先发现真实问题，再让产品不断向真实需求收敛'
</script>

<template>
  <div class="slide-detail">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 多方需求整合 -->
    <div class="stakeholder-row">
      <div class="st-label">多方需求整合</div>
      <div class="st-cards">
        <div
          v-for="(s, i) in stakeholderNeeds"
          :key="i"
          class="st-card"
          :style="{ borderColor: s.color + '40', background: s.color + '08' }"
        >
          <div class="sc-role" :style="{ color: s.color }">{{ s.role }}</div>
          <div class="sc-need">{{ s.need }}</div>
        </div>
      </div>
    </div>

    <!-- 产品收敛历程 + 分阶段目标 -->
    <div class="two-panel">
      <!-- 左：收敛历程 -->
      <div class="convergence-panel">
        <div class="panel-title">产品收敛历程</div>
        <div class="conv-list">
          <div
            v-for="(c, i) in convergence"
            :key="i"
            class="conv-item"
            :style="{ borderLeftColor: c.statusColor }"
          >
            <div class="ci-phase">{{ c.phase }}</div>
            <div class="ci-idea">{{ c.idea }}</div>
            <div class="ci-result">{{ c.result }}</div>
            <div class="ci-status" :style="{ color: c.statusColor }">{{ c.status }}</div>
          </div>
        </div>
      </div>

      <!-- 右：分阶段目标 -->
      <div class="goals-panel">
        <div class="panel-title">分阶段推进目标</div>
        <div class="goals-list">
          <div v-for="(g, i) in phasedGoals" :key="i" class="goal-item">
            <div class="gi-phase">{{ g.phase }}</div>
            <div class="gi-body">
              <div class="gi-title">{{ g.title }}</div>
              <div class="gi-metrics">{{ g.metrics }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心引用 -->
    <div class="quote-strip">
      <div class="qs-mark">❝</div>
      <div class="qs-text">{{ coreQuote }}</div>
    </div>
  </div>
</template>

<style scoped>
.slide-detail {
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

/* 多方需求 */
.stakeholder-row {
  margin-bottom: 16px;
}

.st-label {
  font-size: 12px;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.st-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.st-card {
  padding: 12px 14px;
  border: 1px solid;
  border-radius: var(--radius-sm);
  text-align: center;
}

.sc-role {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

.sc-need {
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.4;
  font-weight: 300;
}

/* 两栏 */
.two-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
  margin-bottom: 12px;
}

.panel-title {
  font-size: 12px;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

/* 收敛历程 */
.convergence-panel {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.conv-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.conv-item {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  border-left: 3px solid;
}

.ci-phase {
  font-size: 11px;
  color: var(--color-text-muted);
  letter-spacing: 2px;
  margin-bottom: 4px;
  font-weight: 600;
}

.ci-idea {
  font-size: 13px;
  color: white;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.4;
}

.ci-result {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  margin-bottom: 4px;
}

.ci-status {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

/* 分阶段目标 */
.goals-panel {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.gi-phase {
  font-size: 11px;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 1px;
  min-width: 70px;
}

.gi-body {
  flex: 1;
}

.gi-title {
  font-size: 13px;
  color: white;
  font-weight: 600;
  margin-bottom: 3px;
}

.gi-metrics {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 核心引用 */
.quote-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: rgba(74, 108, 247, 0.08);
  border: 1px solid rgba(74, 108, 247, 0.2);
  border-radius: var(--radius-md);
}

.qs-mark {
  font-size: 28px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.qs-text {
  font-size: 15px;
  color: white;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 1px;
}
</style>
