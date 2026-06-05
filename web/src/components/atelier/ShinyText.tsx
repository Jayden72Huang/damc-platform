"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
};

export function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className,
}: Props): ReactNode {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  const animationName =
    direction === "right" ? "shiny-text-right" : "shiny-text-left";

  const style = {
    "--shiny-color": color,
    "--shiny-shine": shineColor,
    "--shiny-spread": `${spread}px`,
    "--shiny-speed": `${speed}s`,
    "--shiny-delay": `${delay}s`,
    "--shiny-direction-mode": yoyo ? "alternate" : "normal",
    animationName,
  } as CSSProperties;

  const classes = [
    "atelier-shiny",
    pauseOnHover ? "atelier-shiny-pause" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} style={style}>
      {text}
    </span>
  );
}
