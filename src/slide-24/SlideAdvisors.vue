<script setup>import { ref } from 'vue'


/**
 * SlideAdvisors.vue
 * 第 24 页：指导老师 + 医学专家
 *
 * 内容来源（参考设计稿 slide23）：
 * - 郑家亮 项目指导老师 · 云南大学物理与天文学院副教授
 *   20+ 多年专注于数字医疗和人工智能，数字云南健康医疗唯一代表项目
 *   获云南省技术发明奖科技进步奖等十余项奖励
 *   拥有发明专利等知识产权 60+ 余项
 *
 * - 晋云 · 赵淞 · 魏星（医学专家指导）
 *   云南省第一人民医院 / 云南大学附属医院 / 云南大学校医院
 *   主任医师 / 云南省兴滇名医 / 中国人工智能学会智慧医疗专委会委员
 *   红会医院全科医学科主任 / 全科基地教学主任 / 中国健康促进与教育协会健康管理分会委员
 *   国家高血压管理项目云南省专家组成员 / 呼吸内科 主任医师 / 云南大学校医院院长
 */
import zjlUrl from '@assets/images/content/team-members/专家/zjl.jpeg'
import jyUrl from '@assets/images/content/team-members/专家/jy.jpeg'
import zsUrl from '@assets/images/content/team-members/专家/zs.jpeg'
import wxUrl from '@assets/images/content/team-members/专家/wx.jpeg'

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队效能')
const slogan = ref('一个人做不到的事，我们一起做成')

const advisors = [
  {
    name: '郑家亮',
    role: '项目指导老师',
    avatar: zjlUrl,
    org: '云南大学物理与天文学院副教授',
    desc: '20+ 年专注于数字医疗和人工智能，数字云南健康医疗唯一代表项目，获云南省技术发明奖、科技进步奖等十余项奖励，拥有发明专利等知识产权 60+ 余项。'
  }
]
const doctors = [
  { name: '晋云', avatar: jyUrl, dept: '云南省第一人民医院', role: '肝胆胰外科主任 / 云南省兴滇名医 / 中国人工智能学会智慧医疗专委会委员' },
  { name: '赵淞', avatar: zsUrl, dept: '红会医院', role: '全科医学科主任 / 全科基地教学主任 / 中国健康促进与教育协会健康管理分会委员' },
  { name: '魏星', avatar: wxUrl, dept: '云南大学校医院', role: '院长 / 呼吸内科主任医师 / 国家高血压管理项目云南省专家组成员' }
]
</script>

<template>
  <div class="slide-adv">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <!-- 指导老师 -->
    <div class="advisor-section">
      <div class="section-label">项目指导老师</div>
      <div v-for="(a, i) in advisors" :key="i" class="advisor-card">
        <img :src="a.avatar" :alt="a.name" class="advisor-avatar" />
        <div class="advisor-body">
          <div class="advisor-name">{{ a.name }}</div>
          <div class="advisor-role">{{ a.role }}</div>
          <div class="advisor-org">{{ a.org }}</div>
          <p class="advisor-desc">{{ a.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 医学专家 -->
    <div class="doctor-section">
      <div class="section-label">医学专家指导团</div>
      <div class="doctors-grid">
        <div v-for="(d, i) in doctors" :key="i" class="doctor-card">
          <img :src="d.avatar" :alt="d.name" class="doctor-avatar" />
          <div class="doctor-name">{{ d.name }}</div>
          <div class="doctor-dept">{{ d.dept }}</div>
          <div class="doctor-role">{{ d.role }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-adv {
  width: 1920px; height: 1080px; background: #0a0a1a; color: white;
  padding: 60px 100px; font-family: var(--font-display);
  position: relative; overflow: hidden;
}
.header {
  margin-bottom: 30px;
}
.badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(74, 108, 247, 0.12);
  color: var(--color-accent, #00d4ff);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 999px;
  font-size: 16px;
  letter-spacing: 6px;
  font-weight: 400;
}
.slogan {
  margin: 30px 0 60px 0;
  padding: 0;
  font-size: 84px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 6px;
  background: linear-gradient(135deg, #ffffff 0%, #4a6cf7 50%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-label {
  font-size: var(--text-lg); color: var(--color-accent);
  font-weight: 700; margin-bottom: 16px; letter-spacing: 2px;
}
.advisor-section { margin-bottom: 32px; }
.advisor-card {
  display: flex; gap: 32px;
  padding: 28px 32px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: var(--radius-lg);
  align-items: center;
}
.advisor-avatar {
  width: 140px; height: 140px; border-radius: 50%;
  object-fit: cover; border: 4px solid #4caf50;
  flex-shrink: 0;
}
.advisor-body { flex: 1; }
.advisor-name {
  font-size: var(--text-2xl); font-weight: 700; color: white;
  margin-bottom: 4px;
}
.advisor-role {
  display: inline-block; padding: 4px 12px;
  background: rgba(76, 175, 80, 0.15); color: #81c784;
  border-radius: var(--radius-full);
  font-size: var(--text-sm); font-weight: 600;
  letter-spacing: 2px; margin-bottom: 8px;
}
.advisor-org { font-size: var(--text-base); color: var(--color-accent); margin-bottom: 12px; }
.advisor-desc { font-size: var(--text-base); color: var(--color-text-muted); line-height: 1.7; font-weight: 300; }
.doctor-section { margin-top: 16px; }
.doctors-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
.doctor-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  text-align: center;
}
.doctor-avatar {
  width: 100px; height: 100px; border-radius: 50%;
  object-fit: cover; border: 3px solid var(--color-primary);
  margin: 0 auto 16px;
}
.doctor-name { font-size: var(--text-xl); font-weight: 700; color: white; margin-bottom: 4px; }
.doctor-dept { font-size: var(--text-sm); color: var(--color-accent); margin-bottom: 12px; }
.doctor-role { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; font-weight: 300; }
</style>
