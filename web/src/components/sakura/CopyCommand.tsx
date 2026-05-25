"use client";

import { useState, useRef, useEffect } from "react";

interface CopyCommandProps {
  command: string;
  className?: string;
}

export function CopyCommand({
  command,
  className = "",
}: CopyCommandProps): React.ReactNode {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`sk-code-row ${className}`}>
      <code>{command}</code>
      <button
        type="button"
        className="sk-code-copy"
        aria-label={copied ? "已复制" : "复制命令"}
        onClick={handleCopy}
      >
        {copied ? "✓" : "⎘"}
      </button>
    </div>
  );
}
