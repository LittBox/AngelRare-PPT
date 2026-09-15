<script setup>
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
      <div class="badge">团队结构</div>
      <h1 class="title">多元专业 · 协同分工</h1>
      <p class="subtitle">团队成员各展所长、协同推进 —— 一个纯计算机团队做不出能落地的医疗 AI，一个纯医学团队也实现不了多智能体系统</p>
    </div>

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
  display: inline-block; padding: 8px 20px;
  background: rgba(74, 108, 247, 0.15); color: var(--color-accent);
  border: 1px solid rgba(74, 108, 247, 0.3); border-radius: var(--radius-full);
  font-size: var(--text-sm); letter-spacing: 4px; margin-bottom: 16px;
}
.title { font-size: var(--text-3xl); font-weight: 700; letter-spacing: 4px; margin-bottom: 12px; }
.subtitle {
  font-size: var(--text-base); color: var(--color-text-muted);
  font-weight: 300; max-width: 1500px; margin: 0 auto; line-height: 1.7;
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
