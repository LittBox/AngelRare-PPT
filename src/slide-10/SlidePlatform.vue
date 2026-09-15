<script setup>
import { ref } from 'vue'


/**
 * SlidePlatform.vue
 * 第 10 页：问题导向
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「问题导向」
 *   Slogan：「从一个人的困境，看见一群人的难题」
 *
 * 内容来源（文字版 二·1 问题导向）：
 *   · 团队成员的罕见病相关经历，引发对"确诊难、信息散、协同弱"的持续关注
 *   · 通过患者、医生、医院及产业相关方调研，将个体痛点扩展为多主体共性问题
 *   · 识别核心矛盾：罕见病并非只有"诊断难"，更存在科研转化、患者管理、援助衔接与产业证据构建之间的信息割裂
 *   · 判断问题价值：痛点真实、高频、长期存在，且现有方案主要集中于诊断环节，诊断后服务存在明显空白
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('问题导向')
const slogan = ref('从一个人的困境，看见一群人的难题')

// 问题识别：三大核心痛点
const painPoints = [
  {
    label: '确诊难',
    icon: '🔍',
    detail: '罕见病平均确诊周期 5-7 年，误诊率居高不下',
    color: '#f44336',
  },
  {
    label: '信息散',
    icon: '📂',
    detail: '患者数据分散在各处，诊疗信息无法追溯与复用',
    color: '#ff9800',
  },
  {
    label: '协同弱',
    icon: '🔗',
    detail: '患者、医生、药企、公益机构之间缺乏有效连接',
    color: '#ff5722',
  },
]

// 问题扩展路径：从个体到群体
const expansionSteps = [
  { step: '01', text: '个体经历', sub: '团队成员的罕见病相关经历' },
  { step: '02', text: '持续关注', sub: '对"确诊难、信息散、协同弱"的持续关注' },
  { step: '03', text: '多主体共性', sub: '患者、医生、医院、药企、公益组织多方调研' },
  { step: '04', text: '核心矛盾', sub: '诊断后服务空白、科研转化与产业证据割裂' },
]

// 核心矛盾（底部引用）
const coreConflict = '罕见病并非只有"诊断难"，更存在科研转化、患者管理、援助衔接与产业证据构建之间的信息割裂'

// 问题价值判断
const problemValue = '痛点真实、高频、长期存在，且现有方案主要集中于诊断环节，诊断后服务存在明显空白'
</script>

<template>
  <div class="slide-platform">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 三大核心痛点 -->
    <div class="pain-section">
      <div class="pain-label">三大核心痛点</div>
      <div class="pain-cards">
        <div
          v-for="(p, i) in painPoints"
          :key="i"
          class="pain-card"
          :style="{ borderColor: p.color + '40', background: p.color + '10' }"
        >
          <div class="pc-icon" :style="{ color: p.color }">{{ p.icon }}</div>
          <div class="pc-label" :style="{ color: p.color }">{{ p.label }}</div>
          <div class="pc-detail">{{ p.detail }}</div>
        </div>
      </div>
    </div>

    <!-- 问题扩展路径 -->
    <div class="expansion-section">
      <div class="exp-label">问题扩展路径</div>
      <div class="exp-steps">
        <div v-for="(s, i) in expansionSteps" :key="i" class="exp-step">
          <div class="es-num">{{ s.step }}</div>
          <div class="es-body">
            <div class="es-text">{{ s.text }}</div>
            <div class="es-sub">{{ s.sub }}</div>
          </div>
          <div v-if="i < expansionSteps.length - 1" class="es-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- 核心矛盾 + 问题价值 -->
    <div class="conclusion-row">
      <div class="conflict-box">
        <div class="cb-label">核心矛盾</div>
        <div class="cb-text">{{ coreConflict }}</div>
      </div>
      <div class="value-box">
        <div class="vb-label">问题价值</div>
        <div class="vb-text">{{ problemValue }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-platform {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 60px 100px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 8px;
}

.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(74, 108, 247, 0.12);
  color: var(--color-accent, #00d4ff);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: 6px;
  font-weight: 400;
}

.slogan {
  margin: 0 0 24px 0;
  padding: 0;
  font-size: 80px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 三大痛点 */
.pain-section {
  margin-bottom: 20px;
}

.pain-label,
.exp-label {
  font-size: 12px;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.pain-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.pain-card {
  padding: 24px 28px;
  border: 1px solid;
  border-radius: var(--radius-md);
  text-align: center;
}

.pc-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.pc-label {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 8px;
}

.pc-detail {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
}

/* 问题扩展路径 */
.expansion-section {
  margin-bottom: 20px;
}

.exp-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  position: relative;
}

.exp-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.es-num {
  font-size: 28px;
  font-weight: 900;
  font-family: var(--font-mono);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
}

.es-body {
  flex: 1;
}

.es-text {
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  letter-spacing: 1px;
}

.es-sub {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

.es-arrow {
  font-size: 20px;
  color: var(--color-accent);
  opacity: 0.5;
  flex-shrink: 0;
}

/* 底部两栏 */
.conclusion-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: auto;
}

.conflict-box,
.value-box {
  padding: 20px 24px;
  border-radius: var(--radius-md);
}

.conflict-box {
  background: rgba(244, 67, 54, 0.06);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.value-box {
  background: rgba(76, 175, 80, 0.06);
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.cb-label,
.vb-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.cb-label {
  color: #f44336;
}

.vb-label {
  color: #4caf50;
}

.cb-text,
.vb-text {
  font-size: 14px;
  color: white;
  line-height: 1.6;
  font-weight: 300;
}
</style>
