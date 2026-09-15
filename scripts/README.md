# 导出脚本说明

## export-pptx.mjs

**用途**：把 HTML PPT 渲染为 PNG 截图（每页一张），后续可作为 PPT 背景插入 .pptx。

**前提**：必须先启动 Vite 的预览服务：
```bash
npm run build
npm run preview
```

然后另开终端运行：
```bash
npm run export:pptx
```

输出文件：
- `export/screenshots/slide-01.png` ~ `slide-29.png`（每页 1920×1080 PNG）

## 后续导出 .pptx（待实现）

将 PNG 插入 PPTX 有两种思路：

### 方案 A：纯图片版（最简单）
把每张 PNG 插入到独立 PPT 页面中。优点：简单；缺点：文字不可编辑。

### 方案 B：可编辑文本版（推荐）
使用 `dom-to-pptx` 直接把 HTML DOM 转为 PPTX 文本框，文字可在 PowerPoint 中二次编辑。

实施步骤：
1. 安装 `dom-to-pptx` ✅ (已在 package.json)
2. 在每页 Vue 组件上加 `class="pptx-slide"` 标识
3. 编写转换脚本调用 `exportToPptx`

参考代码：
```js
import { exportToPptx } from 'dom-to-pptx'
const slides = Array.from(document.querySelectorAll('.pptx-slide'))
await exportToPptx(slides, {
  fileName: 'angelrare-国创赛-网评.pptx',
  svgAsVector: true,
  layout: 'LAYOUT_WIDE'
})
```
