<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'


/**
 * SlidePractice.vue
 * 第 6 页：逻辑正确
 *
 * 视觉重构（2026-09-15）：
 * 不是时间线，是 1.0→5.0 版本迭代+证伪逻辑。
 * 视觉核心：越走越聚焦。
 * 每列最多：提出假设 → 市场验证 → 最终决策（3项）
 * 1.0~4.0 红色系（放弃），5.0 绿色（保留收敛）
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('逻辑正确')
const slogan = ref('在证伪中，走向正确')

const versions = [
  {
    version: '1.0',
    name: '四方多边平台',
    status: '放弃',
    logic: ['提出假设：连接四方做平台', '市场验证：信任建立周期过长', '主动证伪 → 放弃'],
    color: '#F44336',
    bg: 'rgba(244,67,54,0.04)',
  },
  {
    version: '2.0',
    name: '患者端收费',
    status: '放弃',
    logic: ['提出假设：患者付费维持运营', '市场验证：患者家庭经济压力大', '主动证伪 → 放弃'],
    color: '#F44336',
    bg: 'rgba(244,67,54,0.04)',
  },
  {
    version: '3.0',
    name: '按例撮合费',
    status: '放弃',
    logic: ['提出假设：每次转诊收撮合费', '市场验证：转诊量级不足以支撑', '主动证伪 → 放弃'],
    color: '#F44336',
    bg: 'rgba(244,67,54,0.04)',
  },
  {
    version: '4.0',
    name: '直接承接CRO',
    status: '放弃',
    logic: ['提出假设：承接药企临床外包', '市场验证：需专业BD与交付团队', '主动证伪 → 放弃'],
    color: '#F44336',
    bg: 'rgba(244,67,54,0.04)',
  },
  {
    version: '5.0',
    name: '诊断后服务体系',
    status: '收敛',
    logic: ['提出假设：聚焦医生科研切入口', '市场验证：签署合作意向书', '最终收敛 → PAP+RWE'],
    color: '#4CAF50',
    bg: 'rgba(76,175,80,0.06)',
  },
]

// 底部核心引用
const conclusion = ref('不是从未犯错，而是在不断证伪中走向正确')
</script>

<template>
  <div class="slide-practice">
    <SlideBg />

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 1.0→5.0 版本迭代（简化每列） -->
      <div class="versions">
        <div
          v-for="(v, i) in versions"
          :key="i"
          class="version-col"
          :class="v.status === '收敛' ? 'kept' : 'abandoned'"
          :style="{ '--v-color': v.color, '--v-bg': v.bg }"
        >
          <!-- 版本号 -->
          <div class="v-number">{{ v.version }}</div>

          <!-- 状态标签 -->
          <div class="v-status">{{ v.status }}</div>

          <!-- 版本名称 -->
          <div class="v-name">{{ v.name }}</div>

          <!-- 证伪逻辑（最多3项） -->
          <div class="v-logic">
            <div
              v-for="(line, j) in v.logic"
              :key="j"
              class="logic-line"
            >{{ line }}</div>
          </div>

          <!-- 连接箭头 -->
          <div v-if="i < versions.length - 1" class="v-arrow">
            <div class="arrow-body">›</div>
          </div>
        </div>
      </div>

      <!-- 底部：核心引用 + 数字 -->
      <div class="bottom">
        <div class="conclusion">
          <span class="cq-mark">❝</span>
          <span class="cq-text">{{ conclusion }}</span>
        </div>
        <div class="version-count">
          <span class="vc-red">5</span>
          <span class="vc-label">次主动证伪</span>
          <span class="vc-divider">/</span>
          <span class="vc-green">1</span>
          <span class="vc-label">次收敛</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-practice {
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
  gap: 18px;
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
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 1.0→5.0 版本迭代 */
.versions {
  display: flex;
  align-items: stretch;
  flex: 1;
  min-height: 0;
  gap: 0;
}

.version-col {
  position: relative;
  padding: 18px 20px;
  background: var(--v-bg);
  border: 1px solid rgba(255,255,255,0.06);
  border-top: 3px solid var(--v-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.version-col.kept {
  border-color: rgba(76,175,80,0.20);
  box-shadow: 0 0 20px rgba(76,175,80,0.12);
}

.version-col.abandoned {
  opacity: 0.85;
}

.v-number {
  font-size: 36px;
  font-weight: 900;
  font-family: var(--font-mono);
  background: linear-gradient(135deg, var(--v-color), rgba(255,255,255,0.5));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.v-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  background: color-mix(in srgb, var(--v-color) 20%, transparent);
  color: var(--v-color);
  border: 1px solid color-mix(in srgb, var(--v-color) 40%, transparent);
  align-self: flex-start;
}

.v-name {
  font-size: 22px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
}

.v-logic {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.logic-line {
  font-size: 16px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.5;
}

/* 连接箭头 */
.v-arrow {
  display: flex;
  align-items: center;
  padding: 0 8px;
  flex-shrink: 0;
}

.arrow-body {
  font-size: 28px;
  color: rgba(57,141,255,0.5);
  line-height: 1;
}

/* 底部 */
.bottom {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 14px 24px;
  border-top: 1px solid rgba(57,141,255,0.15);
  flex-shrink: 0;
}

.conclusion {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.cq-mark {
  font-size: 28px;
  color: rgba(57,141,255,0.6);
  line-height: 1;
}

.cq-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.version-count {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(57,141,255,0.08);
  border: 1px solid rgba(57,141,255,0.20);
  border-radius: var(--radius-md);
}

.vc-red {
  font-size: 32px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: #F44336;
  line-height: 1;
}

.vc-green {
  font-size: 32px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: #4CAF50;
  line-height: 1;
}

.vc-label {
  font-size: 16px;
  color: var(--color-text-muted);
}

.vc-divider {
  font-size: 16px;
  color: rgba(255,255,255,0.2);
  margin: 0 4px;
}
</style>