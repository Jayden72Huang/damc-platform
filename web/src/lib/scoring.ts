export function getGrade(overall: number): string {
  if (overall >= 90) return "S";
  if (overall >= 80) return "A";
  if (overall >= 70) return "B";
  if (overall >= 60) return "C";
  if (overall >= 50) return "D";
  return "F";
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    S: "#E5392A",
    A: "#3D9F47",
    B: "#3F8BC4",
    C: "#F0BC2A",
    D: "#E54489",
    F: "#888",
  };
  return colors[grade] ?? "#888";
}

export function getPercentile(
  userScore: number,
  allScores: number[]
): number {
  if (allScores.length === 0) return 100;
  const below = allScores.filter((s) => s < userScore).length;
  return Math.round((below / allScores.length) * 100);
}

export function getPercentileLabel(percentile: number): string {
  if (percentile >= 95) return "Top 5%";
  if (percentile >= 90) return "Top 10%";
  if (percentile >= 80) return "Top 20%";
  if (percentile >= 50) return "Top 50%";
  return `Top ${100 - percentile}%`;
}

export function generateSlug(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let slug = "";
  for (let i = 0; i < 8; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
}
