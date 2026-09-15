# vendor/ - 第三方参考

## ppt-master

仓库来源：https://github.com/hugohe3/ppt-master

### 用途

**重要说明**：ppt-master 不是一个直接生成 HTML PPT 的工具，而是一个 AI 驱动的 **PPTX 工作流**。它的核心目标是生成**原生可编辑的 .pptx 文件**（真实 PowerPoint 对象，可二次编辑）。

### 我们如何使用它

- **学习设计规范**：从 `skills/ppt-master/references/canvas-formats.md` 等文档中提取**字号、字号体系、画布比例**的最佳实践
- **学习工作流思想**：从 `SKILL.md` 中学习 Plan → Do · Check · Act 的工作流理念
- **不直接依赖**：我们用 Vue 做 HTML PPT，导出时用 Puppeteer + 截图（或 dom-to-pptx）

### 提取出的关键设计参数

| 项目 | 参数 | 来源 |
|------|------|------|
| PPT 16:9 画布 | 1280×720（我们用 1920×1080 等比）| `canvas-formats.md` |
| 正文字号 | 32px（presentation 模式）| `canvas-formats.md` |
| 设计稿实际颜色 | 详见 `../docs/design-spec.md` | design-reference.pptx |

### 仓库结构

```
ppt-master-main/
├── skills/ppt-master/        # 核心 SKILL 包
│   ├── SKILL.md             # 入口文档
│   ├── references/          # 设计参考文档（已学习）
│   ├── scripts/             # 工具脚本
│   └── templates/           # PPT 模板
├── docs/                    # 用户文档
├── projects/                # 示例项目
└── README.md
```

### 不会复制到我们项目

- 不复制 SKILL.md 内容到我们的代码
- 不复制模板（这些是 .pptx，我们的目标是 HTML）
- 只学习设计思想

### 相关学习笔记

- Plan → Do · Check · Act 工作流 ✅
- Canvas 16:9 字号体系 ✅
- 设计稿颜色提取 ✅
