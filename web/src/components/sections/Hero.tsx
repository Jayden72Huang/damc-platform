import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyCommand } from "@/components/sections/CopyCommand";

const installCommand = "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code";

export function Hero(): React.ReactNode {
  return (
    <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
        <div className="flex flex-col items-start">
          <Badge
            variant="outline"
            className="border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          >
            🧬 Agent 时代的能力测评
          </Badge>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
            你的 Agent
            <span className="block bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
              体检报告
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            在 AI 时代，看清你的真实坐标。一个命令，扫描你的 .claude/
            配置和 git 历史，量化评估 4 个维度。
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-11 bg-gradient-to-r from-[#a855f7] to-[#22d3ee] px-6 text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:opacity-95"
            >
              <a href="#get-started">立即免费体检</a>
            </Button>
            <Button
              asChild
              variant="link"
              className="h-11 justify-start px-0 text-cyan-100 hover:text-white sm:px-2"
            >
              <a href="#archetypes">查看示例报告 →</a>
            </Button>
          </div>

          <CopyCommand command={installCommand} className="mt-4" />
        </div>

        <div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
          <div className="rounded-lg border border-white/15 bg-white/[0.04] p-2 shadow-[0_0_70px_rgba(168,85,247,0.35)] backdrop-blur-xl">
            <Image
              src="/cover.png"
              width={1080}
              height={1350}
              alt="DAMC Agent 体检报告封面"
              priority
              className="h-auto w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
