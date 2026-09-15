<script setup>
/**
 * SlideCompetitor.vue
 * 第 18 页：竞品分析
 *
 * 内容来源（参考设计稿 slide17）：
 * - 产品定位：面向罕见病鉴别诊断的多智能体系统
 * - 医学深度研究智能体 / 开源模型框架
 * - 2026 年发布了医疗大模型
 * - 现有竞品：Baichuan-M3、DeepRare、MedResearcher-R1、百川智能
 * - 现有竞品更强调 AI 端到端自动完成诊断与研究推理
 * - AngelRare 本项目突出"人机协同"的决策模式
 */
const competitors = [
  {
    name: 'Baichuan-M3',
    company: '百川智能',
    year: '2026',
    focus: '医疗大模型',
    model: '端到端 AI 诊断'
  },
  {
    name: 'DeepRare',
    company: '开源框架',
    year: '2024',
    focus: '罕见病研究',
    model: 'AI 推理引擎'
  },
  {
    name: 'MedResearcher-R1',
    company: '学术开源',
    year: '2025',
    focus: '医学研究',
    model: '研究推理模型'
  }
]
</script>

<template>
  <div class="slide-comp">
    <div class="header">
      <div class="badge">竞品分析</div>
      <h1 class="title">我们的优势：人机协同，差异化定位</h1>
    </div>

    <!-- 对比表 -->
    <div class="compare-table">
      <div class="ct-header">
        <div class="ct-cell">产品</div>
        <div class="ct-cell">公司</div>
        <div class="ct-cell">发布年份</div>
        <div class="ct-cell">核心方向</div>
        <div class="ct-cell">决策模式</div>
      </div>
      <div class="ct-row our">
        <div class="ct-cell"><span class="our-tag">本项目</span><strong>AngelRare</strong></div>
        <div class="ct-cell">云南大学</div>
        <div class="ct-cell">2026</div>
        <div class="ct-cell">罕见病鉴别诊断多智能体系统</div>
        <div class="ct-cell hl">人机协同</div>
      </div>
      <div v-for="(c, i) in competitors" :key="i" class="ct-row">
        <div class="ct-cell"><strong>{{ c.name }}</strong></div>
        <div class="ct-cell">{{ c.company }}</div>
        <div class="ct-cell">{{ c.year }}</div>
        <div class="ct-cell">{{ c.focus }}</div>
        <div class="ct-cell">端到端 AI 自动推理</div>
      </div>
    </div>

    <!-- 差异化总结 -->
    <div class="diff-summary">
      <div class="diff-card">
        <div class="diff-icon">🎯</div>
        <div class="diff-text">
          <div class="diff-title">聚焦罕见病</div>
          <div class="diff-desc">垂直深耕罕见病鉴别诊断场景，而非通用医疗</div>
        </div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">🤝</div>
        <div class="diff-text">
          <div class="diff-title">人机协同</div>
          <div class="diff-desc">AI 完成证据检索与建议，医生保留最终决策权</div>
        </div>
      </div>
      <div class="diff-card">
        <div class="diff-icon">⚖️</div>
        <div class="diff-text">
          <div class="diff-title">可循证可质证</div>
          <div class="diff-desc">ArguLoop 论辩机制让结论可追溯、可复核</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-comp {
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
  background: rgba(244, 67, 54, 0.15); color: #ef5350;
  border: 1px solid rgba(244, 67, 54, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title { font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px; }
.compare-table {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 32px;
}
.ct-header, .ct-row {
  display: grid;
  grid-template-columns: 1.4fr 1.2fr 1fr 1.6fr 1.6fr;
  padding: 20px 32px;
  align-items: center;
}
.ct-header {
  background: rgba(74, 108, 247, 0.1);
  font-size: var(--text-base); color: var(--color-accent);
  letter-spacing: 2px; font-weight: 600;
}
.ct-row { border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: var(--text-base); }
.ct-row.our {
  background: rgba(0, 212, 255, 0.08);
  color: var(--color-accent);
  font-weight: 600;
}
.our-tag {
  display: inline-block; padding: 2px 10px;
  background: rgba(0, 212, 255, 0.2); color: var(--color-accent);
  border-radius: var(--radius-full); font-size: var(--text-sm);
  margin-right: 12px;
}
.hl { color: var(--color-accent); font-weight: 700; }
.diff-summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
.diff-card {
  display: flex; align-items: center; gap: 20px;
  padding: 24px 32px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}
.diff-icon { font-size: 48px; }
.diff-title { font-size: var(--text-lg); font-weight: 700; color: white; margin-bottom: 4px; }
.diff-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; }
</style>
