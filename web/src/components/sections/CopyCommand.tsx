"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyCommandProps {
  command: string;
  className?: string;
}

export function CopyCommand({
  command,
  className,
}: CopyCommandProps): React.ReactNode {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-xl items-center gap-3 overflow-hidden rounded-md border border-white/10 bg-black/35 px-3 py-2 shadow-inner shadow-black/30 backdrop-blur",
        className
      )}
    >
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-xs text-cyan-100 sm:text-sm">
        {command}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 text-cyan-100 hover:bg-white/10 hover:text-white"
        aria-label={copied ? "已复制命令" : "复制命令"}
        onClick={handleCopy}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
