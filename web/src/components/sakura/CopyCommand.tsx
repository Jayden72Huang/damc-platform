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
    <div
      className={`sk-code-row ${copied ? "sk-code-copied" : ""} ${className}`}
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCopy(); }}
    >
      <code>{command}</code>
      <span className="sk-code-copy" aria-hidden>
        {copied ? "✓ Copied" : "⎘"}
      </span>
    </div>
  );
}
