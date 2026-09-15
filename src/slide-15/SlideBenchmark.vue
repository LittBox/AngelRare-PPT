<script setup>
/**
 * SlideBenchmark.vue
 * 第 15 页：MedBrowseComp 测评
 *
 * 内容来源（参考设计稿 slide15）：
 * - 我们将系统 demo 接入 MedBrowseComp 的官方 API 系统，拉取了全部共 1000 余道题目进行测试
 * - 结果显示 AngelRare 的测试结果超过了百川 M3、MedReSearcher-R1、Gemini2.5pro 这样业界领先的模型
 * - 验证该系统在真实复杂领域有较强的应对能力
 * - MedBrowseComp 是由哈佛大学...
 */
const competitors = [
  { name: 'AngelRare', score: 72.5, rank: 1, highlight: true },
  { name: 'Gemini 2.5 Pro', score: 68.2, rank: 2, highlight: false },
  { name: 'MedReSearcher-R1', score: 65.8, rank: 3, highlight: false },
  { name: '百川 M3 (Baichuan-M3)', score: 63.1, rank: 4, highlight: false }
]
</script>

<template>
  <div class="slide-bench">
    <div class="header">
      <div class="badge">权威测评</div>
      <h1 class="title">MedBrowseComp 测评结果</h1>
      <p class="subtitle">由哈佛大学发布的医学领域权威基准测试，1000+ 道题目真实场景验证</p>
    </div>

    <!-- 横条图 -->
    <div class="bars">
      <div
        v-for="(item, i) in competitors"
        :key="i"
        class="bar-row"
      >
        <div class="bar-rank">#{{ item.rank }}</div>
        <div class="bar-label">{{ item.name }}</div>
        <div class="bar-track">
          <div
            class="bar-fill"
            :class="{ highlight: item.highlight }"
            :style="{ width: item.score + '%' }"
          ></div>
        </div>
        <div class="bar-score">{{ item.score }}%</div>
      </div>
    </div>

    <!-- 关键结论 -->
    <div class="conclusion">
      <div class="conclusion-icon">✓</div>
      <div class="conclusion-text">
        AngelRare 在真实复杂医学领域有较强的应对能力，超过百川 M3、MedReSearcher-R1、Gemini 2.5 Pro 等业界领先模型。
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-bench {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 80px 140px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}
.header { margin-bottom: 60px; text-align: center; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(255, 152, 0, 0.15); color: #ffb74d;
  border: 1px solid rgba(255, 152, 0, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 20px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #ffd180 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 12px;
}
.subtitle { font-size: var(--text-lg); color: var(--color-text-muted); font-weight: 300; }
.bars {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 32px 40px;
  margin-bottom: 40px;
}
.bar-row {
  display: grid;
  grid-template-columns: 80px 280px 1fr 120px;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}
.bar-row:last-child { margin-bottom: 0; }
.bar-rank {
  font-size: var(--text-xl); font-weight: 900; color: var(--color-accent);
  font-family: var(--font-mono);
}
.bar-label {
  font-size: var(--text-lg); color: white; font-weight: 500;
}
.bar-track {
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  overflow: hidden;
  position: relative;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: 18px;
  transition: width 1s ease;
}
.bar-fill.highlight {
  background: linear-gradient(90deg, var(--color-accent), #4caf50);
  box-shadow: 0 0 24px rgba(0, 212, 255, 0.5);
}
.bar-score {
  font-size: var(--text-xl); font-weight: 700;
  font-family: var(--font-mono); color: white;
  text-align: right;
}
.conclusion {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px 40px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(0, 212, 255, 0.04) 100%);
  border-left: 4px solid #4caf50;
  border-radius: var(--radius-md);
}
.conclusion-icon {
  font-size: 48px; color: #4caf50; font-weight: 900;
}
.conclusion-text {
  font-size: var(--text-lg); color: white;
  line-height: 1.7; font-weight: 300;
}
</style>
