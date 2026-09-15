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
 * 每次迭代 = 提出假设 → 市场验证 → 发现矛盾 → 主动证伪 → 决策。
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('逻辑正确')
const slogan = ref('在证伪中，走向正确')

const versions = [
  {
    version: '1.0',
    name: '四方多边平台',
    status: '放弃',
    reason: '建设与信任成本过高，多方协调超出早期团队承载力',
    logic: ['提出假设：做平台连接四方', '市场验证：接触潜在合作方', '发现矛盾：信任建立周期太长', '主动证伪 → 放弃'],
    color: '#F44336',
  },
  {
    version: '2.0',
    name: '患者端收费',
    status: '放弃',
    reason: '与"让最需要帮助的人不成为买单的人"理念相悖，且消耗超出承载力',
    logic: ['提出假设：患者付费维持运营', '市场验证：访谈患者家庭', '发现矛盾：经济压力已极大', '主动证伪 → 放弃'],
    color: '#F44336',
  },
  {
    version: '3.0',
    name: '按例撮合费',
    status: '放弃',
    reason: '撮合量不足以支撑运营成本，且限制了转诊效率',
    logic: ['提出假设：每次转诊收撮合费', '市场验证：测算转诊频率', '发现矛盾：转诊量级不够', '主动证伪 → 放弃'],
    color: '#F44336',
  },
  {
    version: '4.0',
    name: '直接承接CRO',
    status: '放弃',
    reason: '直接CRO需庞大运营体系，与团队核心能力不匹配',
    logic: ['提出假设：承接药企临床外包', '市场验证：了解CRO门槛', '发现矛盾：需专业BD与交付团队', '主动证伪 → 放弃'],
    color: '#F44336',
  },
  {
    version: '5.0',
    name: '医生科研 + PAP + RWE',
    status: '保留',
    reason: '与团队核心能力高度匹配，已通过市场验证',
    logic: ['提出假设：聚焦医生科研切入口', '市场验证：签署合作意向书', '持续收敛 → PAP + RWE', '最终收敛 → 诊断后服务体系'],
    color: '#4CAF50',
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

      <!-- 1.0→5.0 大版本迭代 -->
      <div class="versions">
        <div
          v-for="(v, i) in versions"
          :key="i"
          class="version-col"
          :class="v.status === '保留' ? 'kept' : 'abandoned'"
          :style="{ '--v-color': v.color }"
        >
          <!-- 版本号大字 -->
          <div class="v-number">{{ v.version }}</div>

          <!-- 状态标签 -->
          <div class="v-status">{{ v.status }}</div>

          <!-- 版本名称 -->
          <div class="v-name">{{ v.name }}</div>

          <!-- 证伪逻辑流程 -->
          <div class="v-logic">
            <div
              v-for="(line, j) in v.logic"
              :key="j"
              class="logic-line"
            >{{ line }}</div>
          </div>

          <!-- 连接箭头 -->
          <div v-if="i < versions.length - 1" class="v-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-head">›</div>
          </div>
        </div>
      </div>

      <!-- 底部：核心引用 + 版本数标注 -->
      <div class="bottom">
        <div class="conclusion">
          <span class="cq-mark">❝</span>
          <span class="cq-text">{{ conclusion }}</span>
        </div>
        <div class="version-count">
          <span class="vc-num">5</span>
          <span class="vc-label">次主动证伪</span>
          <span class="vc-divider">/</span>
          <span class="vc-kept">1</span>
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
  padding: 56px 100px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 1.0→5.0 大版本迭代 */
.versions {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
  gap: 0;
  align-items: stretch;
  flex: 1;
}

.version-col {
  position: relative;
  padding: 28px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top: 3px solid var(--v-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.version-col.kept {
  background: rgba(76, 175, 80, 0.05);
  border-color: rgba(76, 175, 80, 0.20);
  box-shadow: 0 0 24px rgba(76, 175, 80, 0.15);
}

.version-col.abandoned {
  opacity: 0.75;
}

.v-number {
  font-size: 48px;
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
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  background: color-mix(in srgb, var(--v-color) 20%, transparent);
  color: var(--v-color);
  border: 1px solid color-mix(in srgb, var(--v-color) 40%, transparent);
  align-self: flex-start;
}

.v-name {
  font-size: var(--text-lg);
  font-weight: 700;
  color: white;
  line-height: 1.3;
}

.v-logic {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.logic-line {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

/* 连接箭头 */
.v-arrow {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.arrow-line {
  width: 16px;
  height: 2px;
  background: linear-gradient(90deg, rgba(57,141,255,0.5), rgba(57,141,255,0.2));
}

.arrow-head {
  font-size: 28px;
  color: rgba(57, 141, 255, 0.5);
  line-height: 1;
}

/* 底部 */
.bottom {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 20px 28px;
  border-top: 1px solid rgba(57, 141, 255, 0.15);
  margin-top: auto;
}

.conclusion {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}

.cq-mark {
  font-size: 32px;
  color: rgba(57, 141, 255, 0.6);
  line-height: 1;
}

.cq-text {
  font-size: var(--text-xl);
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.version-count {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(57, 141, 255, 0.08);
  border: 1px solid rgba(57, 141, 255, 0.20);
  border-radius: var(--radius-md);
}

.vc-num {
  font-size: 40px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: #F44336;
  line-height: 1;
}

.vc-kept {
  font-size: 40px;
  font-weight: 900;
  font-family: var(--font-mono);
  color: #4CAF50;
  line-height: 1;
}

.vc-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.vc-divider {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
}
</style>
