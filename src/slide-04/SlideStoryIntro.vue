<script setup>
/**
 * SlideStoryIntro.vue
 * 第 4 页：问题导向（已根据文案铁律修正）
 *
 * 文案铁律遵守检查：
 * ✅ 二级目录 = 「问题导向」（逐字使用《ppt【slogan方案】》原文）
 * ✅ Slogan = 「从一个人的困境，看见一群人的难题」（逐字使用原文）
 * ✅ 无自创标题
 *
 * 内容结构（按铁律统一模板）：
 * - 顶部小标签：问题导向
 * - 灵魂 Slogan：从一个人的困境，看见一群人的难题
 * - 主体内容：2 个真实患者案例 + 引向群体共性
 */
import { ref } from 'vue'

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('问题导向')
const slogan = ref('从一个人的困境，看见一群人的难题')

// ============== 主体内容（可重新视觉组织，不能改变事实含义） ==============
const stories = ref([
  {
    name: '允小姐的姐姐',
    age: '从婴儿期异常发烧',
    desc: '辗转多地做遍基因测序，二十八岁才获最终确诊——错失的是整个童年与青春。'
  },
  {
    name: '19岁疑似患者小胡',
    age: '基层无法明确诊断',
    desc: '错过黄金干预期，高昂往返排查费用让家庭甚至产生放弃就医心理。'
  }
])
// 群体共性的自然引向（证明 Slogan：个体困境 → 群体难题）
const groupInsight = ref('个体困境并非孤例，而是罕见病群体面临的系统性问题。')
</script>

<template>
  <div class="slide-story">
    <!-- ① 顶部小标签：二级目录（克制） -->
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- ② 灵魂 Slogan（超大艺术字 · 第一视觉中心） -->
    <h1 class="slogan">
      <span class="slogan-text">{{ slogan }}</span>
    </h1>

    <!-- ③ 主体内容：真实患者案例 + 群体共性 -->
    <div class="stories-grid">
      <div v-for="(story, i) in stories" :key="i" class="story-card">
        <div class="story-quote-mark">"</div>
        <div class="story-name">{{ story.name }}</div>
        <div class="story-age">{{ story.age }}</div>
        <div class="story-desc">{{ story.desc }}</div>
      </div>
    </div>

    <!-- 群体共性引向（证明 Slogan 成立） -->
    <div class="summary-box">
      <div class="summary-icon">→</div>
      <div class="summary-text">{{ groupInsight }}</div>
    </div>
  </div>
</template>

<style scoped>
.slide-story {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ① 顶部小标签 · 克制 */
.header {
  margin-bottom: 30px;
}

.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(74, 108, 247, 0.12);
  color: var(--color-accent, #00d4ff);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 999px;
  font-size: 16px;
  letter-spacing: 6px;
  font-weight: 400;
}

/* ② 灵魂 Slogan · 超大艺术字 · 第一视觉中心 */
.slogan {
  margin: 0 0 60px 0;
  padding: 0;
}

.slogan-text {
  display: block;
  font-size: 84px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ③ 主体内容 */
.stories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;
}

.story-card {
  position: relative;
  padding: 50px 48px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.story-quote-mark {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 200px;
  line-height: 1;
  color: var(--color-primary, #4a6cf7);
  opacity: 0.2;
  font-family: Georgia, serif;
}

.story-name {
  position: relative;
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.story-age {
  position: relative;
  font-size: 18px;
  color: var(--color-accent, #00d4ff);
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.story-desc {
  position: relative;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  font-weight: 300;
}

.summary-box {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 40px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 4px solid var(--color-accent, #00d4ff);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.summary-icon {
  font-size: 40px;
  color: var(--color-accent, #00d4ff);
  font-weight: 700;
}

.summary-text {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.6;
  font-weight: 400;
  flex: 1;
}
</style>
