"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  userImage: string | null;
  overall: number;
  grade: string;
  percentileLabel: string;
  archetype: string;
  archetypeEmoji: string | null;
  scores: Record<string, number>;
  createdAt: string;
}

export function LeaderboardTable(): React.ReactNode {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((json) => {
        setData(json.leaderboard ?? []);
        setTotal(json.total ?? 0);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.4 }}>
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="sk-lb-empty">
        <div className="sk-lb-empty-icon">🏆</div>
        <p>还没有人完成 DAMC 扫描</p>
        <p style={{ fontSize: 13, opacity: 0.5 }}>
          运行 <code>/damc</code> 成为第一个上榜的人！
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="sk-lb-meta">
        <span>共 {total} 位参与者</span>
      </div>
      <div className="sk-lb-table">
        <div className="sk-lb-head">
          <span className="sk-lb-col-rank">#</span>
          <span className="sk-lb-col-user">User</span>
          <span className="sk-lb-col-arch">Archetype</span>
          <span className="sk-lb-col-d">D</span>
          <span className="sk-lb-col-a">A</span>
          <span className="sk-lb-col-m">M</span>
          <span className="sk-lb-col-c">C</span>
          <span className="sk-lb-col-score">Score</span>
          <span className="sk-lb-col-grade">Grade</span>
        </div>
        {data.map((entry) => {
          const s = entry.scores as Record<string, number> | null;
          return (
            <div className="sk-lb-row" key={entry.rank}>
              <span className="sk-lb-col-rank sk-lb-rank">
                {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
              </span>
              <span className="sk-lb-col-user sk-lb-user">
                {entry.userImage ? (
                  <img
                    src={entry.userImage}
                    alt=""
                    className="sk-lb-avatar"
                  />
                ) : null}
                {entry.userName}
              </span>
              <span className="sk-lb-col-arch sk-lb-arch">
                {entry.archetypeEmoji} {entry.archetype}
              </span>
              <span className="sk-lb-col-d sk-color-d">{s?.D ?? "-"}</span>
              <span className="sk-lb-col-a sk-color-a">{s?.A ?? "-"}</span>
              <span className="sk-lb-col-m sk-color-m">{s?.M ?? "-"}</span>
              <span className="sk-lb-col-c sk-color-c">{s?.C ?? "-"}</span>
              <span className="sk-lb-col-score sk-lb-score">
                {entry.overall}
              </span>
              <span className="sk-lb-col-grade">
                <span className="sk-lb-grade">{entry.grade}</span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
