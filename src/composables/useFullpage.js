/**
 * useFullpage.js - 自研版本（彻底替代 fullpage.js）
 *
 * 核心原则：
 * - 不再让 fullpage.js 触碰 .presentation 容器的 transform
 * - 所有 .section 始终 position: absolute 叠在一起
 * - 通过 active class 控制哪个 section 可见（display/visibility/opacity）
 * - 监听 wheel/keydown/touch 切换 active
 *
 * 为什么自研而不是用 fullpage：
 *   fullpage.js 默认会给容器加 translate3d 平移，
 *   内部 absolute 定位会被搞坏。fullpage 还可能修改 body 的 overflow、padding，
 *   跨视口尺寸下行为不可预测。自研只做一件事：控制可见性。
 */

import { ref, onBeforeUnmount, onMounted } from 'vue'

export function useFullpage() {
  const api = ref(null)
  const isReady = ref(false)
  const currentIndex = ref(0)  // 0-based
  let container = null
  let sections = []
  let total = 0
  let isAnimating = false
  let lastWheelTime = 0
  const wheelThrottleMs = 900  // 与动画时长对齐
  let touchStartY = 0
  let touchEndY = 0
  let observer = null  // ResizeObserver
  let resizeTimer = null

  function activate(index) {
    if (index < 0 || index >= total) return
    if (index === currentIndex.value) return

    const from = currentIndex.value
    const to = index
    const fromSection = sections[from]
    const toSection = sections[to]

    if (!fromSection || !toSection) return

    isAnimating = true

    // 简单淡入淡出切换
    fromSection.classList.remove('active')
    fromSection.classList.add('fp-leaving')

    toSection.classList.add('active')
    toSection.classList.remove('fp-leaving')

    currentIndex.value = to

    // 更新 hash 用于圆点 active 状态
    setTimeout(() => {
      fromSection.classList.remove('fp-leaving')
      isAnimating = false
    }, 800)
  }

  function moveTo(index) {
    if (typeof index === 'string') {
      // fullpage 兼容: 'first', 'last', 'down', 'up', 数字
      if (index === 'first') index = 0
      else if (index === 'last') index = total - 1
      else if (index === 'down' || index === '+1') index = currentIndex.value + 1
      else if (index === 'up' || index === '-1') index = currentIndex.value - 1
      else index = parseInt(index, 10)
    }
    if (typeof index !== 'number' || isNaN(index)) return
    activate(index)
  }

  function onWheel(e) {
    e.preventDefault()
    const now = Date.now()
    if (now - lastWheelTime < wheelThrottleMs || isAnimating) return
    lastWheelTime = now

    if (e.deltaY > 0) {
      moveTo(currentIndex.value + 1)
    } else if (e.deltaY < 0) {
      moveTo(currentIndex.value - 1)
    }
  }

  function onKeydown(e) {
    if (isAnimating) return
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault()
        moveTo(currentIndex.value + 1)
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        moveTo(currentIndex.value - 1)
        break
      case 'Home':
        e.preventDefault()
        moveTo(0)
        break
      case 'End':
        e.preventDefault()
        moveTo(total - 1)
        break
    }
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY
  }
  function onTouchEnd(e) {
    touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY - touchEndY
    if (Math.abs(diff) < 50) return
    if (diff > 0) moveTo(currentIndex.value + 1)
    else moveTo(currentIndex.value - 1)
  }

  function buildNav() {
    // 自建右侧圆点导航（按 section type 区分视觉层级）
    const nav = document.createElement('ul')
    nav.className = 'fp-nav'
    for (let i = 0; i < total; i++) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = '#section-' + i
      a.dataset.index = String(i)

      // 读取 section 的 type 属性，决定圆点视觉
      const sec = sections[i]
      const type = sec ? sec.dataset.type : 'content'
      const navTitle = sec ? (sec.dataset.navTitle || '') : ''
      a.classList.add('type-' + (type || 'content'))
      a.dataset.tooltip = navTitle || ('第 ' + (i + 1) + ' 页')
      a.setAttribute('aria-label', a.dataset.tooltip)

      if (i === 0) a.classList.add('active')
      a.addEventListener('click', (e) => {
        e.preventDefault()
        moveTo(i)
      })
      li.appendChild(a)
      nav.appendChild(li)
    }
    document.body.appendChild(nav)

    return nav
  }

  let navEl = null

  function updateNav() {
    if (!navEl) return
    const items = navEl.querySelectorAll('a')
    items.forEach((a, i) => {
      a.classList.toggle('active', i === currentIndex.value)
    })
  }

  function init(containerEl, options = {}) {
    if (!containerEl) {
      console.warn('[useFullpage] container 为空')
      return
    }
    container = containerEl
    sections = Array.from(container.querySelectorAll(':scope > .section'))
    total = sections.length
    if (total === 0) {
      console.warn('[useFullpage] 没有 .section')
      return
    }

    // 给每个 section 加 data-section-index 和唯一 id
    sections.forEach((sec, i) => {
      sec.dataset.index = String(i)
      sec.id = `section-${i}`
      // 关键：所有 section 绝对定位 + opacity 切换
      sec.classList.add('fp-slide')
      if (i === 0) sec.classList.add('active')
      else sec.classList.add('fp-leaving')
    })

    // 全局监听滚动/键盘/触摸
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    // 自建右侧圆点导航（区分 type-toc / type-section / type-content 三种视觉层级）
    navEl = buildNav()

    // 监听 resize - 防抖触发自定义事件，让外部重新计算 scale
    observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        window.dispatchEvent(new Event('fullpage-resize'))
      }, 100)
    })
    observer.observe(document.body)

    // 暴露 API
    api.value = {
      moveTo,
      moveSectionDown: () => moveTo(currentIndex.value + 1),
      moveSectionUp: () => moveTo(currentIndex.value - 1),
      getActiveSection: () => ({ index: currentIndex.value }),
      destroy: destroy
    }
    isReady.value = true
    // 同时挂载到 window 方便外部测试调用
    if (typeof window !== 'undefined') {
      window.fullpage_api = api.value
    }
    console.log('[useFullpage] 自研版本初始化成功，' + total + ' 页')

    // 监听 currentIndex 变化，更新圆点
    // 用 effectScope 模拟（Vue 3 兼容）
    const stopWatch = (() => {
      // 用 setInterval 替代 watch 的简单方式（也兼容）
      const id = setInterval(() => {
        if (api.value) updateNav()
      }, 100)
      return () => clearInterval(id)
    })()

    // 保存清理
    container._fpCleanup = [stopWatch]
  }

  function destroy() {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
    if (observer) { observer.disconnect(); observer = null }
    if (navEl && navEl.parentNode) navEl.parentNode.removeChild(navEl)
    if (container && container._fpCleanup) {
      container._fpCleanup.forEach(fn => fn())
      container._fpCleanup = null
    }
    sections.forEach(sec => {
      sec.classList.remove('fp-slide', 'active', 'fp-leaving')
    })
    isReady.value = false
    console.log('[useFullpage] 已销毁')
  }

  onBeforeUnmount(destroy)

  return { api, isReady, init, destroy }
}
