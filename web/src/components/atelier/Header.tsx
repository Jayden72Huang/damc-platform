import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const navLinks = [
  { href: "/atelier#framework", label: "框架" },
  { href: "/atelier#archetypes", label: "画像" },
  { href: "/atelier#sample", label: "报告" },
  { href: "/atelier#process", label: "流程" },
  { href: "/atelier#pricing", label: "定价" },
  { href: "/atelier#faq", label: "FAQ" },
] as const;

export async function Header(): Promise<React.ReactNode> {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="atelier-header">
      <div className="atelier-container atelier-header-inner">
        <Link href="/atelier" className="atelier-header-brand">
          <span className="atelier-display">DAMC</span>
          <span className="atelier-header-dot">.</span>
          <span className="atelier-display">AI</span>
        </Link>

        <nav className="atelier-header-nav" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="atelier-header-actions">
          {user ? (
            <div className="atelier-header-user">
              <Link href="/dashboard" className="atelier-header-dashboard">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name ?? "user"}
                    width={28}
                    height={28}
                  />
                ) : null}
                <span>{user.name ?? "Dashboard"}</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/atelier" });
                }}
              >
                <button type="submit" className="atelier-text-link">
                  登出
                </button>
              </form>
            </div>
          ) : (
            <Link href="/sign-in" className="atelier-button atelier-header-signin">
              登录
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
