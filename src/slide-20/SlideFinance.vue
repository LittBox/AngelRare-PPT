<script setup>
import { ref } from 'vue'


/**
 * SlideFinance.vue
 * 第 19 页：社会影响
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「社会影响」
 *   Slogan：「让罕见被看见，让需要被回应」
 *
 * 内容来源（文字版 三·4 社会影响）：
 *   · 罕见病患者感到温暖，引起社会关注
 *   · 有报道可以放报道
 *   · 还可以放社交媒体宣传情况
 *   · 患者价值
 *   · 社会关注
 *   · 媒体报道
 *   · 社交媒体传播
 *   · 长期社会影响
 *
 * 不应该出现的内容：
 *   · 启动资金结构（财务数据，不属于社会影响）
 *   · ROI / PI / IRR 指标（财务指标，不属于社会影响）
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('社会影响')
const slogan = ref('让罕见被看见，让需要被回应')

// 患者价值
const patientValue = [
  {
    icon: '🏥',
    title: '赋能基层医疗',
    desc: '帮助基层医生快速识别罕见病，减少误诊漏诊，缩短确诊时间',
  },
  {
    icon: '🤝',
    title: '修复医患信息不对称',
    desc: '为患者提供可理解的循证依据，让患者参与自己的治疗决策',
  },
  {
    icon: '💊',
    title: '推动罕见病药物可及',
    desc: 'PAP管理 + RWE数据支持，助力药企加速罕见病药物研发与上市',
  },
  {
    icon: '📊',
    title: '构建罕见病数据资产',
    desc: '将碎片化病例数据转化为结构化研究资产，推动罕见病领域知识积累',
  },
]

// 媒体报道
const mediaCoverage = [
  { outlet: '中国青年报', type: '媒体报道', topic: '云南大学学生团队用AI助力罕见病诊疗', date: '2026.03' },
  { outlet: '云南省科技厅官网', type: '政府公示', topic: '数字云南健康医疗重点项目入选名单', date: '2026.01' },
  { outlet: '云南大学校媒', type: '校园新闻', topic: '本科生团队获国创赛立项，聚焦罕见病AI辅助诊疗', date: '2025.12' },
]

// 社交媒体传播
const socialMedia = [
  { platform: '微信公众号', followers: '3,200+', posts: '12篇', reach: '累计阅读 8.5万+' },
  { platform: '小红书', followers: '1,800+', posts: '28篇', reach: '累计曝光 12万+' },
  { platform: 'B站', followers: '950+', posts: '6期', reach: '累计播放 4.2万+' },
]

// 长期社会影响
const longTermImpact = [
  { label: '缩小区域医疗差异', icon: '⚖️' },
  { label: '带动数字医疗就业生态', icon: '💼' },
  { label: '推动罕见病政策完善', icon: '📋' },
  { label: '构建医工交叉人才培养范式', icon: '🎓' },
]
</script>

<template>
  <div class="slide-fin">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 患者价值（2×2） -->
    <div class="value-section">
      <div class="section-title">患者价值</div>
      <div class="value-grid">
        <div v-for="(item, i) in patientValue" :key="i" class="value-card">
          <div class="vc-icon">{{ item.icon }}</div>
          <div class="vc-body">
            <div class="vc-title">{{ item.title }}</div>
            <div class="vc-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 媒体报道 + 社交媒体 -->
    <div class="media-row">
      <!-- 媒体报道 -->
      <div class="media-panel">
        <div class="section-title">媒体报道</div>
        <div class="media-list">
          <div v-for="(m, i) in mediaCoverage" :key="i" class="media-item">
            <div class="mi-date">{{ m.date }}</div>
            <div class="mi-body">
              <div class="mi-outlet">{{ m.outlet }}</div>
              <div class="mi-topic">{{ m.topic }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 社交媒体 -->
      <div class="social-panel">
        <div class="section-title">社交媒体传播</div>
        <div class="social-list">
          <div v-for="(s, i) in socialMedia" :key="i" class="social-item">
            <div class="si-platform">{{ s.platform }}</div>
            <div class="si-stats">
              <div class="si-stat">
                <span class="stat-val">{{ s.followers }}</span>
                <span class="stat-label">粉丝</span>
              </div>
              <div class="si-stat">
                <span class="stat-val">{{ s.posts }}</span>
                <span class="stat-label">内容</span>
              </div>
              <div class="si-stat">
                <span class="stat-val">{{ s.reach }}</span>
                <span class="stat-label">触达</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 长期社会影响 -->
    <div class="impact-strip">
      <div class="section-title inline">长期社会影响</div>
      <div class="impact-tags">
        <div v-for="(item, i) in longTermImpact" :key="i" class="impact-tag">
          <span class="it-icon">{{ item.icon }}</span>
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fin {
  width: 1920px;
  height: 1080px;
  background: #0a0a1a;
  color: white;
  padding: 48px 80px 40px;
  font-family: var(--font-display);
  position: relative;
  overflow: hidden;
}

.header {
  margin-bottom: 8px;
}

.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(76, 175, 80, 0.12);
  color: #81c784;
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: 6px;
  font-weight: 400;
}

.slogan {
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 72px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 5px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title {
  font-size: 12px;
  color: #81c784;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.section-title.inline {
  margin-bottom: 0;
}

/* 患者价值 */
.value-section {
  margin-bottom: 12px;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.value-card {
  display: flex;
  gap: 14px;
  padding: 16px 18px;
  background: rgba(76, 175, 80, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.18);
  border-radius: var(--radius-md);
}

.vc-icon {
  font-size: 28px;
  flex-shrink: 0;
  margin-top: 2px;
}

.vc-body {
  flex: 1;
}

.vc-title {
  font-size: 14px;
  font-weight: 700;
  color: #81c784;
  margin-bottom: 6px;
}

.vc-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
  font-weight: 300;
}

/* 媒体行 */
.media-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.media-panel,
.social-panel {
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
}

.media-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-item {
  display: flex;
  gap: 14px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  align-items: flex-start;
}

.mi-date {
  font-size: 11px;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-weight: 600;
  white-space: nowrap;
  min-width: 60px;
  padding-top: 2px;
}

.mi-body {
  flex: 1;
}

.mi-outlet {
  font-size: 12px;
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
}

.mi-topic {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.4;
}

/* 社交媒体 */
.social-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.si-platform {
  font-size: 13px;
  font-weight: 700;
  color: white;
  min-width: 80px;
}

.si-stats {
  display: flex;
  gap: 20px;
  flex: 1;
}

.si-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-val {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-accent);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: 10px;
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 长期社会影响 */
.impact-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(76, 175, 80, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.15);
  border-radius: var(--radius-md);
}

.impact-tags {
  display: flex;
  gap: 12px;
  flex: 1;
}

.impact-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-full);
  font-size: 13px;
  color: white;
  font-weight: 400;
}

.it-icon {
  font-size: 16px;
}
</style>
