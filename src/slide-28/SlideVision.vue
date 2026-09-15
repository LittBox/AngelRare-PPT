<script setup>
/**
 * SlideVision.vue
 * 第 28 页：愿景规划
 *
 * 内容来源（参考设计稿 slide27）：
 * - 联合多方力量，推动罕见病研究与发展
 * - AngelRare
 */
const vision = '联合多方力量，推动罕见病研究与发展'
</script>

<template>
  <div class="slide-vision">
    <div class="bg-decoration">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
    </div>

    <div class="content">
      <div class="brand">AngelRare</div>
      <div class="divider"></div>
      <h1 class="vision-text">{{ vision }}</h1>

      <div class="partners">
        <div class="partner">🏥 医院</div>
        <div class="partner">👨‍⚕️ 医生</div>
        <div class="partner">💊 药企</div>
        <div class="partner">🤝 公益组织</div>
        <div class="partner">🎓 高校</div>
        <div class="partner">👥 患者</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-vision {
  width: 1920px; height: 1080px; position: relative;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%);
  color: white; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); overflow: hidden;
}
.bg-decoration { position: absolute; inset: 0; pointer-events: none; }
.glow {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4;
}
.glow-1 {
  top: 20%; left: 20%; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(74, 108, 247, 0.6) 0%, transparent 70%);
}
.glow-2 {
  top: 50%; right: 15%; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%);
}
.glow-3 {
  bottom: 15%; left: 40%; width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, transparent 70%);
}
.content { position: relative; z-index: 2; text-align: center; max-width: 1600px; padding: 0 80px; }
.brand {
  font-size: var(--text-5xl); font-weight: 900; letter-spacing: 12px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 24px;
}
.divider {
  width: 200px; height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent);
  margin: 32px auto;
}
.vision-text {
  font-size: var(--text-4xl); font-weight: 700;
  letter-spacing: 6px; line-height: 1.4;
  background: linear-gradient(135deg, #ffffff 0%, #c0d0ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 60px;
}
.partners {
  display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
  margin-top: 40px;
}
.partner {
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--text-lg); color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}
.partner:hover {
  background: rgba(74, 108, 247, 0.15);
  border-color: var(--color-primary);
  transform: translateY(-4px);
}
</style>
