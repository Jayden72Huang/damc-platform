import Image from "next/image";

const painPoints = [
  "我是焦虑，还是太自信？",
  "我的能力护城河在哪？",
  "下一步到底该学什么？",
] as const;

export function PainPoints(): React.ReactNode {
  return (
    <section className="atelier-section atelier-pain">
      <div className="atelier-pain-bg" aria-hidden="true">
        <Image
          src="/atelier/decor/pain-bg.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="atelier-container atelier-pain-inner">
        <span className="atelier-pain-rule" aria-hidden="true" />
        <blockquote className="atelier-display atelier-pain-quote">
          你不是怕被 AI 取代，而是不知道自己在哪。
        </blockquote>
        <p className="atelier-pain-sub">
          95% 的人对自己 Agent 时代的位置一无所知。
        </p>
        <span className="atelier-pain-rule" aria-hidden="true" />

        <div className="atelier-pain-grid">
          {painPoints.map((item) => (
            <p className="atelier-pain-item" key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
