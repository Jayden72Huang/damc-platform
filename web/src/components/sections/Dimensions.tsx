import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dimensions = [
  {
    letter: "D",
    name: "Distillation Value",
    title: "蒸馏价值",
    copy: "你的经验值得做成 Skill 吗？",
  },
  {
    letter: "A",
    name: "Anti-Distillation",
    title: "抗蒸馏指数",
    copy: "AI 拿不走的能力有哪些？",
  },
  {
    letter: "M",
    name: "AI Mastery",
    title: "AI 驾驭能力",
    copy: "你用 AI 工具的水平如何？",
  },
  {
    letter: "C",
    name: "Career Compass",
    title: "职业适配",
    copy: "你应该往哪个方向走？",
  },
] as const;

export function Dimensions(): React.ReactNode {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase text-cyan-200">
            DAMC Framework
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            4 个维度，看清全貌
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dimensions.map((dimension) => (
            <Card
              key={dimension.letter}
              className="border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <CardHeader className="px-4 sm:px-6">
                <div className="flex size-11 items-center justify-center rounded-md border border-fuchsia-300/30 bg-fuchsia-300/10 font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-fuchsia-100 shadow-[0_0_24px_rgba(168,85,247,0.22)]">
                  {dimension.letter}
                </div>
                <CardTitle className="pt-2 text-base leading-6 text-white sm:text-lg">
                  {dimension.name}
                  <span className="block text-sm font-normal text-cyan-100/70">
                    {dimension.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 text-sm leading-6 text-white/62 sm:px-6">
                {dimension.copy}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
