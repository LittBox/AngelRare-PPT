<script setup>import { ref } from 'vue'


/**
 * SlideTechAdvisors.vue
 * 第 25 页：技术顾问
 *
 * 内容来源（参考设计稿 slide24）：
 * - 王鹤男 人工智能算法与云科技技术顾问
 *   亚马逊云科技 (AWS) 公司 大中华区 AI Lab 负责人
 *
 * - 吴红艳 中国科学院深圳先进技术研究院研究员 · 博士生导师 · 深圳市高层次人才
 *   研究方向：AI / 机器学习 · 技术负责人
 *   专注数据实验室与智能体（Agent）方向
 *   擅长计算机视觉、自然语言处理、传统机器学习模型
 *   具备大型 AI 项目落地与团队管理经验
 *   当前项目指导方向：多智能体（Agent）协作支持 / 模型训练算法支持
 *
 *   研究方向：人工智能与算法 · 生命科学 AI
 *   当前项目指导方向：提供 AI 整体技术架构设计 · 指导机器学习与深度学习方案落地
 */
import whnUrl from '@assets/images/content/team-members/专家/whn.png'
import whyUrl from '@assets/images/content/team-members/专家/why.png'

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('团队资源')
const slogan = ref('我们不是独自前行')

const techAdvisors = [
  {
    name: '王鹤男',
    role: '人工智能算法与云科技技术顾问',
    avatar: whnUrl,
    org: '亚马逊云科技 (AWS) · 大中华区 AI Lab 负责人',
    direction: 'AI / 机器学习 · 云科技',
    support: '提供云端算力支持、AI 工程化指导'
  },
  {
    name: '吴红艳',
    role: 'AI 技术负责人',
    avatar: whyUrl,
    org: '中国科学院深圳先进技术研究院 · 研究员 / 博士生导师',
    direction: '数据实验室与智能体（Agent）方向',
    support: '多智能体协作支持 / 模型训练算法支持'
  }
]
</script>

<template>
  <div class="slide-tech">
    <div class="header">
      <div class="badge">{{ secondLevelNav }}</div>
    </div>

    <!-- 灵魂 Slogan · 超大艺术字 · 第一视觉中心 -->
    <h1 class="slogan">{{ slogan }}</h1>

    <div class="tech-grid">
      <div v-for="(t, i) in techAdvisors" :key="i" class="tech-card">
        <img :src="t.avatar" :alt="t.name" class="tech-avatar" />
        <div class="tech-body">
          <div class="tech-name">{{ t.name }}</div>
          <div class="tech-role">{{ t.role }}</div>
          <div class="tech-org">{{ t.org }}</div>
          <div class="tech-section">
            <div class="ts-label">研究方向</div>
            <div class="ts-content">{{ t.direction }}</div>
          </div>
          <div class="tech-section">
            <div class="ts-label">项目指导方向</div>
            <div class="ts-content">{{ t.support }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-tech {
  width: 1920px; height: 1080px; background: #0a0a1a; color: white;
  padding: 80px 140px; font-family: var(--font-display);
  position: relative; overflow: hidden;
}
.header { margin-bottom: 60px; text-align: center; }
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
.tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.tech-card {
  display: flex; gap: 32px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(74, 108, 247, 0.06) 0%, rgba(0, 212, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}
.tech-avatar {
  width: 180px; height: 180px; border-radius: 50%;
  object-fit: cover; border: 4px solid var(--color-primary);
  flex-shrink: 0;
}
.tech-body { flex: 1; display: flex; flex-direction: column; gap: 14px; justify-content: center; }
.tech-name {
  font-size: var(--text-2xl); font-weight: 700; color: white;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.tech-role {
  display: inline-block; padding: 4px 12px;
  background: rgba(74, 108, 247, 0.15); color: var(--color-primary-light);
  border-radius: var(--radius-full);
  font-size: var(--text-sm); font-weight: 600;
  letter-spacing: 2px;
}
.tech-org { font-size: var(--text-base); color: var(--color-accent); }
.tech-section { padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
.ts-label {
  font-size: var(--text-sm); color: var(--color-accent);
  font-weight: 600; letter-spacing: 2px; margin-bottom: 4px;
}
.ts-content { font-size: var(--text-base); color: white; font-weight: 300; line-height: 1.6; }
</style>
