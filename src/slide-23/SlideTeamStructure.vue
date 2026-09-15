<script setup>import { ref } from 'vue'


/**
 * SlideTeamStructure.vue
 * 第 23 页：项目团队分工
 *
 * 内容来源（参考设计稿 slide22）：
 * - 多元专业 · 协同分工
 * - 技术研发 → 项目运营 → 市场传播
 * - 全栈 / 前端开发 / 后端开发 / 核心算法设计 / 模型调优 / 智能体构建 / 测试运维 / 合规工程
 * - 社交媒体运营 / 活动策划 / 临床需求洞察 / 市场商业分析 / 品牌营销 / 社群运营 / 视频、文案 / 财务与量化分析
 * - 团队成员各展所长、协同推进
 */
// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队结构')
const slogan = ref('各有所长，彼此成就')

const departments = [
  {
    name: '技术研发',
    icon: '⚙️',
    members: ['全栈 / 前端开发', '后端开发', '核心算法设计', '模型调优 / 智能体构建', '测试运维 / 合规工程'],
    color: '#4a6cf7'
  },
  {
    name: '项目运营',
    icon: '📋',
    members: ['社交媒体运营', '活动策划', '临床需求洞察', '财务与量化分析'],
    color: '#00d4ff'
  },
  {
    name: '市场传播',
    icon: '📢',
    members: ['市场商业分析', '品牌营销', '社群运营', '视频 / 文案'],
    color: '#4caf50'
  }
]
</script>

<template>
  <div class="slide-struct">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="dept-grid">
      <div v-for="(dept, i) in departments" :key="i" class="dept-card">
        <div class="dept-header" :style="{ background: dept.color }">
          <div class="dept-icon">{{ dept.icon }}</div>
          <div class="dept-name">{{ dept.name }}</div>
        </div>
        <ul class="dept-members">
          <li v-for="(m, j) in dept.members" :key="j">
            <span class="member-dot" :style="{ background: dept.color }"></span>
            {{ m }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-struct {
  width: 1920px; height: 1080px; background: #0a0a1a; color: white;
  padding: 60px 100px; font-family: var(--font-display);
  position: relative; overflow: hidden;
}
.header { margin-bottom: 40px; text-align: center; }
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
.dept-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px;
  margin-top: 40px;
}
.dept-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.dept-header {
  padding: 32px;
  display: flex; align-items: center; gap: 20px;
  color: white;
}
.dept-icon { font-size: 48px; }
.dept-name {
  font-size: var(--text-2xl); font-weight: 700; letter-spacing: 4px;
}
.dept-members {
  padding: 24px 32px;
  display: flex; flex-direction: column; gap: 14px;
}
.dept-members li {
  display: flex; align-items: center; gap: 12px;
  font-size: var(--text-base); color: white; font-weight: 300;
}
.member-dot {
  width: 8px; height: 8px; border-radius: 50%;
}
</style>
