# DAMC.ai Platform

> Agent 时代的能力测评平台 — Skill 端是钩子，Web 是变现层。

## 仓库结构

```
damc-platform/
├── docs/
│   ├── ARCHITECTURE.md   # 系统架构（含 6 张 Mermaid 图）
│   └── PRD.md            # 产品需求 + 2 周实施计划 + KPI
└── web/                  # Next.js 16 落地页
    ├── src/app/page.tsx
    ├── src/components/sections/
    └── public/
```

## 关联仓库

- **Skill (CLI 钩子)**：[Jayden72Huang/damc-skill](https://github.com/Jayden72Huang/damc-skill)
- **Web 平台 (本仓库)**：解锁完整 Agent 体检报告 + AI Coach 订阅

## 阶梯定价（Path C）

| 层 | 价格 | 包含 |
|----|------|------|
| **Free** | $0 | 终端 4 维总分 + 画像名 + Top 1 风险 |
| **Insight** | $9.99 一次 | 完整 HTML 报告 + 22 子维度 + 可蒸馏清单 |
| **Coach** ⭐ | $29/月 | Insight + AI Coach + 周复盘 + 月度复测 |
| **Team** | $99/月 | Coach + 团队仪表板（10 人） |

## 隐私承诺

原始内容永不离开本地。仅上传评分数字。详见 [ARCHITECTURE.md](docs/ARCHITECTURE.md#5-隐私架构)。

## 本地开发

```bash
cd web
npm install
npm run dev    # http://localhost:3002
```

## License

MIT
