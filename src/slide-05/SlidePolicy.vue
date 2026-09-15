<script setup>import { ref } from 'vue'


/**
 * SlidePolicy.vue
 * 第 5 页：国家政策（罕见病目录/规划）
 *
 * 内容来源（参考设计稿 slide5）：
 * - 国家卫健委：第一批罕见病目录 121 种
 * - 国务院办公厅：十四五国民健康规划
 * - 国家药监局：真实世界证据支持药物研发与审评的指导原则（试行）
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('立德树人')
const slogan = ref('把青春写在国家需要的地方')

const policies = [
  {
    org: '国家卫健委',
    doc: '《第一批罕见病目录》',
    desc: '官方界定 121 种罕见病，为医保诊疗科研数据统计提供法定标准目录，是罕见病领域基础政策。'
  },
  {
    org: '国务院办公厅',
    doc: '《十四五国民健康规划》',
    desc: '首次把罕见病防治纳入国家级健康规划，强化顶层设计。'
  },
  {
    org: '国家药监局',
    doc: '《真实世界证据支持药物研发与审评的指导原则（试行）》',
    desc: '允许罕见药依托真实世界数据申报审批，降低临床成本。'
  }
]
</script>

<template>
  <div class="slide-policy">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="timeline">
      <div v-for="(policy, i) in policies" :key="i" class="policy-card">
        <div class="policy-index">{{ String(i + 1).padStart(2, '0') }}</div>
        <div class="policy-content">
          <div class="policy-org">{{ policy.org }}</div>
          <div class="policy-doc">{{ policy.doc }}</div>
          <div class="policy-desc">{{ policy.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-policy {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}

.header {
  margin-bottom: 30px;
}

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

.timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.policy-card {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 32px 40px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-left: 4px solid #ffb74d;
  border-radius: var(--radius-md);
  position: relative;
}

.policy-index {
  font-size: 64px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffb74d, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-mono);
  min-width: 80px;
}

.policy-content {
  flex: 1;
}

.policy-org {
  font-size: var(--text-xl);
  color: #ffb74d;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.policy-doc {
  font-size: var(--text-lg);
  color: white;
  font-weight: 600;
  margin-bottom: 12px;
}

.policy-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  font-weight: 300;
}
</style>
