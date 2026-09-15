<script setup>
import { ref } from 'vue'
import SlideBadge from '@/components/SlideBadge.vue'
import SlideBg from '@/components/SlideBg.vue'

/**
 * SlideBenchmark.vue
 * 第 15 页：创新成效｜商业模式创新
 */

// ============== 定稿文案（不可修改） ==============
const secondLevelNav = ref('创新成效｜商业模式创新')
const slogan = ref('每一次服务，都让下一次更有价值')

const flywheel = [
  { name: '数据越用越厚', icon: '📈', desc: '医生病例 → PAP全病程数据 → RWE → 更多产业服务', detail: '数据积累相互反哺，每完成一次服务，沉淀更多高质量数据资产', color: '#4CAF50' },
  { name: '服务越做越强', icon: '⚡', desc: '数据积累降低重复采集成本，提升科研与RWE交付效率', detail: '历史数据让新服务启动成本趋近于零，服务质量持续提升', color: '#19C6FF' },
  { name: '客户越用越黏', icon: '🔗', desc: '医生信任网络 + 患者随访数据 + PAP工作流形成长期转换成本', detail: '工作流嵌入医生日常习惯，数据资产不可迁移，形成自然壁垒', color: '#3C8DFF' },
  { name: '生态越转越大', icon: '🔄', desc: 'B端收入反哺PAP → 服务更多患者 → 沉淀更多数据 → 再增强B端服务', detail: '飞轮各节点相互增强，形成自我强化的增长闭环', color: '#E8B35C' },
]

const barriers = [
  { title: '飞轮验证', icon: '🔁', desc: '医生病例→PAP→RWE→药企→更多医生，节点需求真实且可量化' },
  { title: '客户黏性', icon: '🪝', desc: '医生工作流嵌入 + 患者随访数据积累，转换成本持续增高' },
  { title: '数据资产', icon: '💎', desc: '结构化病例 + 随访数据 + RWE报告，随时间增值且不可复制' },
]

const flowNodes = [
  { label: '医生病例', icon: '👨‍⚕️' },
  { label: 'PAP管理', icon: '📋' },
  { label: '真实世界数据', icon: '🔬' },
  { label: '药企服务', icon: '💊' },
  { label: '收入反哺', icon: '💰' },
  { label: '更多医生', icon: '➕' },
]
</script>

<template>
  <div class="slide-bench">
    <SlideBg />

    <div class="content">
      <!-- 顶部 -->
      <div class="top">
        <SlideBadge :label="secondLevelNav" color="blue" />
        <h1 class="slogan">{{ slogan }}</h1>
      </div>

      <!-- 飞轮四要素 -->
      <div class="flywheel-row">
        <div v-for="f in flywheel" :key="f.name" class="fw-card" :style="{ borderColor: f.color + '50' }">
          <div class="fw-header">
            <div class="fw-icon" :style="{ background: f.color + '20', color: f.color }">{{ f.icon }}</div>
            <div class="fw-name" :style="{ color: f.color }">{{ f.name }}</div>
          </div>
          <div class="fw-desc">{{ f.desc }}</div>
          <div class="fw-detail">{{ f.detail }}</div>
        </div>
      </div>

      <!-- 商业闭环验证 + 飞轮路径 -->
      <div class="bottom-row">
        <div class="barriers-panel">
          <div class="panel-label">商业闭环壁垒验证</div>
          <div class="barriers">
            <div v-for="b in barriers" :key="b.title" class="barrier-item">
              <span class="bi-icon">{{ b.icon }}</span>
              <div class="bi-body">
                <div class="bi-title">{{ b.title }}</div>
                <div class="bi-desc">{{ b.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flow-panel">
          <div class="panel-label">数据飞轮流转路径</div>
          <div class="flow-track">
            <div v-for="(n, i) in flowNodes" :key="i" class="flow-node">
              <span class="fn-icon">{{ n.icon }}</span>
              <span class="fn-label">{{ n.label }}</span>
              <span v-if="i < flowNodes.length - 1" class="fn-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-bench {
  width: 1920px; height: 1080px; position: relative;
  background: var(--color-bg); color: white;
  font-family: var(--font-display); overflow: hidden; display: flex; flex-direction: column;
}
.content {
  position: relative; z-index: var(--z-base);
  padding: 52px 100px 40px; display: flex; flex-direction: column; gap: 28px; height: 100%;
}
.top { display: flex; flex-direction: column; gap: 12px; }
.slogan {
  margin: 0; padding: 0; font-size: var(--text-4xl); font-weight: 800;
  line-height: 1.1; letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #3C8DFF 60%, #19C6FF 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.flywheel-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.fw-card {
  padding: 24px; background: rgba(255,255,255,0.03);
  border: 1px solid; border-radius: var(--radius-lg);
}
.fw-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.fw-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.fw-name { font-size: var(--text-xl); font-weight: 700; letter-spacing: 1px; }
.fw-desc { font-size: var(--text-base); color: white; line-height: 1.5; font-weight: 400; margin-bottom: 12px; }
.fw-detail { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; font-weight: 300; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); }
.bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: auto; }
.barriers-panel, .flow-panel { padding: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); }
.panel-label { font-size: 12px; color: var(--color-blue-bright); font-weight: 700; letter-spacing: 4px; margin-bottom: 14px; }
.barriers { display: flex; flex-direction: column; gap: 12px; }
.barrier-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); }
.bi-icon { font-size: 24px; flex-shrink: 0; }
.bi-body { flex: 1; }
.bi-title { font-size: var(--text-base); font-weight: 700; color: white; margin-bottom: 4px; }
.bi-desc { font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 300; line-height: 1.4; }
.flow-track { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.flow-node { display: flex; align-items: center; gap: 6px; }
.fn-icon { font-size: 18px; }
.fn-label { font-size: var(--text-base); color: white; font-weight: 500; }
.fn-arrow { font-size: 20px; color: rgba(57,141,255,0.4); margin: 0 6px; }
</style>
