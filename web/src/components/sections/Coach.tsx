import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bullets = [
  "知道你的 DAMC 画像，对话有上下文",
  "每周自动重扫你的环境，量化你的进步",
  "90 天能力强化路径，每周可执行任务",
  "用 Claude Sonnet 4.6，对话质量到位",
] as const;

export function Coach(): React.ReactNode {
  return (
    <section id="coach" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)]">
        <div>
          <p className="text-sm font-medium uppercase text-cyan-200">
            AI Coach
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
            不是一份报告，是一个 24/7 的 AI 教练
          </h2>

          <ul className="mt-8 space-y-4 text-base leading-7 text-white/70">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-cyan-200" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-white/10 bg-white/[0.045] shadow-[0_0_52px_rgba(34,211,238,0.16)] backdrop-blur-xl">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#a855f7]" />
              <span className="size-2.5 rounded-full bg-[#22d3ee]" />
              <span className="size-2.5 rounded-full bg-white/40" />
            </div>
            <CardTitle className="pt-3 text-base text-white">
              DAMC Coach
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border border-cyan-300/18 bg-cyan-300/[0.07] p-5 text-sm leading-7 text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.1)]">
              我看到你 M 分这周 +5 了，说明你装的那 3 个 skill
              已经在用了。下一步建议把你那个 SEO 方法论做成 skill —
              你的 D 分还有空间。
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
