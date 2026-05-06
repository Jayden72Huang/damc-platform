export function Footer(): React.ReactNode {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 DAMC.ai</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          <a
            href="https://github.com/Jayden72Huang/damc-skill"
            className="hover:text-cyan-100"
          >
            GitHub
          </a>
          <a href="#privacy" className="hover:text-cyan-100">
            隐私政策
          </a>
          <a href="#pricing" className="hover:text-cyan-100">
            服务条款
          </a>
        </nav>
      </div>
    </footer>
  );
}
