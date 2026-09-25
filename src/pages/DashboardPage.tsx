import { Satellite, Clock, Database, ShieldCheck, AlertTriangle } from 'lucide-react';
import { INDICATORS, CURRENT_READING, MISSION_INFO } from '@/data/healthData';
import { IndicatorCard, SectionTitle, Disclaimer, StatusBadge } from '@/components/IndicatorCard';

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="panel p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Satellite size={20} className="text-[var(--accent-cyan)]" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-widest text-[var(--text-primary)]">
                AUREON
              </h1>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Astronaut Health Monitoring & Decision Support
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <InfoChip label="Astronaut" value={MISSION_INFO.astronaut} />
            <InfoChip label="Mission" value={MISSION_INFO.mission} />
            <InfoChip label="Mission Day" value={String(MISSION_INFO.missionDay)} highlight />
          </div>
        </div>
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--status-moderate)] bg-[rgba(251,191,36,0.1)]">
            <span className="glow-dot bg-[var(--status-moderate)] animate-pulse-slow" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[var(--status-moderate)]">
              SIMULATED DEMO DATA
            </span>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle title="Health Indicators" subtitle="Current simulated readings vs. personal baseline" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {INDICATORS.map((meta) => (
            <IndicatorCard key={meta.key} meta={meta} value={CURRENT_READING[meta.key]} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Overall Monitoring Status
            </h3>
            <StatusBadge status="moderate" label="MODERATE ATTENTION" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="tech-label mb-2">Detected Factors</div>
              <ul className="space-y-1.5">
                {[
                  'Reduced sleep compared with personal baseline',
                  'Heart rate above personal baseline',
                  'Reduced activity compared with personal baseline',
                ].map((factor) => (
                  <li key={factor} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <AlertTriangle size={15} className="text-[var(--status-moderate)] mt-0.5 shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <div className="tech-label mb-2">Explanation</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Several monitored indicators differ from the recent personal baseline.
                Continued monitoring and review of rest and recovery are recommended.
              </p>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Mission Overview
          </h3>
          <div className="space-y-3">
            <OverviewRow icon={<ShieldCheck size={16} />} label="Monitoring Status" value="Moderate Attention" />
            <OverviewRow icon={<Clock size={16} />} label="Last Updated" value={MISSION_INFO.lastUpdated} />
            <OverviewRow icon={<Satellite size={16} />} label="Mission Day" value={String(MISSION_INFO.missionDay)} />
            <OverviewRow icon={<Database size={16} />} label="Personal Baseline" value="Available" />
            <OverviewRow icon={<Database size={16} />} label="Data Source" value="Simulated" />
          </div>
        </div>
      </div>

      <Disclaimer>
        All values shown in this prototype are simulated demonstration data unless explicitly identified as a NASA source.
      </Disclaimer>
    </div>
  );
}

function InfoChip({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-panel-2)]">
      <div className="tech-label">{label}</div>
      <div className={`text-sm font-semibold font-mono ${highlight ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </div>
    </div>
  );
}

function OverviewRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <span className="text-[var(--text-muted)]">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-mono text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
