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

    <!-- 四象限布局 -->
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
  padding: 100px 140px;
  font-family: var(--font-display);
  overflow: hidden;
}

/* 顶部标题 */
.header {
  display: flex;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 60px;
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  letter-spacing: 8px;
  color: white;
}

.title-en {
  font-size: var(--text-base);
  color: var(--color-text-dim);
  letter-spacing: 4px;
  font-weight: 300;
}

/* 四象限网格 */
.agenda-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
  /* 固定网格高度，确保卡片有足够空间显示所有条目 */
  height: calc(100vh - 100px - 100px - 180px);
  min-height: 720px;
}

.agenda-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 32px 40px;
  position: relative;
  overflow: hidden;
  transition: all var(--duration-base) var(--ease-out);
  /* 确保卡片高度足以容纳 5 条目 */
  min-height: 280px;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 16px;
}

.section-num {
  font-size: var(--text-3xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 4px;
}

.section-slogan {
  font-size: var(--text-base);
  color: var(--color-accent);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 24px;
  padding-left: 8px;
  font-style: italic;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 8px;
  flex: 1; /* 占据剩余空间 */
}

.section-items li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--text-base); /* 适当缩小确保 5 条目可显示 */
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.4;
  white-space: nowrap;
}

.bullet {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--text-xl);
}
</style>
