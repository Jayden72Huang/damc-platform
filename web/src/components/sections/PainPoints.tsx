import { Card, CardContent } from "@/components/ui/card";

const painPoints = [
  "🤔 我是焦虑还是太自信？",
  "🎯 我的能力护城河在哪？",
  "🚀 下一步该学什么？",
] as const;

export function PainPoints(): React.ReactNode {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl lg:text-5xl">
            你不是怕被 AI 取代，而是不知道自己在哪。
          </p>
          <p className="mt-5 text-base text-white/60 sm:text-lg">
            95% 的人对自己 Agent 时代的位置一无所知。
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {painPoints.map((item) => (
            <Card
              key={item}
              className="border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <CardContent className="px-5 text-center text-lg font-medium text-white sm:px-6">
                {item}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
