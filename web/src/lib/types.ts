export type ScoreSubs = Record<string, number>;

export type Scores = {
  D: { total: number; subs?: ScoreSubs };
  A: { total: number; subs?: ScoreSubs };
  M: { total: number; subs?: ScoreSubs };
  C: { total: number; fit?: string; paths?: readonly string[] };
};

export type Insights = {
  distillTargets?: readonly string[];
  moats?: readonly string[];
  risks?: readonly string[];
  actions?: readonly string[];
};

export type ScanSummary = {
  totalSkills?: number;
  customSkills?: number;
  hooksCount?: number;
  mcpServers?: number;
  memoryFiles?: number;
  claudeMdLines?: number;
  aiCommits?: number;
  totalCommits?: number;
};

export type ReportEnv = {
  os?: string;
  shell?: string;
};

export type ReportRow = {
  id: string;
  slug: string;
  user_id: string | null;
  scores: Scores;
  archetype: string;
  archetype_emoji: string | null;
  archetype_code: string | null;
  overall: number | null;
  role: string | null;
  mbti: string | null;
  insights: Insights | null;
  scan_summary: ScanSummary | null;
  env: ReportEnv | null;
  created_at: string;
};
