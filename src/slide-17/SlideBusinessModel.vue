<script setup>
import { ref } from 'vue'


/**
 * SlideBusinessModel.vue
 * 第 16 页：产业认知
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「产业认知」
 *   Slogan：「诊断不是终点，而是服务的起点」
 *
 * 内容来源（文字版 三·1 产业认知）：
 *   · 行业背景
 *   · 产业发展现状
 *   · 行业趋势与关键机会
 *   · 核心痛点与挑战
 *   · 现有做这个方面的企业/产品对比（这部分见 P17 市场定位）
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('产业认知')
const slogan = ref('诊断不是终点，而是服务的起点')

// 行业背景
const industryContext = {
  patients: '约 2000 万罕见病患者群体',
  diagnosisGap: '平均确诊周期 5-7 年',
  marketSize: '罕见病药物市场年增速 >20%',
  dataGap: '超过 70% 的罕见病缺乏系统性数据积累',
}

// 产业发展现状
const industryStatus = [
  {
    label: '诊断端拥挤',
    desc: 'AI 辅助诊断产品集中，竞争激烈',
    icon: '🔬',
  },
  {
    label: '诊断后服务空白',
    desc: '确诊后患者管理、PAP、RWE 领域几乎空白',
    icon: '📋',
  },
  {
    label: '数据孤岛严重',
    desc: '医院之间、科室之间数据无法互通',
    icon: '🏥',
  },
  {
    label: '药企需求强烈',
    desc: '药企对真实世界数据（RWE）的需求持续上升',
    icon: '💊',
  },
]

// 行业趋势与关键机会
const trends = [
  {
    label: '政策持续加码',
    detail: '国家鼓励罕见病药物研发与真实世界数据应用',
  },
  {
    label: 'RWE 价值凸显',
    detail: '真实世界证据可支持罕见病药物审评审批',
  },
  {
    label: '基层医疗下沉',
    detail: '分级诊疗推动基层医疗机构能力提升需求',
  },
  {
    label: '数据资产化',
    detail: '医疗数据结构化、标准化成为行业基础设施',
  },
]

// 核心痛点与挑战
const challenges = [
  {
    challenge: '数据分散',
    detail: '病例数据碎片化，无法形成规模效应',
  },
  {
    challenge: '协同困难',
    detail: '多主体（患者/医生/药企）之间缺乏有效连接',
  },
  {
    challenge: '价值断链',
    detail: '诊断结论与后续管理、科研、援助之间脱节',
  },
]
</script>

<template>
  <div class="slide-bm">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 行业背景数字 -->
    <div class="context-row">
      <div class="ctx-label">行业背景</div>
      <div class="ctx-numbers">
        <div v-for="(val, key) in industryContext" :key="key" class="ctx-num">
          <div class="cn-value">{{ val }}</div>
          <div class="cn-key">{{ key }}</div>
        </div>
      </div>
    </div>

    <!-- 产业现状 + 行业趋势 + 核心挑战 -->
    <div class="three-col">
      <!-- 产业现状 -->
      <div class="status-panel">
        <div class="panel-title">产业发展现状</div>
        <div class="status-list">
          <div v-for="(s, i) in industryStatus" :key="i" class="status-item">
            <span class="si-icon">{{ s.icon }}</span>
            <div class="si-body">
              <div class="si-label">{{ s.label }}</div>
              <div class="si-desc">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 行业趋势 -->
      <div class="trends-panel">
        <div class="panel-title">行业趋势与关键机会</div>
        <div class="trends-list">
          <div v-for="(t, i) in trends" :key="i" class="trend-item">
            <div class="ti-label">{{ t.label }}</div>
            <div class="ti-detail">{{ t.detail }}</div>
          </div>
        </div>
      </div>

      <!-- 核心挑战 -->
      <div class="challenges-panel">
        <div class="panel-title">核心痛点与挑战</div>
        <div class="challenges-list">
          <div v-for="(c, i) in challenges" :key="i" class="challenge-item">
            <div class="ci-challenge">{{ c.challenge }}</div>
            <div class="ci-detail">{{ c.detail }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部标注 -->
    <div class="footer-note">
      注：竞品详细对比见「市场定位」页
    </div>
  </div>
</template>

<style scoped>
.slide-bm {
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

/* 行业背景数字 */
.context-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.ctx-label {
  font-size: 12px;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 3px;
  white-space: nowrap;
}

.ctx-numbers {
  display: flex;
  gap: 16px;
  flex: 1;
}

.ctx-num {
  flex: 1;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-sm);
  text-align: center;
}

.cn-value {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  line-height: 1.3;
}

.cn-key {
  font-size: 10px;
  color: var(--color-text-muted);
  font-weight: 300;
  letter-spacing: 1px;
}

/* 三栏布局 */
.three-col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

/* 产业现状 */
.status-panel {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.si-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.si-body {
  flex: 1;
}

.si-label {
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-bottom: 3px;
}

.si-desc {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

/* 行业趋势 */
.trends-panel {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.trends-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.trend-item {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.ti-label {
  font-size: 13px;
  font-weight: 700;
  color: #4caf50;
  margin-bottom: 3px;
}

.ti-detail {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

/* 核心挑战 */
.challenges-panel {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.challenges-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.challenge-item {
  padding: 12px 14px;
  background: rgba(244, 67, 54, 0.04);
  border: 1px solid rgba(244, 67, 54, 0.15);
  border-radius: var(--radius-sm);
}

.ci-challenge {
  font-size: 14px;
  font-weight: 700;
  color: #f44336;
  margin-bottom: 4px;
}

.ci-detail {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

/* 底部标注 */
.footer-note {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  text-align: right;
  letter-spacing: 1px;
}
</style>
