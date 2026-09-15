<script setup>
/**
 * SlideChapter04.vue
 * 第 21 页：第四章扉页（团队协作）
 */
const chapterNum = '04'
const chapterTitle = '团队协作'
const chapterSubtitle = 'Team Collaboration & Resources'
const quote = '能力闭环支撑长期演进'
const desc = '学生主导、资源赋能，三步走实现产业基础设施 —— 各有所长，彼此成就'
</script>

<template>
  <div class="slide-chapter">
    <div class="bg-gradient"></div>
    <div class="bg-particles"></div>
    <div class="content">
      <div class="chapter-num">{{ chapterNum }}</div>
      <h1 class="chapter-title">{{ chapterTitle }}</h1>
      <div class="chapter-subtitle">{{ chapterSubtitle }}</div>
      <div class="divider-line"></div>
      <div class="chapter-quote">"{{ quote }}"</div>
      <p class="chapter-desc">{{ desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.slide-chapter {
  width: 1920px; height: 1080px; position: relative;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%);
  color: white; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); overflow: hidden;
}
.bg-gradient { position: absolute; inset: 0; background:
  radial-gradient(circle at 30% 50%, rgba(74, 108, 247, 0.2) 0%, transparent 50%),
  radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%);
}
.bg-particles { position: absolute; inset: 0; background-image:
  radial-gradient(circle at 10% 20%, white 1px, transparent 1px),
  radial-gradient(circle at 80% 80%, white 1px, transparent 1px),
  radial-gradient(circle at 50% 40%, white 1px, transparent 1px);
  background-size: 200px 200px, 300px 300px, 250px 250px; opacity: 0.1;
}
.content { position: relative; z-index: 2; text-align: center; max-width: 1400px; padding: 0 80px; }
.chapter-num { font-size: 200px; font-weight: 900; line-height: 1;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -4px; margin-bottom: 32px;
}
.chapter-title { font-size: var(--text-5xl); font-weight: 700; letter-spacing: 16px; margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.chapter-subtitle { font-size: var(--text-base); color: var(--color-text-dim); letter-spacing: 6px; font-weight: 300; margin-bottom: 40px; }
.divider-line { width: 200px; height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent);
  margin: 40px auto;
}
.chapter-quote { font-size: var(--text-3xl); font-weight: 300; color: var(--color-text);
  margin-bottom: 24px; letter-spacing: 4px; line-height: 1.5;
}
.chapter-desc { font-size: var(--text-lg); color: var(--color-text-muted);
  font-weight: 300; letter-spacing: 2px; line-height: 1.8;
}
</style>
