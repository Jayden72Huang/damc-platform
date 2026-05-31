import { Button } from "@/components/ui/button";
import { CopyCommand } from "@/components/sections/CopyCommand";

const installCommand = "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code";

export function FinalCTA(): React.ReactNode {
  return (
    <section id="get-started" className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
          准备好看到真实的自己了吗？
        </h2>

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-11 bg-gradient-to-r from-[#a855f7] to-[#22d3ee] px-7 text-white shadow-[0_0_32px_rgba(168,85,247,0.34)] hover:opacity-95"
          >
            <a href="#pricing">立即免费体检</a>
          </Button>
        </div>

        <CopyCommand command={installCommand} className="mx-auto mt-5" />
      </div>
    </section>
  );
}
