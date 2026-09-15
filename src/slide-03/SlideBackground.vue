<script setup>
/**
 * SlideBackground.vue
 * 第 3 页：章节封面（问题洞察与个人成长）
 *
 * 设计思路：
 * - 这是大章节的"分页扉页"，给读者一个视觉喘息
 * - 用大字号标语 + 章节概述 + 章节小图标
 */
const chapterNum = '01'
const chapterTitle = '个人成长'
const chapterSubtitle = 'Problem Insight & Personal Growth'
const chapterQuote = '真实问题驱动，成长贯穿始终'
const chapterDesc = '从课堂到基层，从迷茫到担当 —— 学生团队在真实痛点中完成蜕变'
</script>

<template>
  <div class="slide-chapter">
    <!-- 背景装饰 -->
    <div class="bg-gradient"></div>
    <div class="bg-particles"></div>

    <!-- 主内容 -->
    <div class="content">
      <!-- 大数字 -->
      <div class="chapter-num">{{ chapterNum }}</div>

      <!-- 章节标题 -->
      <h1 class="chapter-title">{{ chapterTitle }}</h1>

      <!-- 英文副标题 -->
      <div class="chapter-subtitle">{{ chapterSubtitle }}</div>

      <!-- 装饰线 -->
      <div class="divider-line"></div>

      <!-- 核心标语 -->
      <div class="chapter-quote">"{{ chapterQuote }}"</div>

      <!-- 章节描述 -->
      <p class="chapter-desc">{{ chapterDesc }}</p>
    </div>
  </div>
</template>

<style scoped>
.slide-chapter {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  overflow: hidden;
}

/* 背景渐变 */
.bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 50%, rgba(74, 108, 247, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%);
}

/* 粒子装饰（占位） */
.bg-particles {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 20%, white 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, white 1px, transparent 1px),
    radial-gradient(circle at 50% 40%, white 1px, transparent 1px);
  background-size: 200px 200px, 300px 300px, 250px 250px;
  opacity: 0.1;
}

/* 主内容 */
.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1400px;
  padding: 0 80px;
}

.chapter-num {
  font-size: 200px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -4px;
  margin-bottom: 32px;
}

.chapter-title {
  font-size: var(--text-5xl);
  font-weight: 700;
  letter-spacing: 16px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chapter-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-dim);
  letter-spacing: 6px;
  font-weight: 300;
  margin-bottom: 40px;
}

.divider-line {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent);
  margin: 40px auto;
}

.chapter-quote {
  font-size: var(--text-3xl);
  font-weight: 300;
  color: var(--color-text);
  margin-bottom: 24px;
  letter-spacing: 4px;
  line-height: 1.5;
}

.chapter-desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1.8;
}
</style>
