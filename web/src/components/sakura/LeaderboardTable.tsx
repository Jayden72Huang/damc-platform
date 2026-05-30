"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    loginHintBtn: "登录",
    loginHintText: "后可创建团队、用邀请码加入排行组",
    global: "🌐 全球",
    createTitle: "创建团队",
    createTab: "+ 创建",
    joinTitle: "加入团队",
    joinTab: "🔗 加入",
    inviteLabel: "邀请码：",
    copy: "复制",
    shareCmd: "分享命令",
    shareHint1: "发给队友，让他们在自己的 Agent 中运行：",
    shareHint2a: "或者登录 damc.space/leaderboard 点击「🔗 加入」输入邀请码：",
    teamNamePh: "团队名称",
    descPh: "简介（可选）",
    create: "创建",
    invitePh: "邀请码",
    join: "加入",
    failed: "Failed",
    invalidCode: "Invalid code",
    loading: "Loading...",
    emptyTeam: "该团队还没有成员完成 DAMC 扫描",
    emptyGlobal: "还没有人完成 DAMC 扫描",
    emptyHint1: "运行",
    emptyHint2: "成为第一个上榜的人！",
    totalPrefix: "共",
    totalSuffix: "位参与者",
    teamRank: "团队排名",
  },
  en: {
    loginHintBtn: "Sign in",
    loginHintText: "to create a team and join a ranking group with an invite code",
    global: "🌐 Global",
    createTitle: "Create team",
    createTab: "+ Create",
    joinTitle: "Join team",
    joinTab: "🔗 Join",
    inviteLabel: "Invite code:",
    copy: "Copy",
    shareCmd: "Share command",
    shareHint1: "Send this to teammates and have them run it in their Agent:",
    shareHint2a:
      'Or sign in at damc.space/leaderboard, click "🔗 Join", and enter the code:',
    teamNamePh: "Team name",
    descPh: "Description (optional)",
    create: "Create",
    invitePh: "Invite code",
    join: "Join",
    failed: "Failed",
    invalidCode: "Invalid code",
    loading: "Loading...",
    emptyTeam: "No team members have completed a DAMC scan yet",
    emptyGlobal: "Nobody has completed a DAMC scan yet",
    emptyHint1: "Run",
    emptyHint2: "to be the first on the board!",
    totalPrefix: "",
    totalSuffix: "participants",
    teamRank: "Team ranking",
  },
};

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

interface Team {
  teamId: string;
  teamName: string;
  teamSlug: string;
  inviteCode: string;
  role: string;
}

function TeamPanel({
  teams,
  selectedTeam,
  onSelect,
  onRefresh,
  loggedIn,
}: {
  teams: Team[];
  selectedTeam: string | null;
  onSelect: (id: string | null) => void;
  onRefresh: () => void;
  loggedIn: boolean;
}) {
  const { locale } = useLocale();
  const t = COPY[locale];
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showShare, setShowShare] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), description: desc.trim() }),
    });
    if (res.ok) {
      setName("");
      setDesc("");
      setShowCreate(false);
      onRefresh();
    } else {
      const data = await res.json();
      setMsg(data.error || t.failed);
    }
    setBusy(false);
  }

  async function handleJoin() {
    if (!code.trim()) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode: code.trim() }),
    });
    if (res.ok) {
      setCode("");
      setShowJoin(false);
      onRefresh();
    } else {
      const data = await res.json();
      setMsg(data.error || t.invalidCode);
    }
    setBusy(false);
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const activeTeam = teams.find((t) => t.teamId === selectedTeam);

  if (!loggedIn) {
    return (
      <div className="sk-team-panel">
        <div className="sk-team-login-hint">
          <a href="/login" className="sk-team-btn">{t.loginHintBtn}</a>
          <span>{t.loginHintText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="sk-team-panel">
      <div className="sk-team-tabs">
        <button
          type="button"
          className={`sk-team-tab${selectedTeam === null ? " sk-team-tab-active" : ""}`}
          onClick={() => { onSelect(null); setShowShare(null); }}
        >
          {t.global}
        </button>
        {teams.map((t) => (
          <button
            key={t.teamId}
            type="button"
            className={`sk-team-tab${selectedTeam === t.teamId ? " sk-team-tab-active" : ""}`}
            onClick={() => { onSelect(t.teamId); setShowShare(null); }}
          >
            {t.teamName}
          </button>
        ))}
        <button
          type="button"
          className="sk-team-tab sk-team-tab-add"
          onClick={() => { setShowCreate(!showCreate); setShowJoin(false); setShowShare(null); }}
          title={t.createTitle}
        >
          {t.createTab}
        </button>
        <button
          type="button"
          className="sk-team-tab sk-team-tab-add"
          onClick={() => { setShowJoin(!showJoin); setShowCreate(false); setShowShare(null); }}
          title={t.joinTitle}
        >
          {t.joinTab}
        </button>
      </div>

      {activeTeam && selectedTeam && (
        <div className="sk-team-share-bar">
          <span className="sk-team-share-label">{t.inviteLabel}</span>
          <code className="sk-team-invite-code">{activeTeam.inviteCode}</code>
          <button
            type="button"
            className="sk-team-copy-btn"
            onClick={() => copyText(activeTeam.inviteCode)}
          >
            {copied ? "✓" : t.copy}
          </button>
          <button
            type="button"
            className="sk-team-copy-btn"
            onClick={() => setShowShare(showShare ? null : activeTeam.inviteCode)}
          >
            {t.shareCmd}
          </button>
        </div>
      )}

      {showShare && (
        <div className="sk-team-share-cmd">
          <p className="sk-team-share-hint">{t.shareHint1}</p>
          <div className="sk-team-cmd-box">
            <code>{`curl -sL damc.space/api/teams/join -H "Content-Type: application/json" -d '{"inviteCode":"${showShare}"}'`}</code>
          </div>
          <p className="sk-team-share-hint">{t.shareHint2a}<strong>{showShare}</strong></p>
        </div>
      )}

      {showCreate && (
        <div className="sk-team-form">
          <input
            className="sk-team-input"
            placeholder={t.teamNamePh}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="sk-team-input"
            placeholder={t.descPh}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            type="button"
            className="sk-team-btn"
            onClick={handleCreate}
            disabled={busy}
          >
            {busy ? "..." : t.create}
          </button>
          {msg && <span className="sk-team-msg">{msg}</span>}
        </div>
      )}

      {showJoin && (
        <div className="sk-team-form">
          <input
            className="sk-team-input"
            placeholder={t.invitePh}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="button"
            className="sk-team-btn"
            onClick={handleJoin}
            disabled={busy}
          >
            {busy ? "..." : t.join}
          </button>
          {msg && <span className="sk-team-msg">{msg}</span>}
        </div>
      )}
    </div>
  );
}

export function LeaderboardTable(): React.ReactNode {
  const { locale } = useLocale();
  const t = COPY[locale];
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchTeams = useCallback(() => {
    fetch("/api/teams")
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          return res.json();
        }
        setLoggedIn(false);
        return { teams: [] };
      })
      .then((json) => setTeams(json.teams ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    setLoading(true);
    const url = selectedTeam
      ? `/api/leaderboard?teamId=${selectedTeam}`
      : "/api/leaderboard";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.leaderboard ?? []);
        setTotal(json.total ?? 0);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [selectedTeam]);

  return (
    <>
      <TeamPanel
        teams={teams}
        selectedTeam={selectedTeam}
        onSelect={setSelectedTeam}
        onRefresh={fetchTeams}
        loggedIn={loggedIn}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.4 }}>
          {t.loading}
        </div>
      ) : data.length === 0 ? (
        <div className="sk-lb-empty">
          <div className="sk-lb-empty-icon">🏆</div>
          <p>{selectedTeam ? t.emptyTeam : t.emptyGlobal}</p>
          <p style={{ fontSize: 13, opacity: 0.5 }}>
            {t.emptyHint1} <code>/damc</code> {t.emptyHint2}
          </p>
        </div>
      ) : (
        <>
          <div className="sk-lb-meta">
            <span>{t.totalPrefix ? `${t.totalPrefix} ${total} ${t.totalSuffix}` : `${total} ${t.totalSuffix}`}</span>
            {selectedTeam && (
              <span style={{ marginLeft: 12, opacity: 0.5 }}>
                {t.teamRank}
              </span>
            )}
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
                    {entry.rank <= 3
                      ? ["🥇", "🥈", "🥉"][entry.rank - 1]
                      : entry.rank}
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
      )}
    </>
  );
}
