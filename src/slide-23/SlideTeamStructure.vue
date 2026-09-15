<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队结构')
const slogan = ref('各有所长，彼此成就')

// 核心领导（超大半身照）
const leaders = [
  {
    name: '郭俨霆',
    role: 'CEO · 首席执行官',
    tags: '医工交叉 · AI影像分割 · 全栈开发',
    initials: 'GYT',
    avatar: 'gyt.jpg',
    highlight: true,
  },
  {
    name: '王舒衡',
    role: 'CTO · 首席技术官',
    tags: '算法建模 · 启发式优化 · 前沿方法',
    initials: 'WSH',
    avatar: 'wsh.jpg',
    highlight: true,
  },
]

// 各部门成员（中等照片）
const members = [
  // 技术研发
  { name: '黄维哲', role: '技术研发', dept: '技术研发', initials: 'HWZ', avatar: 'hwz.jpg', deptColor: '#3C8DFF' },
  { name: '孙一豪', role: '技术研发', dept: '技术研发', initials: 'SYH', avatar: 'syh.jpg', deptColor: '#3C8DFF' },
  { name: '丁俊宝', role: '技术研发', dept: '技术研发', initials: 'DJB', avatar: 'djb.jpg', deptColor: '#3C8DFF' },
  { name: '丁秋羽', role: '技术研发', dept: '技术研发', initials: 'DQY', avatar: 'dqy.jpg', deptColor: '#3C8DFF' },
  // 项目运营
  { name: '张浩筠', role: '项目运营', dept: '项目运营', initials: 'ZHY', avatar: 'zhy.jpg', deptColor: '#19C6FF' },
  { name: '李章娜', role: '项目运营', dept: '项目运营', initials: 'LZN', avatar: 'lzn.jpg', deptColor: '#19C6FF' },
  { name: '农依', role: '项目运营', dept: '项目运营', initials: 'NY', avatar: 'ny.jpg', deptColor: '#19C6FF' },
  // 市场传播
  { name: '王翊暄', role: '市场传播', dept: '市场传播', initials: 'WYX', avatar: 'wyx.jpg', deptColor: '#E8B35C' },
  { name: '吕迎祥', role: '市场传播', dept: '市场传播', initials: 'LYX', avatar: 'lyx.png', deptColor: '#E8B35C' },
  { name: '吴小龙', role: '市场传播', dept: '市场传播', initials: 'WXL', avatar: 'wxl.jpg', deptColor: '#E8B35C' },
  { name: '杨嘉怡', role: '市场传播', dept: '市场传播', initials: 'YJY', avatar: 'yjy.jpg', deptColor: '#E8B35C' },
  { name: '周丽萍', role: '市场传播', dept: '市场传播', initials: 'ZLP', avatar: 'zlp.jpg', deptColor: '#E8B35C' },
  { name: '曾湘雨', role: '市场传播', dept: '市场传播', initials: 'ZXY', avatar: 'zxy.jpg', deptColor: '#E8B35C' },
]

const deptSummary = [
  { name: '技术研发', color: '#3C8DFF', count: '4人', desc: '前端 · 后端 · 核心算法 · 模型调优' },
  { name: '项目运营', color: '#19C6FF', count: '3人', desc: '临床洞察 · 社群运营 · 活动策划' },
  { name: '市场传播', color: '#E8B35C', count: '6人', desc: '品牌营销 · 内容运营 · 渠道拓展' },
]
</script>

<template>
  <div class="slide-struct">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="gold" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 核心领导（大半身照） -->
      <div class="leaders">
        <div v-for="l in leaders" :key="l.name" class="leader-card">
          <div class="leader-photo-wrap">
            <div class="photo-glow" :style="{ background: l.highlight ? 'rgba(232,179,92,0.15)' : 'rgba(57,141,255,0.15)' }"></div>
            <img
              :src="`/assets/images/content/team-members/学生/${l.avatar}`"
              :alt="l.name"
              class="leader-photo"
            />
            <div class="photo-ring" :style="{ borderColor: l.highlight ? '#E8B35C' : '#3C8DFF' }"></div>
          </div>
          <div class="leader-info">
            <div class="leader-name">{{ l.name }}</div>
            <div class="leader-role" :style="{ color: l.highlight ? '#E8B35C' : '#3C8DFF' }">{{ l.role }}</div>
            <div class="leader-tags">{{ l.tags }}</div>
          </div>
        </div>
      </div>

      <!-- 各部门成员（中等照片 5×3 网格） -->
      <div class="members-grid">
        <div v-for="m in members" :key="m.name" class="member-card">
          <div class="member-photo-wrap">
            <img
              :src="`/assets/images/content/team-members/学生/${m.avatar}`"
              :alt="m.name"
              class="member-photo"
            />
            <div class="dept-dot" :style="{ background: m.deptColor }"></div>
          </div>
          <div class="member-name">{{ m.name }}</div>
          <div class="member-dept" :style="{ color: m.deptColor }">{{ m.role }}</div>
        </div>
      </div>

      <!-- 底部：部门构成 -->
      <div class="dept-bar">
        <div v-for="d in deptSummary" :key="d.name" class="dept-item" :style="{ borderColor: d.color }">
          <div class="di-label" :style="{ color: d.color }">{{ d.name }}</div>
          <div class="di-count">{{ d.count }}</div>
          <div class="di-desc">{{ d.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-struct {
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
  padding: 52px 100px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;
}

.top { display: flex; flex-direction: column; gap: 12px; }

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

/* 核心领导 */
.leaders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.leader-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}

.leader-photo-wrap {
  position: relative;
  width: 160px;
  height: 200px;
  flex-shrink: 0;
}

.photo-glow {
  position: absolute;
  inset: -8px;
  border-radius: var(--radius-lg);
  filter: blur(20px);
}

.leader-photo {
  width: 160px;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
  position: relative;
  z-index: 1;
}

.photo-ring {
  position: absolute;
  inset: -3px;
  border-radius: var(--radius-md);
  border: 3px solid;
  z-index: 2;
  box-shadow: 0 0 20px currentColor;
}

.leader-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.leader-name {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.leader-role {
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: 1px;
}

.leader-tags {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 300;
  line-height: 1.5;
}

/* 部门成员 5×3 */
.members-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 14px;
  flex: 1;
  overflow: hidden;
}

.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
  text-align: center;
  gap: 8px;
}

.member-photo-wrap {
  position: relative;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
}

.member-photo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(57, 141, 255, 0.5);
}

.dept-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--color-bg);
  z-index: 2;
}

.member-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
}

.member-dept {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1px;
}

/* 部门构成 */
.dept-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: auto;
}

.dept-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid;
  border-radius: var(--radius-md);
}

.di-label {
  font-size: var(--text-base);
  font-weight: 700;
  letter-spacing: 2px;
  min-width: 80px;
}

.di-count {
  font-size: var(--text-xl);
  font-weight: 900;
  font-family: var(--font-mono);
  color: white;
}

.di-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 300;
  flex: 1;
}
</style>
