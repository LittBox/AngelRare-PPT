<script setup>
/**
 * SlideBg.vue
 * 全局共享多层背景组件
 *
 * 5层背景结构：
 * Layer 1: 极深蓝黑渐变基础
 * Layer 2: DNA/AI/医疗主题纹理（半透明）
 * Layer 3: 深色透明渐变遮罩
 * Layer 4: 蓝色光效/光线/科技装饰
 * Layer 5: 金色粒子/微光/局部高亮
 *
 * 视觉语义：
 *   蓝 = 科技 / AI / 推理
 *   金 = 生命 / 患者 / 温度
 */
defineProps({
  /** 背景氛围：tech（科技蓝）| life（金色生命）| neutral（中性） */
  variant: {
    type: String,
    default: 'tech',
  },
  /** 是否显示粒子效果 */
  particles: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="slide-bg" :class="'bg-' + variant">
    <!-- Layer 1: 极深蓝黑渐变基础 -->
    <div class="layer layer-base"></div>

    <!-- Layer 2: 主题纹理（DNA网格/数据网络） -->
    <div class="layer layer-texture"></div>

    <!-- Layer 3: 深色渐变遮罩 -->
    <div class="layer layer-vignette"></div>

    <!-- Layer 4: 蓝色科技光效 -->
    <div class="layer layer-glow-blue"></div>

    <!-- Layer 5: 金色粒子 -->
    <div v-if="particles" class="layer layer-gold-particles"></div>
  </div>
</template>

<style scoped>
.slide-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Layer 1: 极深蓝黑渐变基础 */
.layer-base {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    #020817 0%,
    #040819 30%,
    #060A1D 60%,
    #040819 100%
  );
}

/* Layer 2: DNA网格/数据网络纹理 */
.layer-texture {
  position: absolute;
  inset: 0;
  background-image:
    /* 横线网格 */
    linear-gradient(rgba(57, 141, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 141, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.7;
}

/* Layer 3: 边缘暗角遮罩 */
.layer-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    transparent 30%,
    rgba(2, 8, 23, 0.6) 100%
  );
}

/* Layer 4: 蓝色科技光效 */
.layer-glow-blue {
  position: absolute;
  inset: 0;
  background:
    /* 右上角光晕 */
    radial-gradient(ellipse 50% 40% at 85% 15%, rgba(47, 128, 255, 0.12) 0%, transparent 70%),
    /* 左下角光晕 */
    radial-gradient(ellipse 40% 30% at 15% 85%, rgba(25, 198, 255, 0.07) 0%, transparent 70%),
    /* 顶部细光线 */
    linear-gradient(180deg, rgba(57, 141, 255, 0.04) 0%, transparent 40%);
}

/* Layer 5: 金色粒子 */
.layer-gold-particles {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 20% 15% at 30% 20%, rgba(232, 179, 92, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 15% 20% at 70% 75%, rgba(246, 199, 110, 0.04) 0%, transparent 70%),
    radial-gradient(ellipse 10% 10% at 80% 40%, rgba(255, 215, 139, 0.05) 0%, transparent 70%);
}
</style>
