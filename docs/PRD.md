# DAMC 平台 PRD（产品需求文档）

> 项目代号：DAMC.ai — Agent 时代个人能力测评平台
> 版本：v0.1 (MVP)
> 日期：2026-05-06
> 负责人：Jayden Huang

## 1. 产品定位

### 一句话
**给 Agent 时代的每个人做一次「能力体检」，告诉你哪里强、哪里危、下一步怎么走。**

### 解决的问题
- 焦虑型用户：不知道自己会不会被 AI 取代
- 进取型用户：知道焦虑但不知道往哪发力
- 管理者：不知道团队成员谁能跟上 AI 转型

### 我们不是
- ❌ AI 课程平台
- ❌ 招聘网站
- ❌ 心灵鸡汤
- ✅ 一面镜子 + 一份地图 + 一个教练

## 2. 用户画像

### Persona 1：焦虑型小白（70% 流量来源）
- 30+ 岁，前端/PM/运营
- 听说"程序员要被 AI 取代了"，焦虑但没行动
- 入口：小红书/推特看到 DAMC 报告分享
- 转化路径：好奇心驱动 → 装 skill → 看部分报告 → 付 $9.99 解锁

### Persona 2：进取型 Builder（20% 流量，付费率最高）
- 已经在用 Claude Code / Cursor / Copilot
- 想知道自己 AI 水平的客观坐标
- 入口：vercel-labs/skills 收录页 / GitHub trending
- 转化路径：自我认知 → 解锁 → 订阅 Coach

### Persona 3：团队管理者（10% 流量，客单价最高）
- 技术 Lead / CTO / 产品总监
- 想评估团队 AI 能力分布、决定培训方向
- 入口：B2B 内容营销 / 推荐
- 转化路径：自己测 → 团队订阅 $99/月

## 3. MVP 范围（2 周）

### ✅ MVP 必做
- damc.ai Landing Page（中文为主，预留英文切换）
- Skill 端：扫描完上传分数到 API，生成 short token，输出跳转链接
- 平台端：通过 token 查看部分报告（4 维总分 + 画像名 + Top 1 风险）
- Stripe 一次性付款 $9.99 解锁完整 HTML 报告
- 隐私政策页 + 数据删除接口

### ⏳ MVP 之后（v0.2，第 3-4 周）
- AI Coach 对话界面（订阅 $29/月）
- 复测追踪 + 增长曲线
- 用户账号系统（Supabase Auth）

### 🚀 v1.0（第 2 个月）
- 团队版 $99/月
- Skill marketplace 抽佣
- 同行匿名对标

## 4. 阶梯定价（Path C）

| 层级 | 价格 | 包含 | 目标转化率 |
|------|------|------|-----------|
| **Free** | $0 | 终端部分报告 + 4 维总分 + 画像名 + Top 1 风险 | 100% (钩子) |
| **Insight** | **$9.99 一次性** | 完整 HTML 报告 + 22 子维度 + 可蒸馏清单 + 护城河识别 + 行动建议 | 8-15% |
| **Coach** | **$29/月** | Insight + AI Coach 个性化 90 天计划 + 周复盘 + 月度复测 | 1-3% |
| **Team** | **$99/月** | Coach + 团队仪表板（最多 10 人）+ 季度团队报告 | 0.3-0.5% |

### 定价心理学
- Free → Insight 跨度大（吊胃口）
- Insight → Coach 是 3 倍价但月度（订阅锁定）
- Team 是 Coach 3.4 倍但能 cover 10 人（B2B 决策容易）

### 转化漏斗目标
```
1000 终端用户
  → 800 跳转平台（80% 跳转率）
  → 80 解锁 $9.99（10% 转化）
  → 16 升级 Coach（20% 复购）
  → 2 升级 Team（13%）

预期月 GMV（1k MAU）:
  $9.99 × 80 = $799
  $29 × 16 = $464
  $99 × 2 = $198
  合计 ≈ $1,461 / 月

10x 增长（10k MAU）→ $14,610 / 月
```

## 5. Landing Page 内容大纲

### Section 1: Hero
- **主标题**：你的 Agent 体检报告
- **副标题**：在 AI 时代，看清你的真实坐标
- **CTA**：立即免费体检 → `npx skills add` 一键安装命令复制按钮
- **视觉**：4 维雷达 + 跳动数字 + 暗色科技

### Section 2: 痛点共鸣
> "你不是怕被 AI 取代，是不知道自己在哪。"
> 95% 的人对自己 AI 时代的位置一无所知。

3 列卡片：
- 🤔 我是焦虑还是太自信？
- 🎯 我哪些能力是护城河？
- 🚀 下一步该学什么？

### Section 3: DAMC 4 维度
4 个卡片，每个有图标 + 一句话 + 评估示例：
- **D** Distillation 蒸馏价值
- **A** Anti-Distillation 抗蒸馏指数
- **M** AI Mastery AI 驾驭能力
- **C** Career Compass 职业适配

### Section 4: 8 种 AI 时代画像
3x3 九宫格（中央放 DAMC logo）：
🏆 AI架构师 / 🛠️ AI工匠 / 🧭 AI引路人 / 🎨 创意原住民 / 📚 经验沉淀者 / 🚀 AI早期玩家 / 🌱 待觉醒者 / ⚠️ 高危区

### Section 5: 报告样张
用 ~/Desktop/damc-images/cover.png 作为预览，配文："这是你将看到的 — 完整的 4 维分析 + 22 子维度 + 可蒸馏清单"

### Section 6: 体检流程（3 步）
1. 装 Skill `npx skills add Jayden72Huang/damc-skill`
2. 终端输入 `/damc` 触发自动扫描
3. 跳转 damc.ai 解锁完整报告

### Section 7: 阶梯定价
4 列卡片（Free / Insight / Coach / Team）+ 价格 + 功能对比 + CTA

### Section 8: AI Coach 介绍（订阅亮点）
- 不止是报告，而是持续陪伴
- AI 知道你的 DAMC 画像，每周自动复测
- 90 天能力强化路径
- 截图：Coach 对话样张

### Section 9: 隐私承诺（信任锚点）
**核心承诺**：你的 .claude/ 原始内容永远留在你的电脑上。

| 上传 ✅ | 永不上传 ❌ |
|---------|------------|
| 4 个维度评分（数字） | CLAUDE.md 全文 |
| 22 个子维度评分（数字） | MEMORY.md 内容 |
| 你填写的角色（如"前端"） | git commit 内容 |
| 桌面环境（macOS/Linux） | skill 名称列表 |
| 你填写的 MBTI（可选） | 项目路径 |

**3 项承诺**：
1. 🔒 本地优先 — 所有原始数据在你的电脑处理
2. 🚫 不二次使用 — 数据只用于生成你的报告，绝不用于训练 AI / 卖广告 / 分享给第三方
3. 🗑️ 一键删除 — 任何时候 `damc.ai/account/delete` 一键清空

### Section 10: FAQ
- Skill 是免费的吗？→ 是
- 不付费能看到什么？→ 4 维总分 + 画像 + Top 1 风险
- 报告每次会变吗？→ 会，配置越好分越高
- 数据安全吗？→ 见隐私承诺
- 支持中文吗？→ 全中文界面和报告
- 怎么取消订阅？→ 一键取消，不留尾巴

### Section 11: 最终 CTA
**"准备好看到真实的自己了吗？"**
[立即免费体检] [查看示例报告]

## 6. 技术栈

见 `ARCHITECTURE.md` Section 3。

## 7. 2 周实施计划

### Week 1：MVP Landing + Skill 改造

| Day | 任务 | 负责 |
|-----|------|------|
| D1 | ✅ 架构 + PRD + 落地页脚手架 | Claude + Codex |
| D2 | 完成 Landing 全部 sections + 响应式 | Codex 主力 |
| D3 | Skill 改造：上传分数 + 输出 token URL | Claude |
| D4 | Supabase 建表 + API Routes（POST /api/scan） | Codex |
| D5 | 报告查看页 /r/[token]（部分预览） | Codex |
| D6 | Stripe 集成 + webhook + 解锁逻辑 | Codex |
| D7 | 端到端测试 + bug fix | Claude + Codex |

### Week 2：上线 + 启动

| Day | 任务 | 负责 |
|-----|------|------|
| D8 | 注册 damc.ai 域名 + Vercel 部署 | 用户 |
| D9 | 隐私政策 + 服务条款页 | Claude |
| D10 | 邮件模板（Resend）+ 删除接口 | Codex |
| D11 | 小红书 + 推特发图启动（用之前 3 张图） | 用户 |
| D12 | vercel-labs/skills issue 跟进 + 收录推动 | Claude |
| D13 | 首批用户反馈收集 + 紧急 fix | 全员 |
| D14 | 复盘 + v0.2 规划（AI Coach） | Claude |

## 8. 成功指标（KPI）

### Week 2 终点目标
- 100+ 终端 skill 安装
- 50+ 平台访问
- 5+ 付费 $9.99 解锁
- 1+ Coach 订阅

### Month 1 目标
- 1,000+ 安装
- 500+ 平台访问
- 50+ 解锁
- 10+ Coach 订阅
- $1,000+ MRR

### Month 3 目标
- 10,000+ 安装
- 1,000+ Coach 订阅
- $30,000+ MRR
- vercel-labs/skills 官方收录

## 9. 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|-----|------|------|------|
| 用户白嫖（本地存完整 HTML） | 高 | 高 | Skill 端只生成 LITE 版，完整版必须在平台 |
| 一次性消费无复购 | 中 | 中 | "复测涨分"机制 + AI Coach 订阅 |
| 隐私质疑被骂 | 中 | 高 | 明显的隐私承诺 section + 开源 skill 代码 |
| Skills.sh 不收录 | 低 | 低 | GitHub 直装本身就够用 |
| 域名 damc.ai 被注册 | 高 | 中 | 备选：getdamc.com / damc.dev |

## 10. 法律 / 合规

- 隐私政策：明示数据收集范围、用途、保留期限、删除流程
- 服务条款：免责声明（评分仅供参考）、退款政策（7 天无理由）
- GDPR：数据导出 + 删除接口
- 中国大陆访问：暂不主动合规备案，海外服务为主

---

## 附录 A：Skill 端改造清单

```
原 SKILL.md：
- 扫描 → 计算分数 → 生成本地完整 HTML

新 SKILL.md：
- 扫描 → 计算分数
- 隐私确认弹窗
- POST 分数到 https://damc.ai/api/scan
- 接收 token
- 终端显示：
  ┌─────────────────────────────────────┐
  │ 📊 你的 Agent 体检 · 部分结果       │
  │                                     │
  │  D ████████░░ 78  M █████████░ 85   │
  │  A ██████░░░░ 62  C ██████░░░░ 65   │
  │                                     │
  │  画像：🏆 AI 架构师                 │
  │                                     │
  │  ⚠️ Top 风险：                      │
  │  你的 [跨域思维] 评分较低           │
  │                                     │
  │  🔓 解锁完整分析 + 22 子维度 +     │
  │     可蒸馏清单 + 90 天行动路径：   │
  │                                     │
  │  https://damc.ai/r/aB7xK9           │
  └─────────────────────────────────────┘
```

## 附录 B：API 接口设计

```typescript
// POST /api/scan
// Body: { scores, archetype, role, env, mbti? }
// Response: { token, url }

// GET /api/report/:token
// Response: { lite: {...}, locked: true }

// POST /api/checkout
// Body: { token, tier }
// Response: { stripe_url }

// POST /api/stripe/webhook
// Stripe → unlock report

// GET /api/report/:token/full
// Auth: report.unlocked === true
// Response: { full: {...} }

// POST /api/coach/chat
// Auth: subscription.active
// Body: { message, history }
// Response: { reply, plan_update? }

// DELETE /api/account
// Auth: user
// Effect: cascade delete all data
```
