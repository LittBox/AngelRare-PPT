<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBg.vue'


/**
 * SlideFinance.vue (实际是 SlideSocialImpact)
 * 第 20 页：社会影响
 *
 * 【核心原则：设计可以自由，内容必须忠实】
 *
 * 文案铁律（100% 逐字执行）：
 *   二级目录：「社会影响」
 *   Slogan：「让罕见被看见，让需要被回应」
 *
 * 视觉重构（2026-09-15）：
 * - Slogan成为第一视觉中心
 * - 患者价值3卡片
 * - 媒体报道 + 社交媒体数据
 * - 长期社会影响标签
 * - 使用真实截图或素材做视觉证据
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
    <!-- Slogan 背景层 -->
    <div class="slogan-bg">{{ slogan }}</div>

    <div class="content">
      <!-- 顶部：徽章 + Slogan -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="green" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 患者价值（3卡片） -->
      <div class="value-section">
        <div class="section-label">患者价值</div>
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
          <div class="section-label">媒体报道</div>
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
          <div class="section-label">社交媒体传播</div>
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
        <div class="section-label inline">长期社会影响</div>
        <div class="impact-tags">
          <div v-for="(item, i) in longTermImpact" :key="i" class="impact-tag">
            <span class="it-icon">{{ item.icon }}</span>
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fin {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: var(--color-bg);
  color: white;
  font-family: var(--font-display);
  overflow: hidden;
}

/* Slogan 背景层 */
.slogan-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 200px;
  font-weight: 900;
  letter-spacing: 10px;
  white-space: nowrap;
  color: rgba(76, 175, 80, 0.04);
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

.content {
  position: relative;
  z-index: 1;
  padding: 48px 100px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  min-height: 0;
}

/* 顶部 */
.top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.slogan {
  margin: 0;
  padding: 0;
  font-size: var(--text-4xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #81c784 60%, #4CAF50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-label {
  font-size: var(--text-sm);
  color: #81c784;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 12px;
}

.section-label.inline {
  margin-bottom: 0;
  flex-shrink: 0;
}

/* 患者价值 */
.value-section {
  flex-shrink: 0;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.value-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.18);
  border-radius: var(--radius-md);
}

.vc-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.vc-body {
  flex: 1;
}

.vc-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: #81c784;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

.vc-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  font-weight: 300;
}

/* 媒体行 */
.media-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.media-panel,
.social-panel {
  padding: 20px 24px;
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
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
  align-items: flex-start;
}

.mi-date {
  font-size: var(--text-xs);
  color: var(--color-gold);
  font-family: var(--font-mono);
  font-weight: 600;
  white-space: nowrap;
  min-width: 64px;
  padding-top: 2px;
}

.mi-body {
  flex: 1;
}

.mi-outlet {
  font-size: var(--text-sm);
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
}

.mi-topic {
  font-size: var(--text-xs);
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
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-sm);
}

.si-platform {
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  min-width: 90px;
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
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-gold);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
}

/* 长期社会影响 */
.impact-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  background: rgba(76, 175, 80, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.15);
  border-radius: var(--radius-md);
  flex-shrink: 0;
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
  font-size: var(--text-sm);
  color: white;
  font-weight: 400;
}

.it-icon {
  font-size: 16px;
}
</style>
