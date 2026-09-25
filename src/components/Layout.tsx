import { useState, type ReactNode } from 'react';
import { Menu, X, Satellite } from 'lucide-react';

export type PageKey = 'dashboard' | 'trends' | 'analysis' | 'actions' | 'nasa';

interface NavItem {
  key: PageKey;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Mission Dashboard', icon: <Satellite size={18} /> },
  { key: 'trends', label: 'Health Trends', icon: <Satellite size={18} /> },
  { key: 'analysis', label: 'Health Analysis', icon: <Satellite size={18} /> },
  { key: 'actions', label: 'Health Action Center', icon: <Satellite size={18} /> },
  { key: 'nasa', label: 'NASA Data & Science', icon: <Satellite size={18} /> },
];

interface LayoutProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
}

export function Layout({ activePage, onNavigate, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageKey) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[rgba(6,10,19,0.85)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNav('dashboard')}
              className="flex items-center gap-3 group"
              aria-label="AUREON home"
            >
              <div className="w-9 h-9 rounded-lg border border-[var(--border-strong)] flex items-center justify-center bg-[var(--bg-panel)] group-hover:border-[var(--accent-cyan)] transition-colors">
                <Satellite size={18} className="text-[var(--accent-cyan)]" />
              </div>
              <div className="text-left">
                <div className="font-bold tracking-widest text-sm text-[var(--text-primary)]">
                  AUREON
                </div>
                <div className="tech-label hidden sm:block">
                  Health Monitoring & Decision Support
                </div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePage === item.key
                      ? 'text-[var(--accent-cyan)] bg-[rgba(56,217,217,0.08)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel-2)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              className="lg:hidden p-2 text-[var(--text-secondary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-panel)] animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`w-full text-left px-6 py-3 text-sm font-medium border-b border-[var(--border-subtle)] transition-colors ${
                  activePage === item.key
                    ? 'text-[var(--accent-cyan)] bg-[rgba(56,217,217,0.06)]'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-panel)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="glow-dot bg-[var(--status-moderate)] animate-pulse-slow" />
              <span className="font-mono">SIMULATED DEMO DATA</span>
            </div>
            <div>
              AUREON · NASA Space Apps Challenge 2026 · Prototype Decision-Support System
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
