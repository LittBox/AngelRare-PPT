<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

/**
 * SlideBusinessModel.vue
 * 第 17 页：产业认知
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('产业认知')
const slogan = ref('诊断不是终点，而是服务的起点')

const stats = [
  { value: '约 2000 万', label: '罕见病患者群体' },
  { value: '5-7 年', label: '平均确诊周期' },
  { value: '年增速 >20%', label: '罕见病药物市场' },
  { value: '>70%', label: '缺乏系统性数据积累' },
]

const status = [
  { icon: '🔬', label: '诊断端拥挤', desc: 'AI辅助诊断产品集中，竞争激烈' },
  { icon: '📋', label: '诊断后服务空白', desc: '确诊后患者管理、PAP、RWE领域几乎空白' },
  { icon: '🏥', label: '数据孤岛严重', desc: '医院之间、科室之间数据无法互通' },
  { icon: '💊', label: '药企需求强烈', desc: '药企对真实世界数据（RWE）的需求持续上升' },
]

const trends = [
  { label: '政策持续加码', detail: '国家鼓励罕见病药物研发与真实世界数据应用' },
  { label: 'RWE 价值凸显', detail: '真实世界证据可支持罕见病药物审评审批' },
  { label: '基层医疗下沉', detail: '分级诊疗推动基层医疗机构能力提升需求' },
  { label: '数据资产化', detail: '医疗数据结构化、标准化成为行业基础设施' },
]

const challenges = [
  { challenge: '数据分散', detail: '病例数据碎片化，无法形成规模效应' },
  { challenge: '协同困难', detail: '多主体（患者/医生/药企）之间缺乏有效连接' },
  { challenge: '价值断链', detail: '诊断结论与后续管理、科研、援助之间脱节' },
]
</script>

<template>
  <div class="slide-bm">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 行业背景数字 -->
      <div class="stats-row">
        <div v-for="s in stats" :key="s.label" class="stat-item">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>

      <!-- 三栏：现状 / 趋势 / 挑战 -->
      <div class="three-col">
        <div class="col-panel">
          <div class="col-label">产业发展现状</div>
          <div class="col-items">
            <div v-for="s in status" :key="s.label" class="col-item">
              <span class="ci-icon">{{ s.icon }}</span>
              <div class="ci-body">
                <div class="ci-label">{{ s.label }}</div>
                <div class="ci-desc">{{ s.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-panel">
          <div class="col-label">行业趋势与关键机会</div>
          <div class="col-items">
            <div v-for="t in trends" :key="t.label" class="col-item trend">
              <div class="ci-label green">{{ t.label }}</div>
              <div class="ci-desc">{{ t.detail }}</div>
            </div>
          </div>
        </div>

        <div class="col-panel">
          <div class="col-label">核心痛点与挑战</div>
          <div class="col-items">
            <div v-for="c in challenges" :key="c.challenge" class="col-item challenge">
              <div class="ci-label red">{{ c.challenge }}</div>
              <div class="ci-desc">{{ c.detail }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-note">注：竞品详细对比见「市场定位」页</div>
    </div>
  </div>
</template>

<style scoped>
.slide-bm {
  width: 1920px; height: 1080px; position: relative;
  background: var(--color-bg); color: white;
  font-family: var(--font-display); overflow: hidden; display: flex; flex-direction: column;
}
.content {
  position: relative; z-index: var(--z-base);
  padding: 52px 100px 40px; display: flex; flex-direction: column; gap: 28px; height: 100%;
}
.top { display: flex; flex-direction: column; gap: 12px; }
.slogan {
  margin: 0; padding: 0; font-size: var(--text-4xl); font-weight: 800;
  line-height: 1.1; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-item {
  padding: 20px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md);
  text-align: center;
}
.stat-value { font-size: var(--text-2xl); font-weight: 800; color: white; margin-bottom: 6px; line-height: 1.2; }
.stat-label { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; }
.three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; flex: 1; }
.col-panel {
  padding: 24px; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius-lg);
  display: flex; flex-direction: column; gap: 14px;
}
.col-label {
  font-size: 12px; color: var(--color-blue-bright); font-weight: 700;
  letter-spacing: 4px; padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.col-items { display: flex; flex-direction: column; gap: 12px; }
.col-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); }
.col-item.trend { flex-direction: column; }
.col-item.challenge { background: rgba(244,67,54,0.04); border: 1px solid rgba(244,67,54,0.15); }
.ci-icon { font-size: 22px; flex-shrink: 0; }
.ci-body { flex: 1; }
.ci-label { font-size: var(--text-base); font-weight: 700; color: white; margin-bottom: 4px; }
.ci-label.green { color: #4CAF50; }
.ci-label.red { color: #F44336; }
.ci-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; line-height: 1.5; }
.footer-note {
  font-size: var(--text-xs); color: var(--color-text-muted);
  font-weight: 300; text-align: right; letter-spacing: 1px;
  margin-top: auto;
}
</style>
