<script setup>
/**
 * SlideIdeaStage.vue
 * 第 6 页：先期想法（项目立项过程）
 *
 * 内容来源（参考设计稿 slide6）：
 * - 项目负责人假期自学开发，项目完成从 0 到 1 的飞跃
 * - 线上调研，锚定项目方向
 * - 项目初期，组织团队成员开展线上调研工作，围绕国内外罕见病相关扶持政策、行业前沿研究动向展开资料搜集与深度研读
 */
const phases = [
  {
    label: '项目负责人',
    title: '假期自学开发',
    desc: '项目完成从 0 到 1 的飞跃'
  },
  {
    label: '团队组建',
    title: '线上调研，锚定项目方向',
    desc: '组织团队成员开展线上调研工作，围绕国内外罕见病相关扶持政策、行业前沿研究动向展开资料搜集与深度研读。'
  },
  {
    label: '项目启动',
    title: '小组研讨与方向校准',
    desc: '定期召开小组研讨会议，梳理行业现状与真实的临床需求，为后续项目开发筑牢理论基础、找准前进方向。'
  }
]
</script>

<template>
  <div class="slide-idea">
    <div class="header">
      <div class="badge">先期想法</div>
      <h1 class="title">项目立项：从课堂到真实的开始</h1>
    </div>

    <div class="phases">
      <div v-for="(phase, i) in phases" :key="i" class="phase-card">
        <div class="phase-label">{{ phase.label }}</div>
        <h3 class="phase-title">{{ phase.title }}</h3>
        <p class="phase-desc">{{ phase.desc }}</p>
        <div class="phase-num">0{{ i + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-idea {
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
  margin-bottom: 80px;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(0, 212, 255, 0.15);
  color: var(--color-accent);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.title {
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: 4px;
}

.phases {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
}

.phase-card {
  position: relative;
  padding: 48px 36px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.phase-label {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(74, 108, 247, 0.2);
  color: var(--color-primary-light);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.phase-title {
  font-size: var(--text-2xl);
  color: white;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.phase-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.8;
  font-weight: 300;
}

.phase-num {
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 80px;
  font-weight: 900;
  color: rgba(74, 108, 247, 0.1);
  font-family: var(--font-mono);
}
</style>
