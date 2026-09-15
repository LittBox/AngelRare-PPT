<script setup>
/**
 * SlideStoryIntro.vue
 * 第 4 页：故事引入
 *
 * 内容来源（参考设计稿 slide4）：
 * - 患者案例引入：允小姐的姐姐、19岁疑似患者小胡
 * - 核心观点：患者访谈中没有冰冷数据，只有一个个被困在未知里的家庭
 */
import { ref } from 'vue'

const title = ref('故事引入')
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
const summary = ref('患者访谈记录中，没有冰冷数据，只有一个个被困在未知里的家庭。这些真实回音成为团队持续优化算法的动力。')
</script>

<template>
  <div class="slide-story">
    <!-- 顶部标题 -->
    <div class="header">
      <div class="badge">故事引入</div>
      <h1 class="title">真实患者的困境</h1>
    </div>

    <!-- 故事卡片 -->
    <div class="stories-grid">
      <div v-for="(story, i) in stories" :key="i" class="story-card">
        <div class="story-quote-mark">"</div>
        <div class="story-name">{{ story.name }}</div>
        <div class="story-age">{{ story.age }}</div>
        <div class="story-desc">{{ story.desc }}</div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-box">
      <div class="summary-icon">💡</div>
      <div class="summary-text">{{ summary }}</div>
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

.header {
  margin-bottom: 60px;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(74, 108, 247, 0.15);
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
  color: white;
  letter-spacing: 4px;
}

.stories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.story-card {
  position: relative;
  padding: 50px 48px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.story-quote-mark {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 200px;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.2;
  font-family: Georgia, serif;
}

.story-name {
  position: relative;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.story-age {
  position: relative;
  font-size: var(--text-base);
  color: var(--color-accent);
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.story-desc {
  position: relative;
  font-size: var(--text-lg);
  color: var(--color-text);
  line-height: 1.8;
  font-weight: 300;
}

.summary-box {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px 40px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
}

.summary-icon {
  font-size: 48px;
}

.summary-text {
  font-size: var(--text-lg);
  color: var(--color-text);
  line-height: 1.8;
  font-weight: 300;
  flex: 1;
}
</style>
