<script setup>import { ref } from 'vue'


/**
 * SlideAgents.vue
 * 第 12 页：SR Agent + DP Agent 技术
 *
 * 内容来源（参考设计稿 slide12）：
 * - SR Agent: 高质量循证前端
 *   SR Agent（系统综述智能体）是整个数据摄入流程的第一道防线，负责在 PubMed/Orphanet/ClinicalTrials.gov 等权威数据库中执行语义检索与多级漏斗筛选
 *
 * - DP Agent: 物理文档解析与结构化抽取
 *   DP Agent（文档处理智能体）调用 MinerU 高精度解析引擎与 BioBERT 医学专科预训练模型，将关键...
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('目标导向')
const slogan = ref('从真实需求出发，让产品不断收敛')

const agents = [
  {
    code: 'SR',
    name: 'SR Agent',
    role: '高质量循证前端',
    desc: '整个数据摄入流程的第一道防线',
    detail: '负责在 PubMed / Orphanet / ClinicalTrials.gov 等权威数据库中执行语义检索与多级漏斗筛选。',
    color: '#4a6cf7'
  },
  {
    code: 'DP',
    name: 'DP Agent',
    role: '物理文档解析与结构化抽取',
    desc: '将异构医学文献转为结构化数据',
    detail: '调用 MinerU 高精度解析引擎与 BioBERT 医学专科预训练模型，将关键信息精准抽取为结构化字段。',
    color: '#00d4ff'
  }
]
</script>

<template>
  <div class="slide-agents">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="agents-grid">
      <div v-for="(a, i) in agents" :key="i" class="agent-card">
        <div class="agent-code" :style="{ background: a.color }">{{ a.code }}</div>
        <div class="agent-body">
          <div class="agent-name">{{ a.name }}</div>
          <div class="agent-role">{{ a.role }}</div>
          <div class="agent-desc">{{ a.desc }}</div>
          <div class="agent-detail">{{ a.detail }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-agents {
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
.agents-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  height: calc(100% - 260px);
}
.agent-card {
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.agent-code {
  width: 200px;
  display: flex; align-items: center; justify-content: center;
  font-size: 96px; font-weight: 900; color: white;
  font-family: var(--font-mono);
  letter-spacing: 4px;
}
.agent-body { flex: 1; padding: 40px 48px; display: flex; flex-direction: column; justify-content: center; }
.agent-name {
  font-size: var(--text-2xl); font-weight: 700; color: white;
  margin-bottom: 8px; letter-spacing: 2px;
}
.agent-role {
  font-size: var(--text-lg); color: var(--color-accent);
  margin-bottom: 24px; font-weight: 500; letter-spacing: 2px;
}
.agent-desc {
  font-size: var(--text-lg); color: white;
  margin-bottom: 16px; font-weight: 500;
}
.agent-detail {
  font-size: var(--text-base); color: var(--color-text-muted);
  line-height: 1.8; font-weight: 300;
}
</style>
