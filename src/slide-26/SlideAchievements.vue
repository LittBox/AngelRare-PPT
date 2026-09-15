<script setup>
/**
 * SlideAchievements.vue
 * 第 26 页：已有成果（专利/论文/奖项）
 *
 * 内容来源（参考设计稿 slide25）：
 * - 项目研究成果丰硕
 * - 专利 7 项
 * - 软著 3 项
 * - 论文 1 篇
 * - 团队成员依托成长
 * - 团队成员依托项目获得成长
 * - 斩获多项学科竞赛省级国家级以上奖项
 */
const achievements = [
  { num: 7, label: '专利', icon: '📋', color: '#4a6cf7' },
  { num: 3, label: '软著', icon: '💻', color: '#00d4ff' },
  { num: 1, label: '论文', icon: '📄', color: '#4caf50' },
  { num: 6, label: '省级以上奖项', icon: '🏆', color: '#ff9800' }
]
const awards = [
  '高教杯全国大学生数学建模竞赛 全国二等奖',
  '正大杯全国大学生市场调查与分析大赛 全国三等奖',
  '校级学术科研奖学金',
  '校级一等奖学金',
  '岳虹本科生奖学金',
  '互联网+大学生创新创业大赛 省级金奖'
]
</script>

<template>
  <div class="slide-ach">
    <div class="header">
      <div class="badge">已有成果</div>
      <h1 class="title">项目研究成果丰硕 · 团队成员依托成长</h1>
    </div>

    <!-- 四大数字 -->
    <div class="numbers-grid">
      <div v-for="(a, i) in achievements" :key="i" class="num-card">
        <div class="num-icon">{{ a.icon }}</div>
        <div class="num-value" :style="{ color: a.color }">{{ a.num }}</div>
        <div class="num-label">{{ a.label }}</div>
      </div>
    </div>

    <!-- 奖项列表 -->
    <div class="awards-section">
      <div class="awards-title">斩获多项学科竞赛省级 / 国家级以上奖项</div>
      <div class="awards-grid">
        <div v-for="(award, i) in awards" :key="i" class="award-item">
          <span class="award-bullet">★</span>
          {{ award }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-ach {
  width: 1920px; height: 1080px; background: #0a0a1a; color: white;
  padding: 80px 140px; font-family: var(--font-display);
  position: relative; overflow: hidden;
}
.header { margin-bottom: 40px; text-align: center; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(255, 152, 0, 0.15); color: #ffb74d;
  border: 1px solid rgba(255, 152, 0, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #ffd180 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.numbers-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px;
  margin-bottom: 40px;
}
.num-card {
  padding: 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform 0.3s;
}
.num-card:hover { transform: translateY(-4px); }
.num-icon { font-size: 48px; margin-bottom: 16px; }
.num-value {
  font-size: 80px; font-weight: 900; line-height: 1;
  font-family: var(--font-mono); margin-bottom: 8px;
}
.num-label { font-size: var(--text-lg); color: var(--color-text); letter-spacing: 4px; }
.awards-section {
  background: rgba(255, 152, 0, 0.04);
  border: 1px solid rgba(255, 152, 0, 0.2);
  border-radius: var(--radius-lg);
  padding: 32px 40px;
}
.awards-title {
  font-size: var(--text-lg); color: #ffb74d;
  font-weight: 700; margin-bottom: 24px; letter-spacing: 2px;
}
.awards-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px 32px;
}
.award-item {
  display: flex; align-items: center; gap: 12px;
  font-size: var(--text-base); color: white; font-weight: 400;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
}
.award-bullet { color: #ffb74d; font-size: var(--text-lg); }
</style>
