<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlideStoryIntro.vue
 * 第 10 页：问题导向（已根据文案铁律修正）
 *
 * 文案铁律遵守检查：
 * ✅ 二级目录 = 「问题导向」（逐字使用《ppt【slogan方案】》原文）
 * ✅ Slogan = 「从一个人的困境，看见一群人的难题」（逐字使用原文）
 * ✅ 无自创标题
 *
 * 内容结构（2026-09-15 revision02）：
 * - 左侧：一个团队成员/身边人的真实罕见病经历 → 触发点
 * - 中间：我们开始追问 → 三大问题
 * - 右侧：一群人的难题 → 多主体（患者/医生/药企/公益组织）
 *
 * 核心叙事（来自《网评ppt方案【文字版】》）：
 *   团队成员的罕见病相关经历，引发对"确诊难、信息散、协同弱"的持续关注
 *   通过患者、医生、医院及产业相关方调研，将个体痛点扩展为多主体共性问题
 *   识别核心矛盾：罕见病并非只有"诊断难"，更存在科研转化、患者管理、援助衔接与产业证据构建之间的信息割裂
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('问题导向')
const slogan = ref('从一个人的困境，看见一群人的难题')

// 左侧：一个人的故事（团队成员相关真实经历 / 触发点）
const onePersonStory = ref({
  name: '团队成员的身边人',
  background: '罕见病相关经历',
  trigger: '一次看见身边人在罕见病诊疗中的无助，让项目团队从"听说罕见病"变成"真正关注罕见病"',
  detail: '看见一个人辗转多地、误诊多年、错过黄金期 —— 我们意识到，这不只是个案。',
})

// 中间：我们开始追问（三大问题）
const questions = [
  { q: '为什么确诊难？', a: '基层识别能力不足，跨科室协作缺乏，确诊周期长、误诊率高。' },
  { q: '为什么信息散？', a: '诊疗记录散落在不同医院，数据无法贯通，复诊与科研材料难以沉淀。' },
  { q: '为什么诊断之后没人接住患者？', a: '诊断只是起点，治疗、随访、援助、科研等后端链条几乎缺位。' },
]

// 右侧：一群人的难题（多主体共性）
const groupIssues = [
  { role: '患者', issue: '确诊难、信息散、援助缺位、长期被系统遗忘' },
  { role: '医生', issue: '病例难沉淀、科研难开展、随访难闭合、证据难产出' },
  { role: '药企', issue: '真实世界数据获取难、患者招募难、PAP/RWE 成本高' },
  { role: '公益组织', issue: '援助衔接断点多、信任建立周期长、数据难以反哺决策' },
]

const finalStatement = '我们最初看见的是一个人，后来发现背后站着一整个群体。'
</script>

<template>
  <div class="slide-story">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 三段叙事结构：个人 → 追问 → 群体 -->
      <div class="three-col">
        <!-- 左侧：一个人的故事 -->
        <div class="col left">
          <div class="col-tag">一个人的故事</div>
          <div class="story-card">
            <div class="story-quote">"</div>
            <div class="story-name">{{ onePersonStory.name }}</div>
            <div class="story-background">{{ onePersonStory.background }}</div>
            <div class="story-trigger">{{ onePersonStory.trigger }}</div>
            <div class="story-detail">{{ onePersonStory.detail }}</div>
          </div>
        </div>

        <!-- 中间：我们开始追问 -->
        <div class="col mid">
          <div class="col-tag">我们开始追问</div>
          <div class="questions-stack">
            <div v-for="(item, i) in questions" :key="i" class="question-item">
              <div class="q-mark">?</div>
              <div class="q-body">
                <div class="q-text">{{ item.q }}</div>
                <div class="q-answer">{{ item.a }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：一群人的难题 -->
        <div class="col right">
          <div class="col-tag">一群人的难题</div>
          <div class="group-stack">
            <div v-for="(g, i) in groupIssues" :key="i" class="group-item">
              <div class="g-role">{{ g.role }}</div>
              <div class="g-issue">{{ g.issue }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 落点 -->
      <div class="final-statement">
        <span class="fs-mark">"</span>
        <span class="fs-text">{{ finalStatement }}</span>
        <span class="fs-mark">"</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-story {
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
  line-height: 1.15;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 三段叙事 */
.three-col {
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 18px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.col-tag {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-blue-bright);
  letter-spacing: 3px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(57, 141, 255, 0.25);
  flex-shrink: 0;
}

.col.right .col-tag {
  color: var(--color-gold-bright);
  border-bottom-color: rgba(232, 179, 92, 0.25);
}

/* 左：一个故事卡 */
.story-card {
  position: relative;
  padding: 24px 24px 20px 24px;
  background: linear-gradient(135deg, rgba(57, 141, 255, 0.10) 0%, rgba(0, 212, 255, 0.04) 100%);
  border: 1px solid rgba(57, 141, 255, 0.25);
  border-radius: var(--radius-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
}

.story-quote {
  position: absolute;
  top: -10px;
  left: 12px;
  font-size: 120px;
  line-height: 1;
  color: rgba(57, 141, 255, 0.2);
  font-family: Georgia, serif;
}

.story-name {
  position: relative;
  font-size: 30px;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

.story-background {
  position: relative;
  font-size: 20px;
  color: var(--color-blue-bright);
  letter-spacing: 1px;
  padding: 3px 10px;
  background: rgba(57, 141, 255, 0.15);
  border-radius: 999px;
  align-self: flex-start;
}

.story-trigger {
  position: relative;
  font-size: 20px;
  color: white;
  line-height: 1.55;
  font-weight: 500;
}

.story-detail {
  position: relative;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  font-weight: 300;
  margin-top: auto;
}

/* 中：追问栈 */
.questions-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.question-item {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid var(--color-blue-bright);
  border-radius: var(--radius-sm);
  flex: 1;
}

.q-mark {
  font-size: 36px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--color-blue-bright);
  line-height: 1;
  flex-shrink: 0;
}

.q-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;
}

.q-text {
  font-size: 20px;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
}

.q-answer {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
}

/* 右：群体难题 */
.group-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.group-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(232, 179, 92, 0.10) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(232, 179, 92, 0.3);
  border-left: 4px solid var(--color-gold-bright);
  border-radius: var(--radius-sm);
  flex: 1;
  justify-content: center;
}

.g-role {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-gold-bright);
  letter-spacing: 2px;
}

.g-issue {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
}

/* 落点 */
.final-statement {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 14px 28px;
  background: rgba(76, 175, 80, 0.06);
  border: 1px solid rgba(76, 175, 80, 0.25);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.fs-mark {
  font-size: 30px;
  color: rgba(76, 175, 80, 0.6);
  line-height: 1;
  font-weight: 700;
}

.fs-text {
  font-size: 20px;
  color: white;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
}
</style>