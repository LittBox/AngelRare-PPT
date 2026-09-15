# AngelRare 国创赛网评 PPT

> **AngelRare** - 罕见病科研与准入的嵌入式服务基础设施
> 比赛：国创赛（高教主赛道·本科生组）
> 负责人：郭俨霆（云南大学本科生）
> PPT 页数：**29 页**（与设计参考 PPT 一致）

---

## 📖 项目说明

本项目是一个**两阶段**的 PPT 制作工作流：

1. **第一阶段（当前阶段）**：使用 **Vue 3 + Vite + fullpage.js** 制作 HTML 版的 PPT，支持鼠标滚轮丝滑切换，方便快速调整内容和视觉
2. **第二阶段（HTML 版确认后）**：使用 Puppeteer + 截图（或者 dom-to-pptx）把 HTML 导出为 .pptx 文件

---

## 📂 目录结构

```
AngelRare-网评PPT/
├── README.md                   # 本文档
├── package.json                # 依赖配置
├── vite.config.js              # Vite 构建配置
├── index.html                  # HTML 入口
├── .gitignore                  # Git 忽略配置
│
├── public/                     # Vite 静态资源
│
├── assets/                     # 素材库
│   ├── images/
│   │   ├── cover/              # 封面图
│   │   ├── content/
│   │   │   ├── team-members/   # 团队成员照片（21 张：5 专家 + 16 学生）
│   │   │   ├── field-investigation/   # 团队实践足迹（9 张）
│   │   │   └── extra-materials/      # 其他素材（金粉/边框/光效等 38 张）
│   │   └── icons/
│   │       ├── project-logo.png       # 项目 Logo
│   │       └── slogan.png             # Slogan 手写稿
│   ├── fonts/                  # 字体文件
│   └── data/
│       └── slides.json         # PPT 文案（按页存放，方便统一调整）
│
├── src/                        # 源代码
│   ├── main.js                 # Vue 应用入口
│   ├── App.vue                 # 根组件
│   ├── views/
│   │   └── Presentation.vue    # fullpage 主容器（集成所有 29 页）
│   ├── slide-01/  ~ slide-29/  # 29 页幻灯片，每页独立目录
│   │   └── SlideXxx.vue
│   ├── components/             # 通用组件
│   │   ├── SlidePlaceholder.vue    # 占位组件（备用）
│   │   └── index.js
│   ├── composables/
│   │   └── useFullpage.js      # fullpage.js Vue 3 封装
│   └── styles/
│       ├── reset.css           # 浏览器样式重置
│       ├── variables.css       # CSS 变量（主题色、字体、间距）
│       └── main.css            # 全局样式
│
├── vendor/                     # 第三方参考
│   └── ppt-master/             # ppt-master 仓库（git clone 占位）
│
├── export/                     # 导出目录
│   ├── pptx/                   # 最终 .pptx 文件
│   └── screenshots/            # 导出过程生成的临时截图
│
├── scripts/                    # 工具脚本
│   ├── export-pptx.mjs         # HTML → PNG 截图脚本
│   └── README.md
│
├── docs/                       # 项目文档
│   ├── content-draft.docx      # 文案草稿（原文件）
│   ├── content-draft.txt       # 文案草稿（文本版）
│   ├── slogan-plan.docx        # Slogan 方案（原文件）
│   ├── slogan-plan.txt         # Slogan 方案（文本版）
│   └── design-reference.pptx   # 视觉风格参考 PPT
│
└── node_modules/               # npm 依赖（不提交）
```

---

## 🚀 快速开始

### 1. 安装依赖（已完成）
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 http://localhost:5173，用鼠标滚轮上下滚动即可切换页面（丝滑过渡）。

### 3. 构建生产版本
```bash
npm run build
npm run preview   # http://localhost:4173
```

### 4. 导出 PPTX（HTML 确认后再做）
```bash
npm run export:pptx
```
生成的截图在 `export/screenshots/` 目录下。

---

## 📋 29 页 PPT 结构

| 页码 | 主题 | 类型 | 章节 |
|------|------|------|------|
| 01 | AngelRare 封面 | 封面 | — |
| 02 | 目录（四章节） | 目录 | — |
| 03 | 个人成长 | 章节扉页 | 01 个人成长 |
| 04 | 故事引入（患者案例） | 内容 | 01 |
| 05 | 国家政策（罕见病目录） | 内容 | 01 |
| 06 | 先期想法（项目立项） | 内容 | 01 |
| 07 | 实践足迹（时间线） | 内容 | 01 |
| 08 | 产品迭代 1.0-5.0 | 内容 | 01 |
| 09 | 项目创新 | 章节扉页 | 02 项目创新 |
| 10 | 平台介绍（总览） | 内容 | 02 |
| 11 | 平台介绍（详细） | 内容 | 02 |
| 12 | SR + DP Agent | 内容 | 02 |
| 13 | **ArguLoop 论辩机制** | 核心创新 | 02 |
| 14 | 实验结果（模型对比） | 内容 | 02 |
| 15 | MedBrowseComp 测评 | 内容 | 02 |
| 16 | 产业价值 | 章节扉页 | 03 产业价值 |
| 17 | 商业模式（数据飞轮） | 内容 | 03 |
| 18 | 竞品分析 | 内容 | 03 |
| 19 | 收入模型 | 内容 | 03 |
| 20 | 财务分析 | 内容 | 03 |
| 21 | 团队协作 | 章节扉页 | 04 团队协作 |
| 22 | 核心成员介绍 | 内容 | 04 |
| 23 | 团队结构与分工 | 内容 | 04 |
| 24 | 指导老师 + 医学专家 | 内容 | 04 |
| 25 | 技术顾问 | 内容 | 04 |
| 26 | 已有成果 | 内容 | 04 |
| 27 | 社会效益 | 内容 | 04 |
| 28 | 愿景规划 | 内容 | 04 |
| 29 | 故事结尾（结束语） | 结尾 | 04 |

---

## 🎨 设计规范

详细的设计规范在：
- `src/styles/variables.css`（CSS 变量定义：颜色、字号、间距、动画）
- 当前默认配色：**科技蓝 + 青色高亮 + 深色背景**（待设计稿进一步确认）

---

## 🛠 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| Vue 3 | 前端框架 | ^3.5.13 |
| Vite | 构建工具 | ^6.0.7 |
| fullpage.js | 丝滑全屏滚动 | ^4.0.1 |
| vue-router | 路由（可选） | ^4.5.0 |
| dom-to-pptx | HTML → PPTX 导出（备用） | ^2.1.2 |
| puppeteer | 浏览器自动化 | ^24.1.1 |

---

## 💡 项目笔记

- **项目名称来源**：AngelRare = Angel（天使）+ Rare（罕见），寓意"为罕见病患者带来希望"
- **核心创新点**：ArguLoop 动态论辩机制 + 贝叶斯仲裁器
- **目标比赛**：国创赛网评阶段，需要在限定时间内完整呈现项目全貌

---

## 📋 待办事项

- [x] 规划项目目录结构
- [x] 收集所有素材到工作目录
- [x] 读取并理解文案草稿
- [x] 读取并理解设计参考 PPT
- [x] 初始化 Vue 项目基础框架
- [x] 配置 fullpage.js 实现丝滑滚动
- [x] 创建设计规范的 CSS 变量和全局样式
- [x] 制作全部 29 页 PPT 内容
- [ ] 用户对每页视觉效果对齐调整
- [ ] 实验数据图提供后填入对应页（slide-14）
- [ ] 用户确认后用 dom-to-pptx 导出 .pptx
