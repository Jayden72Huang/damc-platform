import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free 体验",
    price: "$0",
    label: "",
    features: ["终端 4 维总分", "画像名", "Top 1 风险提示"],
    cta: "免费开始",
    highlighted: false,
  },
  {
    name: "Insight 完整报告",
    price: "$9.99",
    label: "一次性",
    features: [
      "Free 全部内容",
      "22 子维度",
      "可蒸馏清单",
      "护城河识别",
      "90 天行动建议",
    ],
    cta: "解锁报告",
    highlighted: false,
  },
  {
    name: "Coach 持续陪伴",
    price: "$29",
    label: "/月 ⭐推荐",
    features: [
      "Insight 全部内容",
      "AI Coach 个性化计划",
      "周复盘",
      "月度复测追踪",
    ],
    cta: "开始订阅",
    highlighted: true,
  },
  {
    name: "Team 团队版",
    price: "$99",
    label: "/月",
    features: ["Coach 全部内容", "团队仪表板（10 人）", "季度团队报告"],
    cta: "联系我们",
    highlighted: false,
  },
] as const;

export function Pricing(): React.ReactNode {
  return (
    <section
      id="pricing"
      className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            选择你的路径
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            从一次性体检到持续教练，按需选择
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: (typeof tiers)[number];
}

function PricingCard({ tier }: PricingCardProps): React.ReactNode {
  const card = (
    <Card
      className={cn(
        "h-full border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl",
        tier.highlighted &&
          "border-transparent bg-[#140b24]/95 shadow-[0_0_46px_rgba(168,85,247,0.32)]"
      )}
    >
      <CardHeader>
        <div className="flex min-h-7 items-center justify-between gap-3">
          <CardTitle className="text-lg text-white">{tier.name}</CardTitle>
          {tier.label ? (
            <Badge
              variant="outline"
              className={cn(
                "border-white/12 bg-white/[0.06] text-white/76",
                tier.highlighted && "border-fuchsia-300/40 bg-fuchsia-300/12 text-fuchsia-100"
              )}
            >
              {tier.label}
            </Badge>
          ) : null}
        </div>
        <div className="pt-3">
          <span className="font-[family-name:var(--font-geist-mono)] text-4xl font-semibold text-white">
            {tier.price}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-sm leading-6 text-white/66">
          {tier.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className={cn(
            "w-full",
            tier.highlighted
              ? "bg-gradient-to-r from-[#a855f7] to-[#22d3ee] text-white shadow-[0_0_24px_rgba(168,85,247,0.32)] hover:opacity-95"
              : "bg-white text-[#0f0f1e] hover:bg-white/90"
          )}
          variant={tier.highlighted ? "default" : "default"}
        >
          <a href={tier.highlighted ? "#coach" : "#get-started"}>{tier.cta}</a>
        </Button>
      </CardFooter>
    </Card>
  );

  if (tier.highlighted) {
    return (
      <div className="rounded-lg bg-gradient-to-br from-[#a855f7] via-[#22d3ee] to-[#a855f7] p-px">
        {card}
      </div>
    );
  }

  return card;
}
