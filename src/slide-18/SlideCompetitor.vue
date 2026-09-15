<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideCompetitor.vue
 * 第 18 页：市场定位
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('市场定位')
const slogan = ref('窄赛道，深服务，强连接')

const competitors = [
  { name: 'Baichuan-M3', company: '百川智能', year: '2026', focus: '医疗大模型', mode: '端到端 AI 诊断' },
  { name: 'DeepRare', company: '开源框架', year: '2024', focus: '罕见病研究', mode: 'AI 推理引擎' },
  { name: 'MedResearcher-R1', company: '学术开源', year: '2025', focus: '医学研究', mode: '研究推理模型' },
]

const diffCards = [
  { icon: '🎯', title: '聚焦罕见病', desc: '垂直深耕罕见病鉴别诊断场景，而非通用医疗' },
  { icon: '🤝', title: '人机协同', desc: 'AI 完成证据检索与建议，医生保留最终决策权' },
  { icon: '⚖️', title: '可循证可质证', desc: 'ArguLoop 论辩机制让结论可追溯、可复核' },
]
</script>

<template>
  <div class="slide-comp">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 竞品对比表 -->
      <div class="compare-table">
        <div class="ct-header">
          <div class="ct-cell">产品</div>
          <div class="ct-cell">公司</div>
          <div class="ct-cell">年份</div>
          <div class="ct-cell">核心方向</div>
          <div class="ct-cell">决策模式</div>
        </div>
        <div class="ct-row our">
          <div class="ct-cell">
            <span class="our-tag">本项目</span>
            <strong>AngelRare</strong>
          </div>
          <div class="ct-cell">云南大学</div>
          <div class="ct-cell">2026</div>
          <div class="ct-cell">罕见病鉴别诊断多智能体系统</div>
          <div class="ct-cell gold">人机协同</div>
        </div>
        <div v-for="c in competitors" :key="c.name" class="ct-row">
          <div class="ct-cell"><strong>{{ c.name }}</strong></div>
          <div class="ct-cell">{{ c.company }}</div>
          <div class="ct-cell">{{ c.year }}</div>
          <div class="ct-cell">{{ c.focus }}</div>
          <div class="ct-cell">端到端 AI 自动推理</div>
        </div>
      </div>

      <!-- 差异化三卡片 -->
      <div class="diff-row">
        <div v-for="d in diffCards" :key="d.title" class="diff-card">
          <span class="dc-icon">{{ d.icon }}</span>
          <div class="dc-body">
            <div class="dc-title">{{ d.title }}</div>
            <div class="dc-desc">{{ d.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-comp {
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
.compare-table {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg);
  overflow: hidden;
}
.ct-header, .ct-row {
  display: grid; grid-template-columns: 1.4fr 1.2fr 0.8fr 1.6fr 1.6fr;
  padding: 20px 32px; align-items: center;
}
.ct-header {
  background: rgba(57,141,255,0.12); font-size: var(--text-sm);
  color: var(--color-blue-bright); letter-spacing: 2px; font-weight: 600;
}
.ct-row { border-top: 1px solid rgba(255,255,255,0.05); font-size: var(--text-base); }
.ct-row.our { background: rgba(57,141,255,0.06); }
.ct-cell { color: var(--color-text-muted); }
.ct-row.our .ct-cell { color: var(--color-blue-bright); font-weight: 600; }
.ct-cell strong { color: white; font-weight: 700; }
.ct-cell.gold { color: var(--color-gold); font-weight: 700; }
.our-tag {
  display: inline-block; padding: 2px 10px; margin-right: 8px;
  background: rgba(57,141,255,0.2); color: var(--color-blue-bright);
  border-radius: 999px; font-size: var(--text-xs); font-weight: 600;
}
.diff-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: auto; }
.diff-card {
  display: flex; align-items: center; gap: 20px;
  padding: 28px 32px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(57,141,255,0.15); border-radius: var(--radius-lg);
}
.dc-icon { font-size: 40px; flex-shrink: 0; }
.dc-body { flex: 1; }
.dc-title { font-size: var(--text-xl); font-weight: 700; color: white; margin-bottom: 6px; }
.dc-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; line-height: 1.5; }
</style>
