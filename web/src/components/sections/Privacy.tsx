import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const uploadItems = [
  "4 个总分",
  "22 个子维度",
  "角色",
  "桌面环境",
  "MBTI（可选）",
] as const;

const privateItems = [
  "CLAUDE.md 全文",
  "MEMORY.md 内容",
  "git commit 内容",
  "skill 名称列表",
  "项目路径",
] as const;

const promises = [
  "🔒 本地优先 — 所有原始数据在你的电脑处理",
  "🚫 不二次使用 — 数据只用于生成报告，绝不用于训练 AI / 卖广告",
  "🗑️ 一键删除 — damc.ai/account/delete 立即清空所有数据",
] as const;

export function Privacy(): React.ReactNode {
  return (
    <section
      id="privacy"
      className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            🔒 你的数据，你的电脑
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            原始内容永远不离开你的本地。
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <DataCard title="上传 ✅" items={uploadItems} note="都是数字" />
          <DataCard title="永不上传 ❌" items={privateItems} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {promises.map((promise) => (
            <Badge
              key={promise}
              variant="outline"
              className="max-w-full border-white/12 bg-white/[0.055] px-3 py-1.5 text-left text-sm leading-6 text-white/80 backdrop-blur"
            >
              {promise}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

interface DataCardProps {
  title: string;
  items: readonly string[];
  note?: string;
}

function DataCard({ title, items, note }: DataCardProps): React.ReactNode {
  return (
    <Card className="border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        {note ? <p className="text-sm text-cyan-100/70">{note}</p> : null}
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-white/10 rounded-md border border-white/10">
          {items.map((item) => (
            <li
              key={item}
              className="flex min-h-12 items-center px-4 text-sm text-white/72"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
