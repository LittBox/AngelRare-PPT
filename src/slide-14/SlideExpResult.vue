<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

/**
 * SlideExpResult.vue
 * 第 14 页：创新成效｜服务模式创新
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜服务模式创新')
const slogan = ref('让最需要帮助的人，不成为买单的人')

const principle = [
  { role: '患者', action: '免费', reason: '罕见病患者家庭已承受巨大的诊疗经济压力', color: '#E8B35C', icon: '👤' },
  { role: '医生科研', action: '付费', reason: '提升科研效率，减轻病例整理负担', color: '#3C8DFF', icon: '👨‍⚕️' },
  { role: '药企', action: '付费', reason: '获取高质量脱敏数据，加速药物研发', color: '#19C6FF', icon: '💊' },
]

const revenueLines = [
  { num: '01', name: '数据采集与治理', desc: '标准化病例数据结构化服务', price: '8-15 万 / 项目', color: '#3C8DFF' },
  { num: '02', name: '脱敏数据订阅', desc: '持续更新脱敏病例数据订阅', price: '30-60 万 / 年', color: '#19C6FF' },
  { num: '03', name: '定制分析与 RWS', desc: '基于真实世界数据的定制报告', price: '按项目议价', color: '#4CAF50' },
]

const finance = { title: '18 个月净盈余', value: '194 万' }

const validation = [
  { icon: '🏥', stakeholder: '医生群体', evidence: '已完成 3 家医院的合作意向书签署意向' },
  { icon: '💊', stakeholder: '药企群体', evidence: '已与 2 家药企建立初步合作接触' },
  { icon: '👥', stakeholder: '患者群体', evidence: '患者端零收费，已建立患者随访社群 500+ 人' },
]
</script>

<template>
  <div class="slide-exp">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="gold" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 核心原则 -->
      <div class="inner-section">
        <div class="inner-section-label">核心原则：谁受益，谁付钱</div>
        <div class="principle-row">
          <div v-for="p in principle" :key="p.role" class="principle-card" :style="{ borderColor: p.color + '60' }">
            <div class="pc-icon">{{ p.icon }}</div>
            <div class="pc-body">
              <div class="pc-role" :style="{ color: p.color }">{{ p.role }}</div>
              <div class="pc-action" :style="{ background: p.color }">{{ p.action }}</div>
              <div class="pc-reason">{{ p.reason }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 三条收入线 -->
      <div class="inner-section">
        <div class="inner-section-label">三条收入线</div>
        <div class="revenue-row">
          <div v-for="r in revenueLines" :key="r.num" class="revenue-card" :style="{ borderColor: r.color + '50' }">
            <div class="rv-num" :style="{ color: r.color }">{{ r.num }}</div>
            <div class="rv-name">{{ r.name }}</div>
            <div class="rv-desc">{{ r.desc }}</div>
            <div class="rv-price" :style="{ color: r.color }">{{ r.price }}</div>
          </div>
        </div>
      </div>

      <!-- 财务预测 + 付费意愿 -->
      <div class="bottom-row">
        <div class="finance-card">
          <div class="fc-label">{{ finance.title }}</div>
          <div class="fc-value">{{ finance.value }}</div>
        </div>
        <div class="validation-panel">
          <div class="vp-label">付费意愿验证</div>
          <div class="vp-list">
            <div v-for="v in validation" :key="v.stakeholder" class="vp-item">
              <span class="vp-icon">{{ v.icon }}</span>
              <span class="vp-role" :style="{ color: v.icon === '🏥' ? '#3C8DFF' : v.icon === '💊' ? '#19C6FF' : '#E8B35C' }">{{ v.stakeholder }}</span>
              <span class="vp-evidence">{{ v.evidence }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-exp {
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
  background: linear-gradient(135deg, #ffffff 0%, #E8B35C 60%, #F6C76E 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.inner-section { display: flex; flex-direction: column; gap: 12px; }
.inner-section-label {
  font-size: 12px; color: var(--color-gold); font-weight: 700; letter-spacing: 4px;
}
.principle-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.principle-card {
  display: flex; align-items: center; gap: 20px; padding: 20px 24px;
  background: rgba(255,255,255,0.03); border: 1px solid; border-radius: var(--radius-lg);
}
.pc-icon { font-size: 40px; flex-shrink: 0; }
.pc-body { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.pc-role { font-size: var(--text-xl); font-weight: 700; letter-spacing: 2px; }
.pc-action {
  display: inline-block; padding: 4px 14px; border-radius: 999px;
  font-size: var(--text-base); font-weight: 700; color: white; align-self: flex-start;
}
.pc-reason { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; font-weight: 300; }
.revenue-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.revenue-card {
  padding: 24px; background: rgba(255,255,255,0.03);
  border: 1px solid; border-radius: var(--radius-lg);
}
.rv-num { font-size: 36px; font-weight: 900; font-family: var(--font-mono); margin-bottom: 8px; }
.rv-name { font-size: var(--text-xl); font-weight: 700; color: white; margin-bottom: 6px; }
.rv-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; margin-bottom: 12px; line-height: 1.5; }
.rv-price { font-size: var(--text-xl); font-weight: 900; font-family: var(--font-mono); }
.bottom-row { display: grid; grid-template-columns: 300px 1fr; gap: 20px; margin-top: auto; }
.finance-card {
  padding: 32px; display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: linear-gradient(135deg, rgba(232,179,92,0.08) 0%, rgba(76,175,80,0.05) 100%);
  border: 1px solid rgba(76,175,80,0.25); border-radius: var(--radius-lg);
}
.fc-label { font-size: var(--text-sm); color: var(--color-text-muted); letter-spacing: 2px; margin-bottom: 8px; }
.fc-value { font-size: 64px; font-weight: 900; font-family: var(--font-mono);
  background: linear-gradient(135deg, #4CAF50, var(--color-gold));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.validation-panel { padding: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); }
.vp-label { font-size: 12px; color: var(--color-gold); font-weight: 700; letter-spacing: 4px; margin-bottom: 12px; }
.vp-list { display: flex; flex-direction: column; gap: 10px; }
.vp-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); }
.vp-icon { font-size: 20px; }
.vp-role { font-size: var(--text-base); font-weight: 700; min-width: 80px; }
.vp-evidence { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; }
</style>
