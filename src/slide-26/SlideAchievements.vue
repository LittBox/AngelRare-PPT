<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideAchievements.vue
 * 第 8 页：人才培养成效
 *
 * 视觉结构（2026-09-15 revision02）：
 * - 上半部分：4 个成果数字（专利 / 软著 / 论文 / 奖项）
 * - 下半部分：真实材料拼贴（专利证书 / 软著 / 论文首页 / 比赛获奖证书 / 培养课程）
 *   ※ 当前项目素材库中尚未提供真实证书/论文截图，
 *     因此列出缺失项并以"待补"占位呈现，不伪造任何证书
 */

const secondLevelNav = ref('人才培养成效')
const slogan = ref('项目在成长，我们也在成长')

// 4 个成果数字（成果总览）
const achievements = [
  { num: 7, label: '专利', icon: '📋', color: '#3C8DFF' },
  { num: 3, label: '软著', icon: '💻', color: '#19C6FF' },
  { num: 1, label: '论文', icon: '📄', color: '#4CAF50' },
  { num: 6, label: '省级以上奖项', icon: '🏆', color: '#E8B35C' },
]

// 真实材料清单（缺失项，每条待补）
const materials = [
  { type: '专利证书', count: '7 项', status: '待补' },
  { type: '软件著作权', count: '3 项', status: '待补' },
  { type: '论文首页 / 录用材料', count: '1 篇', status: '待补' },
  { type: '比赛获奖证书', count: '6 项', status: '待补' },
  { type: '培养课程 / 学校实践照片', count: '若干', status: '待补' },
]

// 关键获奖（保留原文字内容）
const awards = [
  '高教杯全国大学生数学建模竞赛 全国二等奖',
  '正大杯全国大学生市场调查与分析大赛 全国三等奖',
  '互联网+大学生创新创业大赛 省级金奖',
  '校级学术科研奖学金',
  '校级一等奖学金',
  '岳虹本科生奖学金',
]
</script>

<template>
  <div class="slide-ach">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="gold" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 4 个成果数字 -->
      <div class="numbers-grid">
        <div v-for="(a, i) in achievements" :key="i" class="num-card">
          <div class="num-icon">{{ a.icon }}</div>
          <div class="num-value" :style="{ color: a.color }">{{ a.num }}</div>
          <div class="num-label">{{ a.label }}</div>
        </div>
      </div>

      <!-- 左右两栏：左 真实材料拼贴 / 右 奖项列表 -->
      <div class="dual-col">
        <!-- 左侧：真实材料拼贴 -->
        <div class="materials-col">
          <div class="col-title">真实支撑材料</div>
          <div class="materials-grid">
            <div v-for="(m, i) in materials" :key="i" class="material-item">
              <div class="material-frame">
                <div class="material-placeholder">
                  <div class="mp-icon">📑</div>
                  <div class="mp-tag">待补</div>
                </div>
              </div>
              <div class="material-meta">
                <span class="mm-type">{{ m.type }}</span>
                <span class="mm-count">{{ m.count }}</span>
              </div>
              <div class="material-status">状态：{{ m.status }}</div>
            </div>
          </div>
          <div class="materials-note">
            <strong>说明</strong> · 当前素材库尚未提供真实证书/论文截图，本页以"待补"占位；
            待用户提供后替换为真实材料。本轮严禁伪造。
          </div>
        </div>

        <!-- 右侧：奖项列表 -->
        <div class="awards-col">
          <div class="col-title">奖项与培养 · 实际成长</div>
          <div class="awards-list">
            <div v-for="(award, i) in awards" :key="i" class="award-item">
              <span class="award-bullet">★</span>
              <span class="award-text">{{ award }}</span>
            </div>
          </div>
          <div class="awards-quote">
            从课堂到赛场，从赛程到产业现场 —— 项目与成员一起生长。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-ach {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  z-index: var(--z-base);
  padding: 36px 80px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  min-height: 0;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #E8B35C 60%, #F6C76E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 4 个数字 */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  flex-shrink: 0;
}

.num-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.num-icon {
  font-size: 36px;
  margin-bottom: 4px;
}

.num-value {
  font-size: 56px;
  font-weight: 900;
  line-height: 1;
  font-family: var(--font-mono);
}

.num-label {
  font-size: 20px;
  color: var(--color-text);
  letter-spacing: 3px;
}

/* 左右两栏 */
.dual-col {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.materials-col, .awards-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.col-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gold-bright);
  letter-spacing: 2px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(232, 179, 92, 0.25);
  flex-shrink: 0;
}

/* 材料网格 */
.materials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.material-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.material-frame {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(232, 179, 92, 0.04);
  border: 1px dashed rgba(232, 179, 92, 0.3);
  border-radius: var(--radius-sm);
  min-height: 70px;
}

.material-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(232, 179, 92, 0.6);
}

.mp-icon {
  font-size: 28px;
  opacity: 0.7;
}

.mp-tag {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.material-meta {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
}

.mm-type {
  font-weight: 600;
}

.mm-count {
  color: var(--color-gold-bright);
  font-family: var(--font-mono);
}

.material-status {
  font-size: 20px;
  color: #F44336;
  font-weight: 600;
}

.materials-note {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid rgba(232, 179, 92, 0.4);
  border-radius: 4px;
  flex-shrink: 0;
  line-height: 1.5;
}

/* 奖项列表 */
.awards-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-height: 0;
}

.award-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: white;
  font-weight: 400;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--color-gold);
  border-radius: 4px;
  line-height: 1.4;
}

.award-bullet {
  color: var(--color-gold-bright);
  font-size: 18px;
  flex-shrink: 0;
}

.award-text {
  flex: 1;
}

.awards-quote {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.78);
  font-style: italic;
  padding: 10px 14px;
  background: rgba(232, 179, 92, 0.05);
  border-radius: 4px;
  text-align: center;
  flex-shrink: 0;
  letter-spacing: 1px;
}
</style>