import type { ReactNode } from 'react';
import {
  HeartPulse,
  Activity,
  Thermometer,
  Moon,
  Footprints,
  type LucideIcon,
} from 'lucide-react';
import type { IndicatorMeta, StatusLevel } from '@/types';
import { getIndicatorStatusColor } from '@/utils/status';

const ICON_MAP: Record<string, LucideIcon> = {
  HeartPulse,
  Activity,
  Thermometer,
  Moon,
  Footprints,
};

interface IndicatorCardProps {
  meta: IndicatorMeta;
  value: number;
}

export function IndicatorCard({ meta, value }: IndicatorCardProps) {
  const Icon = ICON_MAP[meta.icon] ?? Activity;
  const status = getIndicatorStatusColor(value, meta.baseline, meta.monitoringRange);

  const statusColor = getStatusColor(status);
  const diff = value - meta.baseline;
  const showDiff = meta.key !== 'spo2' || Math.abs(diff) > 0.5;

  return (
    <div className="panel panel-hover p-4 sm:p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(56, 217, 217, 0.08)' }}
          >
            <Icon size={18} className="text-[var(--accent-cyan)]" />
          </div>
          <div>
            <div className="tech-label">{meta.label}</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">{meta.unit}</div>
          </div>
        </div>
        <span
          className="glow-dot animate-pulse-slow"
          style={{ background: statusColor }}
        />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[var(--text-primary)] tabular-nums">
          {value.toFixed(meta.unit === '°C' ? 1 : meta.unit === 'hrs' ? 1 : 0)}
        </span>
        <span className="text-sm text-[var(--text-muted)] font-mono">{meta.unit}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)] font-mono">
          Baseline: {meta.baseline}
        </span>
        {showDiff && (
          <span className="font-mono" style={{ color: statusColor }}>
            {diff > 0 ? '+' : ''}
            {diff.toFixed(meta.unit === '°C' || meta.unit === 'hrs' ? 1 : 0)} {meta.unit === 'BPM' ? 'BPM' : meta.unit === '%' ? '%' : ''}
          </span>
        )}
      </div>

      <div className="mt-2">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

function getStatusColor(status: StatusLevel): string {
  switch (status) {
    case 'normal':
      return 'var(--status-normal)';
    case 'moderate':
      return 'var(--status-moderate)';
    case 'high':
      return 'var(--status-high)';
  }
}

export function StatusBadge({ status, label }: { status: StatusLevel; label?: string }) {
  const color = getStatusColor(status);
  const text = label ?? (status === 'normal' ? 'NORMAL' : status === 'moderate' ? 'MODERATE' : 'HIGH');
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-semibold tracking-wide"
      style={{
        color,
        background: `${color}1a`,
        border: `1px solid ${color}40`,
      }}
    >
      <span className="glow-dot" style={{ background: color }} />
      {text}
    </span>
  );
}

export function SectionTitle({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-panel-2)] text-xs text-[var(--text-muted)]">
      <span className="glow-dot mt-1 bg-[var(--status-moderate)] shrink-0" />
      <span>{children}</span>
    </div>
  );
}
