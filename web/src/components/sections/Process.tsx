import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyCommand } from "@/components/sections/CopyCommand";

const steps = [
  {
    number: "01",
    title: "装 Skill",
    body: "一行命令",
    command: "npx skills add Jayden72Huang/damc-skill",
  },
  {
    number: "02",
    title: "触发扫描",
    body: "在 Claude Code 输入",
    command: "/damc",
  },
  {
    number: "03",
    title: "解锁报告",
    body: "跳转 damc.ai 查看完整分析",
    command: "damc.ai",
  },
] as const;

export function Process(): React.ReactNode {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          30 秒，3 个步骤
        </h2>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <CardHeader>
                <div className="font-[family-name:var(--font-geist-mono)] text-sm text-cyan-200">
                  {step.number}
                </div>
                <CardTitle className="text-xl text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-white/60">{step.body}</p>
                <CopyCommand command={step.command} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
