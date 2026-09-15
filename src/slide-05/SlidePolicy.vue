<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlidePolicy.vue
 * 第 5 页：立德树人
 *
 * 内容来源（参考设计稿 slide5）：
 * - 国家卫健委：第一批罕见病目录 121 种
 * - 国务院办公厅：十四五国民健康规划
 * - 国家药监局：真实世界证据支持药物研发与审评的指导原则（试行）
 *
 * 视觉结构（2026-09-15 revision02）：
 * - 左侧 55%：Slogan + 3个政策逻辑
 * - 右侧 45%：真实政策截图 / 文件截图 / 官方政策视觉证据
 *   ※ 当前项目素材库中尚无真实政策截图，因此右侧明确列出缺失项，
 *     不允许 AI 伪造任何政策文件
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('立德树人')
const slogan = ref('把青春写在国家需要的地方')

const policies = [
  {
    org: '国家卫健委',
    doc: '《第一批罕见病目录》',
    desc: '官方界定 121 种罕见病，为医保诊疗科研数据统计提供法定标准目录，是罕见病领域基础政策。'
  },
  {
    org: '国务院办公厅',
    doc: '《十四五国民健康规划》',
    desc: '首次把罕见病防治纳入国家级健康规划，强化顶层设计。'
  },
  {
    org: '国家药监局',
    doc: '《真实世界证据支持药物研发与审评的指导原则（试行）》',
    desc: '允许罕见药依托真实世界数据申报审批，降低临床成本。'
  }
]

// 缺失素材清单（项目当前未提供真实政策截图，按铁律不伪造）
const missingMaterials = [
  { name: '《第一批罕见病目录》官方发布截图', status: '缺失' },
  { name: '《十四五国民健康规划》罕见病章节截图', status: '缺失' },
  { name: '《真实世界证据指导原则》官方发布截图', status: '缺失' },
]
</script>

<template>
  <div class="slide-policy">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="gold" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 左右分栏：左侧 55% 文案 · 右侧 45% 政策证据 -->
      <div class="two-col">
        <!-- 左侧 55%：Slogan + 3个政策逻辑 -->
        <div class="left-col">
          <div class="timeline">
            <div v-for="(policy, i) in policies" :key="i" class="policy-card">
              <div class="policy-index">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="policy-content">
                <div class="policy-org">{{ policy.org }}</div>
                <div class="policy-doc">{{ policy.doc }}</div>
                <div class="policy-desc">{{ policy.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 45%：真实政策支撑材料 -->
        <div class="right-col">
          <div class="evidence-header">
            <span class="eh-icon">📑</span>
            <span class="eh-title">真实政策支撑材料</span>
          </div>
          <div class="evidence-stack">
            <div v-for="(m, i) in missingMaterials" :key="i" class="evidence-item missing">
              <div class="evidence-frame">
                <div class="evidence-placeholder">
                  <div class="ep-icon">📄</div>
                  <div class="ep-label">待补素材</div>
                </div>
              </div>
              <div class="evidence-caption">{{ m.name }}</div>
              <div class="evidence-status">状态：{{ m.status }}</div>
            </div>
          </div>
          <div class="evidence-note">
            <strong>说明</strong> · 当前项目素材库尚未提供真实政策截图，本页右侧暂以"待补"占位，
            待用户提供官方政策截图后将替换为真实政策证据；
            本轮严禁 AI 生成或伪造任何政策文件。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-policy {
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
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  min-height: 0;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #E8B35C 60%, #F6C76E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 左右分栏 */
.two-col {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 36px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.left-col {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(232, 179, 92, 0.04);
  border: 1px solid rgba(232, 179, 92, 0.15);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  min-height: 0;
}

/* 左侧政策卡片 */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
  min-height: 0;
}

.policy-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 24px 28px;
  background: linear-gradient(135deg, rgba(232, 179, 92, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-left: 4px solid #E8B35C;
  border-radius: var(--radius-md);
  position: relative;
  flex: 1;
  min-height: 0;
}

.policy-index {
  font-size: 56px;
  font-weight: 900;
  background: linear-gradient(135deg, #E8B35C, #F6C76E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-mono);
  min-width: 80px;
  flex-shrink: 0;
  line-height: 1;
}

.policy-content {
  flex: 1;
  min-width: 0;
}

.policy-org {
  font-size: 26px;
  color: #E8B35C;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.policy-doc {
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin-bottom: 12px;
}

.policy-desc {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  font-weight: 300;
}

/* 右侧政策证据区 */
.evidence-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(232, 179, 92, 0.2);
  flex-shrink: 0;
}

.eh-icon {
  font-size: 24px;
}

.eh-title {
  font-size: 22px;
  color: #E8B35C;
  font-weight: 700;
  letter-spacing: 2px;
}

.evidence-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.evidence-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-height: 0;
}

.evidence-frame {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(232, 179, 92, 0.05);
  border: 1px dashed rgba(232, 179, 92, 0.35);
  border-radius: var(--radius-md);
  min-height: 80px;
}

.evidence-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(232, 179, 92, 0.65);
}

.ep-icon {
  font-size: 36px;
  opacity: 0.7;
}

.ep-label {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.evidence-caption {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.evidence-status {
  font-size: 20px;
  color: #F44336;
  font-weight: 600;
  letter-spacing: 1px;
}

.evidence-note {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid rgba(232, 179, 92, 0.4);
  border-radius: 4px;
  flex-shrink: 0;
}
</style>