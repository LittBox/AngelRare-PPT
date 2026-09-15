<script setup>
/**
 * SlideEnding.vue
 * 第 29 页：故事结尾（结束语）
 *
 * 内容来源（参考设计稿 slide28 + slide29）：
 * - 让每一次被忽视，都成为下一位患者更早被看见的理由
 * - 让每一次检索有据可循，让每一个罕见不再被遗漏
 * - 每一份被沉淀的病例，都可能照亮了一位患者的路
 * - 我们没有在寻找病例，我们是在让一个家庭更早找到答案
 */
const lines = [
  '让每一次被忽视，',
  '都成为下一位患者更早被看见的理由。'
]
const finalWords = [
  '让每一次检索有据可循，',
  '让每一个罕见不再被遗漏。',
  '每一份被沉淀的病例，',
  '都可能照亮了一位患者的路。',
  '我们没有在寻找病例，',
  '我们是在让一个家庭更早找到答案。'
]
</script>

<template>
  <div class="slide-ending">
    <div class="bg-decoration"></div>

    <div class="content">
      <div class="brand">AngelRare</div>
      <div class="main-quote">
        <div v-for="(line, i) in lines" :key="i" class="quote-line">{{ line }}</div>
      </div>

      <div class="divider"></div>

      <div class="final-words">
        <div v-for="(word, i) in finalWords" :key="i" class="word-line">{{ word }}</div>
      </div>

      <div class="signature">— AngelRare 团队</div>
    </div>
  </div>
</template>

<style scoped>
.slide-ending {
  width: 1920px; height: 1080px; position: relative;
  background: #000;
  color: white; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); overflow: hidden;
}
.bg-decoration {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(circle at 20% 30%, rgba(74, 108, 247, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
}
.content {
  position: relative; z-index: 2;
  text-align: center; max-width: 1500px;
  padding: 0 80px;
}
.brand {
  font-size: var(--text-3xl); font-weight: 900; letter-spacing: 12px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 48px;
}
.main-quote {
  font-size: var(--text-3xl); font-weight: 300;
  letter-spacing: 4px; line-height: 1.8;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 48px;
}
.quote-line { margin-bottom: 8px; }
.divider {
  width: 200px; height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent);
  margin: 48px auto;
}
.final-words {
  font-size: var(--text-xl); font-weight: 300;
  letter-spacing: 3px; line-height: 2;
  color: var(--color-text-muted);
  margin-bottom: 48px;
}
.word-line { margin-bottom: 4px; }
.signature {
  font-size: var(--text-base); color: var(--color-text-dim);
  letter-spacing: 4px; font-style: italic;
}
</style>
