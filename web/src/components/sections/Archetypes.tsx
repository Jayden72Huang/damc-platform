import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const archetypes = [
  "🏆 AI架构师",
  "🛠️ AI工匠",
  "🧭 AI引路人",
  "🎨 创意原住民",
  "📚 经验沉淀者",
  "🚀 AI早期玩家",
  "🌱 待觉醒者",
  "⚠️ 高危区",
] as const;

export function Archetypes(): React.ReactNode {
  return (
    <section
      id="archetypes"
      className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          8 种画像，你是哪一种？
        </h2>

        <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-white/15 bg-white/[0.04] p-2 shadow-[0_0_64px_rgba(34,211,238,0.2)] backdrop-blur-xl">
          <Image
            src="/archetypes.png"
            width={1080}
            height={1080}
            alt="DAMC 的 8 种 AI 时代画像"
            className="h-auto w-full rounded-md object-cover"
          />
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2">
          {archetypes.map((archetype) => (
            <Badge
              key={archetype}
              variant="outline"
              className="border-white/12 bg-white/[0.055] px-3 py-1.5 text-sm text-white/82 backdrop-blur"
            >
              {archetype}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
