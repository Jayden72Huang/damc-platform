# DAMC 平台架构设计

> 终端 Skill 是钩子，平台是变现层。
> 用户在 CLI 看到部分数据，付费在 Web 解锁完整 Agent 体检报告。

## 1. 系统全景图

```mermaid
graph TB
    subgraph User["👤 用户本地环境"]
        CLI[Claude Code CLI]
        Skill[damc Skill]
        LocalEnv[~/.claude/<br/>git history<br/>开发工具]
    end

    subgraph Platform["☁️ damc.ai 平台"]
        API[Next.js API Routes]
        Web[Next.js App<br/>Landing + Report Viewer]
        Coach[AI Coach<br/>Claude API]
    end

    subgraph Data["💾 数据层"]
        Supabase[(Supabase<br/>users / reports / scans)]
        Stripe[Stripe<br/>订阅/一次性支付]
    end

    subgraph Trust["🔒 隐私边界"]
        Hash[本地匿名化<br/>只上传聚合分数]
    end

    LocalEnv --> Skill
    Skill --> Hash
    Hash -->|HTTPS POST<br/>仅评分数据| API
    API --> Supabase
    API -->|生成 token| Skill
    Skill -->|terminal 显示<br/>+ 跳转链接| CLI

    CLI -.用户点击.-> Web
    Web -->|查看部分| Supabase
    Web -->|付费| Stripe
    Stripe -->|webhook| API
    API -->|解锁| Web
    Web --> Coach
    Coach --> Supabase

    style Trust fill:#1a1a2e,stroke:#a855f7,color:#fff
    style Hash fill:#0f0f1e,stroke:#22d3ee,color:#fff
```

## 2. 数据流（核心三步）

### Step 1：本地扫描（永远本地，不上云）

```mermaid
sequenceDiagram
    participant U as 用户
    participant S as damc Skill
    participant L as 本地文件系统
    participant API as damc.ai API

    U->>S: /damc 触发
    S->>U: 隐私确认弹窗：<br/>"将分析 .claude/ 配置生成评分，<br/>仅评分数字会上传，原始内容永不离开本地"
    U->>S: 同意 ✓
    S->>L: 扫描 ~/.claude/ + git log
    L-->>S: 原始数据（本地处理）
    S->>S: 计算 4 维评分
    S->>API: POST 仅 4 维分数 + 子维度数字 + 角色画像
    Note over S,API: ❌ 不上传：CLAUDE.md 原文<br/>❌ 不上传：commit message<br/>❌ 不上传：MEMORY.md 内容<br/>✅ 只上传：D=78, A=62, M=85, C=65 等数字
    API-->>S: 返回 report_token
    S-->>U: 终端显示部分 + URL：<br/>https://damc.ai/r/{token}
```

### Step 2：用户跳转平台查看

```mermaid
sequenceDiagram
    participant U as 用户
    participant W as damc.ai Web
    participant DB as Supabase
    participant ST as Stripe

    U->>W: 打开 /r/{token}
    W->>DB: 查 report by token
    DB-->>W: 部分数据 (free tier)
    W->>U: 显示锁定预览：<br/>4 维总分 + 画像名 + 付费解锁按钮

    U->>W: 点击 $9.99 解锁
    W->>ST: 创建 checkout session
    ST-->>U: Stripe 支付页
    U->>ST: 付款
    ST->>W: webhook /api/stripe/webhook
    W->>DB: report.unlocked = true
    W->>U: 跳回 /r/{token}/full
    W->>U: 显示完整报告
```

### Step 3：AI Coach 持续陪伴（订阅用户）

```mermaid
sequenceDiagram
    participant U as 用户
    participant W as damc.ai
    participant C as AI Coach<br/>(Claude API)
    participant S as 本地 Skill

    U->>W: 订阅 $29/月
    W->>C: 初始化 Coach<br/>(传入用户 DAMC 画像)
    C->>U: "我看到你 M 分 85 但 D 分只有 60，<br/>意味着你很会用 AI 但还没把经验沉淀。<br/>聊聊你最熟悉的 3 个领域？"

    loop 每周自动复测
        W->>S: 通知 user 复测
        S->>S: 重新扫描 .claude/
        S->>W: 上传新分数
        W->>C: 对比上周变化
        C->>U: "本周你装了 3 个 skill，M +5，<br/>下一步建议把你那个 SEO 方法论做成 skill"
    end
```

## 3. 技术栈

| 层 | 技术 | 原因 |
|---|------|------|
| **Skill (CLI)** | Markdown + Bash + Python | 已有，零依赖 |
| **平台前端** | Next.js 14 App Router + Tailwind v4 + ShadCN UI | 用户已熟悉 |
| **平台后端** | Next.js API Routes | 同源部署，简单 |
| **数据库** | Supabase (Postgres) | 自带 Auth、RLS、Realtime |
| **支付** | Stripe Checkout + Webhooks | 国际化、订阅管理 |
| **AI Coach** | Anthropic Claude API (claude-sonnet-4-6) | 性价比最高，对话质量足够 |
| **部署** | Vercel | Next.js 最优 |
| **域名** | damc.ai (待注册) | 短、记得住 |
| **邮件** | Resend | 简单、便宜 |
| **分析** | Plausible / PostHog | 隐私友好 |

## 4. 数据库 Schema

```sql
-- 用户（Supabase Auth 自动管理）
users (id, email, created_at, ...)

-- 一次扫描的报告
reports (
  id           uuid PRIMARY KEY,
  token        text UNIQUE NOT NULL,         -- 短 URL token (如 'a7Bx9K')
  user_id      uuid REFERENCES users(id),    -- 可空（匿名扫描）
  scores       jsonb NOT NULL,               -- {D, A, M, C, subs}
  archetype    text,                          -- "AI架构师"
  role         text,                          -- 用户回答的角色
  unlocked     boolean DEFAULT false,         -- 是否已付费解锁
  unlock_tier  text,                          -- 'one_time' / 'coach' / 'team'
  created_at   timestamp DEFAULT now()
);

-- 订阅记录
subscriptions (
  id              uuid PRIMARY KEY,
  user_id         uuid REFERENCES users(id),
  stripe_sub_id   text,
  tier            text,                       -- 'coach' / 'team'
  status          text,                       -- 'active' / 'cancelled'
  current_period_end timestamp
);

-- AI Coach 对话历史
coach_sessions (
  id          uuid PRIMARY KEY,
  user_id     uuid REFERENCES users(id),
  messages    jsonb,                          -- chat history
  plan        jsonb,                          -- 90-day plan
  created_at  timestamp DEFAULT now()
);

-- 复测追踪
scan_history (
  id          uuid PRIMARY KEY,
  user_id     uuid REFERENCES users(id),
  scores      jsonb,
  scanned_at  timestamp DEFAULT now()
);
```

## 5. 隐私架构（核心信任承诺）

```mermaid
flowchart LR
    A[~/.claude/ 原始内容] -->|本地扫描<br/>本地计算| B[评分数字]
    B -->|HTTPS| C[damc.ai 服务器]
    A -.->|❌ 永远不传输| C

    style A fill:#1a1a2e,stroke:#22d3ee
    style B fill:#1a1a2e,stroke:#a855f7
    style C fill:#1a1a2e,stroke:#10b981
```

### 上传白名单（明示用户）

| 上传 ✅ | 不上传 ❌ |
|---------|----------|
| 4 个总分 (D/A/M/C) | CLAUDE.md 全文 |
| 22 个子维度评分 | MEMORY.md 内容 |
| 用户填的角色（"前端"） | git commit message |
| 用户填的 MBTI（可选） | skill 名字列表 |
| 桌面环境（macOS/Linux） | 项目路径 |
| Skill 总数（数字） | 邮箱（除非主动注册） |

### 三道防线

1. **本地优先**：所有原始数据在用户机器处理
2. **数字化**：上传只是评分（不可逆推原文）
3. **可删除**：用户可一键删除所有数据 `damc.ai/account/delete`

## 6. 部署拓扑

```mermaid
graph LR
    User -->|HTTPS| Vercel[Vercel Edge<br/>damc.ai]
    Vercel -->|API| SupabaseAPI[Supabase<br/>Singapore region]
    Vercel -->|webhook| Stripe[Stripe API]
    Vercel -->|API call| Anthropic[Anthropic API]
    Vercel -->|SMTP| Resend[Resend]

    style Vercel fill:#000,color:#fff
```

## 7. 安全要点

- API Routes 全部经过 Supabase RLS（Row Level Security）
- Skill 上传走带签名的 short-lived token
- Stripe webhook 签名验证
- 用户数据加密存储（Supabase 自带）
- 删除请求 24h 内执行（GDPR 合规）

---

**下一步**：见 `PRD.md` 的 2 周实施计划。
