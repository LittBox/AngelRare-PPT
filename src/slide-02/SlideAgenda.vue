<script setup>
/**
 * SlideAgenda.vue
 * 第 2 页：目录
 *
 * 内容来源（参考设计稿 slide2）：
 * 四大章节 + 每章节的 4-5 个子主题
 *
 * 01 个人成长：
 *   - 立德树人 / 调研深入 / 逻辑正确 / 知识掌握与应用能力 / 人才培养成效
 *
 * 02 项目创新：
 *   - 问题导向 / 目标导向 / 创新成效
 *
 * 03 产业价值：
 *   - 产业认知 / 市场定位 / 落地前景 / 社会影响
 *
 * 04 团队协作：
 *   - 团队精神 / 团队结构 / 团队效能 / 团队资源
 */
const sections = [
  {
    num: '01',
    title: '个人成长',
    slogan: '把青春写在国家需要的地方',
    items: ['立德树人', '调研深入', '逻辑正确', '知识掌握与应用能力', '人才培养成效']
  },
  {
    num: '02',
    title: '项目创新',
    slogan: '不只生成答案，更要证明答案',
    items: ['问题导向', '目标导向', '创新成效']
  },
  {
    num: '03',
    title: '产业价值',
    slogan: '诊断不是终点，而是服务的起点',
    items: ['产业认知', '市场定位', '落地前景', '社会影响']
  },
  {
    num: '04',
    title: '团队协作',
    slogan: '敢想 · 会创 · 同行 · 共进',
    items: ['团队精神', '团队结构', '团队效能', '团队资源']
  }
]
</script>

<template>
  <div class="slide-agenda">
    <!-- 顶部标题 -->
    <div class="header">
      <h1 class="page-title">目录</h1>
      <div class="title-en">CONTENTS</div>
    </div>

    <!-- 四象限布局：grid auto-rows 自适应高度，禁止任何裁切 -->
    <div class="agenda-grid">
      <div v-for="section in sections" :key="section.num" class="agenda-card">
        <div class="card-header">
          <div class="section-num">{{ section.num }}</div>
          <div class="section-title">{{ section.title }}</div>
        </div>
        <div class="section-slogan">{{ section.slogan }}</div>
        <ul class="section-items">
          <li v-for="(item, i) in section.items" :key="i">
            <span class="bullet">·</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-agenda {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  /* 禁止裁切子节点 */
  overflow: visible;
  display: flex;
  flex-direction: column;
}

/* 顶部标题 */
.header {
  display: flex;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 50px;
  flex-shrink: 0;
}

.page-title {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 8px;
  color: white;
  margin: 0;
}

.title-en {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.40);
  letter-spacing: 4px;
  font-weight: 300;
}

/* 四象限网格：使用 auto-rows + min-content，禁止固定高度裁切 */
.agenda-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* auto-rows + min-content 让每行自适应内容高度 */
  grid-auto-rows: min-content;
  gap: 36px;
  width: 100%;
  /* 不再使用 calc(100vh - ...) 这种容易裁切的固定高度 */
  flex: 1;
  min-height: 0;
}

.agenda-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  padding: 36px 48px;
  position: relative;
  /* 关键修复：禁止 hidden，让内容溢出可见 */
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.agenda-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.section-num {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-mono);
  line-height: 1;
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 4px;
  color: white;
}

.section-slogan {
  font-size: 22px;
  color: var(--color-accent);
  font-weight: 300;
  letter-spacing: 1px;
  padding-left: 8px;
  font-style: italic;
  flex-shrink: 0;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;
  margin: 0;
  list-style: none;
  flex-shrink: 0;
}

.section-items li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 22px; /* 容易阅读，不缩到 < 20px */
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
}

.bullet {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 28px;
}
</style>