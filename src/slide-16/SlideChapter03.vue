<script setup>
const chapterNum = '03'
const chapterTitle = '产业价值'
const subtitle = 'Industry Value & Business Model'
</script>

<template>
  <div class="slide-chapter">
    <div class="bg-base"></div>
    <div class="bg-orb-1"></div>
    <div class="bg-orb-2"></div>
    <div class="bg-grid"></div>
    <div class="bg-line-top"></div>
    <div class="content">
      <div class="chapter-index-bg">{{ chapterNum }}</div>
      <div class="chapter-content">
        <div class="chapter-num">{{ chapterNum }}</div>
        <h1 class="chapter-title">{{ chapterTitle }}</h1>
        <div class="chapter-subtitle">{{ subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-chapter {
  width: 1920px; height: 1080px; position: relative;
  background: #020817; color: white; font-family: var(--font-display); overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.bg-base { position: absolute; inset: 0; background: radial-gradient(ellipse 100% 60% at 50% 0%, #040819 0%, #020817 100%); }
.bg-orb-1 { position: absolute; top: -300px; right: -200px; width: 900px; height: 900px; background: radial-gradient(circle, rgba(232,179,92,0.10) 0%, transparent 70%); filter: blur(80px); }
.bg-orb-2 { position: absolute; bottom: -200px; left: -100px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(47,128,255,0.08) 0%, transparent 70%); filter: blur(80px); }
.bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(232,179,92,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,179,92,0.03) 1px, transparent 1px); background-size: 100px 100px; }
.bg-line-top { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(232,179,92,0.5), transparent); }
.content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; text-align: center; }
.chapter-index-bg { position: absolute; font-size: 600px; font-weight: 900; font-family: var(--font-mono); color: rgba(232,179,92,0.05); letter-spacing: -20px; line-height: 1; user-select: none; pointer-events: none; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.chapter-content { position: relative; }
.chapter-num { font-size: 160px; font-weight: 900; line-height: 1; background: linear-gradient(135deg, #E8B35C 0%, #F6C76E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: var(--font-mono); margin-bottom: 24px; }
.chapter-title { font-size: var(--text-5xl); font-weight: 800; letter-spacing: 24px; margin: 0 0 24px 0; background: linear-gradient(135deg, #ffffff 0%, #ffd78b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.chapter-subtitle { font-size: var(--text-xl); color: rgba(255,255,255,0.40); letter-spacing: 8px; font-weight: 300; }
</style>
