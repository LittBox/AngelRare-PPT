<script setup>
/**
 * SlidePlatform.vue
 * 第 10 页：AngelRare 平台介绍
 *
 * 内容来源（参考设计稿 slide10）：
 * - AngelRare 聚焦 罕见病 发现难 确诊慢 研究弱
 * - 融合 多技术 人工智能 多源数据 可信推理
 * - 构建 新体系 基层发现 循证分析 协同转诊 科研沉淀
 * - 面向罕见病领域的智能辅助诊疗与科研协同平台
 * - 面向基层医生，协助快速识别疑似罕见病患者
 * - 支持科研人员开展病例整理、自然史研究与证据整合
 */
const focusItems = ['发现难', '确诊慢', '研究弱']
const techItems = ['人工智能', '多源数据', '可信推理']
const sysItems = ['基层发现', '循证分析', '协同转诊', '科研沉淀']
</script>

<template>
  <div class="slide-platform">
    <div class="header">
      <div class="badge">平台介绍</div>
      <h1 class="title">AngelRare：面向罕见病的智能辅助诊疗与科研协同平台</h1>
    </div>

    <div class="content">
      <!-- 中间 Logo -->
      <div class="brand-center">
        <div class="brand-logo">AngelRare</div>
      </div>

      <!-- 三层结构 -->
      <div class="layer layer-focus">
        <div class="layer-label">聚焦</div>
        <div class="layer-items">
          <div v-for="item in focusItems" :key="item" class="item focus-item">{{ item }}</div>
        </div>
      </div>

      <div class="arrow">↓</div>

      <div class="layer layer-tech">
        <div class="layer-label">融合</div>
        <div class="layer-items">
          <div v-for="item in techItems" :key="item" class="item tech-item">{{ item }}</div>
        </div>
      </div>

      <div class="arrow">↓</div>

      <div class="layer layer-sys">
        <div class="layer-label">构建</div>
        <div class="layer-items">
          <div v-for="item in sysItems" :key="item" class="item sys-item">{{ item }}</div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="footer-note">
        <div class="note-item">
          <span class="note-icon">🏥</span>
          <span>面向基层医生，协助快速识别疑似罕见病患者，提升诊疗效率</span>
        </div>
        <div class="note-item">
          <span class="note-icon">🔬</span>
          <span>支持科研人员开展病例整理、自然史研究与证据整合</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-platform {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 40px; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(74, 108, 247, 0.15); color: var(--color-accent);
  border: 1px solid rgba(74, 108, 247, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 20px;
}
.title {
  font-size: var(--text-2xl); font-weight: 700; letter-spacing: 2px;
}
.content { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.brand-center {
  font-size: var(--text-3xl); font-weight: 900; letter-spacing: 4px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 16px;
}
.layer {
  width: 80%;
  display: flex; align-items: center; gap: 24px;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-lg);
}
.layer-label {
  font-size: var(--text-base); color: var(--color-accent);
  font-weight: 600; letter-spacing: 4px; min-width: 60px;
}
.layer-items { display: flex; gap: 16px; flex: 1; justify-content: center; }
.item {
  padding: 12px 28px;
  border-radius: var(--radius-full);
  font-size: var(--text-lg); font-weight: 600;
  letter-spacing: 2px;
}
.focus-item {
  background: rgba(244, 67, 54, 0.15); color: #f44336; border: 1px solid rgba(244, 67, 54, 0.3);
}
.tech-item {
  background: rgba(74, 108, 247, 0.15); color: var(--color-primary-light); border: 1px solid rgba(74, 108, 247, 0.3);
}
.sys-item {
  background: rgba(0, 212, 255, 0.15); color: var(--color-accent); border: 1px solid rgba(0, 212, 255, 0.3);
}
.arrow {
  font-size: 32px; color: var(--color-primary); opacity: 0.5;
}
.footer-note {
  display: flex; gap: 40px; margin-top: 24px; justify-content: center;
}
.note-item {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  font-size: var(--text-base); color: var(--color-text-muted);
  font-weight: 300;
}
.note-icon { font-size: 24px; }
</style>
