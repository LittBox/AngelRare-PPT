<script setup>
/**
 * SlideSocialImpact.vue
 * 第 27 页：社会效益
 *
 * 内容来源（参考设计稿 slide26）：
 * - 赋能医疗公平
 *   提升基层复杂疾病识别能力
 *   缩小区域医疗能力差异
 *   修复医患信息不对称
 *
 * - 重塑数据资产
 *   碎片化数据结构化
 *   科研与临床双向流通
 *   形成真实世界研究生态
 *
 * - 推动普惠医疗
 *   辅助基层医生决策
 *   高质量医疗能力下沉
 *   带动数字医疗就业生态
 */
const impacts = [
  {
    title: '赋能医疗公平',
    icon: '⚖️',
    items: [
      '提升基层复杂疾病识别能力',
      '缩小区域医疗能力差异',
      '修复医患信息不对称'
    ]
  },
  {
    title: '重塑数据资产',
    icon: '📊',
    items: [
      '碎片化数据结构化',
      '科研与临床双向流通',
      '形成真实世界研究生态'
    ]
  },
  {
    title: '推动普惠医疗',
    icon: '🤝',
    items: [
      '辅助基层医生决策',
      '高质量医疗能力下沉',
      '带动数字医疗就业生态'
    ]
  }
]
</script>

<template>
  <div class="slide-impact">
    <div class="header">
      <div class="badge">社会影响</div>
      <h1 class="title">让罕见被看见，让需要被回应</h1>
    </div>

    <div class="impact-grid">
      <div v-for="(imp, i) in impacts" :key="i" class="impact-card">
        <div class="impact-icon">{{ imp.icon }}</div>
        <div class="impact-title">{{ imp.title }}</div>
        <ul class="impact-items">
          <li v-for="(item, j) in imp.items" :key="j">
            <span class="item-bullet">›</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-impact {
  width: 1920px; height: 1080px; background: #0a0a1a; color: white;
  padding: 100px 140px; font-family: var(--font-display);
  position: relative; overflow: hidden;
}
.header { margin-bottom: 60px; text-align: center; }
.badge {
  display: inline-block; padding: 8px 20px;
  background: rgba(76, 175, 80, 0.15); color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title {
  font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.impact-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
.impact-card {
  padding: 48px 40px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-lg);
  position: relative;
}
.impact-icon {
  font-size: 64px; margin-bottom: 24px;
  width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
.impact-title {
  font-size: var(--text-2xl); font-weight: 700; color: white;
  margin-bottom: 24px; letter-spacing: 4px;
}
.impact-items { display: flex; flex-direction: column; gap: 16px; }
.impact-items li {
  display: flex; align-items: center; gap: 12px;
  font-size: var(--text-base); color: white; font-weight: 300;
  line-height: 1.6;
}
.item-bullet {
  color: #81c784; font-size: var(--text-xl); font-weight: 700;
}
</style>
