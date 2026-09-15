<script setup>import { ref } from 'vue'


/**
 * SlideTeamMembers.vue
 * 第 22 页：核心成员介绍
 *
 * 内容来源（参考设计稿 slide21）：
 * - 郭俨霆 首席执行官（CEO）
 *   研究方向：医工交叉、AI 医学影像分割
 *   出版论文：DSi-ResCNN: A Framework Enhancing the Error-tolerance Capacity of DNA Storage for Images · IEEE
 *   AngelRare 系统全栈独立开发
 *   岳虹本科生奖学金 · 校级学术科研奖学金 · 校级一等奖学金
 *
 * - 王舒衡 首席技术官 CTO
 *   算法与建模 · 擅长启发式优化算法，前沿方法
 *   高教杯全国大学生数学建模竞赛全国二等奖
 *   正大杯全国大学生市场调查与分析大赛全国三等奖
 *
 * （基于已有文案 + 设计稿推断第二、第三核心成员）
 */
import gytUrl from '@assets/images/content/team-members/学生/gyt.jpg'
import wshUrl from '@assets/images/content/team-members/学生/wsh.jpg'

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队精神')
const slogan = ref('敢想 · 会创 · 同行 · 共进')

const leaders = [
  {
    name: '郭俨霆',
    role: '首席执行官 CEO',
    avatar: gytUrl,
    direction: '医工交叉 · AI 医学影像分割',
    papers: 'DSi-ResCNN: A Framework Enhancing the Error-tolerance Capacity of DNA Storage for Images · IEEE',
    achievements: '岳虹本科生奖学金 · 校级学术科研奖学金 · 校级一等奖学金',
    highlight: 'AngelRare 系统全栈独立开发'
  },
  {
    name: '王舒衡',
    role: '首席技术官 CTO',
    avatar: wshUrl,
    direction: '算法与建模 · 启发式优化算法 · 前沿方法',
    papers: '高教杯全国大学生数学建模竞赛全国二等奖',
    achievements: '正大杯全国大学生市场调查与分析大赛全国三等奖',
    highlight: '算法与建模能力突出'
  }
]
</script>

<template>
  <div class="slide-leaders">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="leaders-grid">
      <div v-for="(leader, i) in leaders" :key="i" class="leader-card">
        <div class="leader-avatar">
          <img :src="leader.avatar" :alt="leader.name" />
          <div class="leader-highlight">{{ leader.highlight }}</div>
        </div>
        <div class="leader-body">
          <div class="leader-name">{{ leader.name }}</div>
          <div class="leader-role">{{ leader.role }}</div>
          <div class="leader-section">
            <div class="ls-label">研究方向</div>
            <div class="ls-content">{{ leader.direction }}</div>
          </div>
          <div class="leader-section">
            <div class="ls-label">学术 / 竞赛成果</div>
            <div class="ls-content">{{ leader.papers }}</div>
          </div>
          <div class="leader-section">
            <div class="ls-label">荣誉 / 奖项</div>
            <div class="ls-content">{{ leader.achievements }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-leaders {
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
.leaders-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; height: calc(100% - 140px); }
.leader-card {
  display: flex; gap: 32px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}
.leader-avatar {
  position: relative; width: 240px; height: 100%;
  display: flex; align-items: flex-start; justify-content: center;
  flex-direction: column;
}
.leader-avatar img {
  width: 240px; height: 240px;
  border-radius: 50%; object-fit: cover;
  border: 4px solid var(--color-primary);
  box-shadow: 0 0 24px rgba(74, 108, 247, 0.4);
  margin-bottom: 16px;
}
.leader-highlight {
  font-size: var(--text-sm); color: var(--color-accent);
  text-align: center; line-height: 1.5;
}
.leader-body { flex: 1; display: flex; flex-direction: column; gap: 16px; justify-content: center; }
.leader-name {
  font-size: var(--text-3xl); font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 4px;
}
.leader-role {
  display: inline-block; padding: 6px 16px;
  background: rgba(74, 108, 247, 0.15); color: var(--color-primary-light);
  border-radius: var(--radius-full);
  font-size: var(--text-base); font-weight: 600;
  letter-spacing: 2px; margin-bottom: 8px;
}
.leader-section { padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, 0.08); }
.ls-label {
  font-size: var(--text-sm); color: var(--color-accent);
  font-weight: 600; letter-spacing: 2px; margin-bottom: 4px;
}
.ls-content { font-size: var(--text-base); color: white; font-weight: 300; line-height: 1.6; }
</style>
