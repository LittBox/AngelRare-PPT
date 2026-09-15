<script setup>
/**
 * SlidePlatformDetail.vue
 * 第 11 页：平台介绍（详细）
 *
 * 内容来源（参考设计稿 slide11）：
 * - 平台介绍：实现真实世界医疗数据的安全协同与持续沉淀，推动临床、科研、产业的协同闭环
 */
const features = [
  {
    icon: '🔍',
    title: '基层发现',
    desc: '协助基层医生快速识别疑似罕见病患者'
  },
  {
    icon: '📊',
    title: '循证分析',
    desc: '基于多源医学证据的智能推理'
  },
  {
    icon: '🔄',
    title: '协同转诊',
    desc: '多主体间的高效协作与转诊'
  },
  {
    icon: '📚',
    title: '科研沉淀',
    desc: '病例数据结构化沉淀，服务科研'
  }
]
</script>

<template>
  <div class="slide-detail">
    <div class="header">
      <div class="badge">平台介绍</div>
      <h1 class="title">真实世界医疗数据的安全协同与持续沉淀</h1>
      <p class="subtitle">推动临床、科研、产业的协同闭环</p>
    </div>

    <div class="features-grid">
      <div v-for="(f, i) in features" :key="i" class="feature-card">
        <div class="feature-icon">{{ f.icon }}</div>
        <div class="feature-title">{{ f.title }}</div>
        <div class="feature-desc">{{ f.desc }}</div>
        <div class="feature-num">0{{ i + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-detail {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 100px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 80px; text-align: center; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(74, 108, 247, 0.15); color: var(--color-accent);
  border: 1px solid rgba(74, 108, 247, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 20px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 16px;
}
.subtitle {
  font-size: var(--text-lg); color: var(--color-text-muted);
  letter-spacing: 2px; font-weight: 300;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 32px;
  height: calc(100% - 280px);
}
.feature-card {
  position: relative;
  padding: 48px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.feature-icon {
  font-size: 64px; margin-bottom: 24px;
}
.feature-title {
  font-size: var(--text-2xl); font-weight: 700; color: white;
  margin-bottom: 12px; letter-spacing: 4px;
}
.feature-desc {
  font-size: var(--text-lg); color: var(--color-text-muted);
  line-height: 1.7; font-weight: 300;
}
.feature-num {
  position: absolute; top: 30px; right: 40px;
  font-size: 48px; font-weight: 900; color: rgba(74, 108, 247, 0.15);
  font-family: var(--font-mono);
}
</style>
