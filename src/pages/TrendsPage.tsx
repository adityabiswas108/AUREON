import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { INDICATORS, TRENDS_7_DAY, PERSONAL_BASELINE } from '@/data/healthData';
import { SectionTitle, Disclaimer, StatusBadge } from '@/components/IndicatorCard';
import { getIndicatorStatusColor } from '@/utils/status';
import type { IndicatorKey } from '@/types';

const CHART_COLORS: Record<IndicatorKey, string> = {
  heartRate: '#f87171',
  spo2: '#4d8eff',
  temperature: '#fbbf24',
  sleep: '#a78bfa',
  activity: '#34d399',
};

export function TrendsPage() {
  const [selected, setSelected] = useState<IndicatorKey>('heartRate');
  const meta = INDICATORS.find((m) => m.key === selected)!;
  const baseline = PERSONAL_BASELINE[selected];

  const latest = TRENDS_7_DAY[TRENDS_7_DAY.length - 1][selected];
  const status = getIndicatorStatusColor(latest, baseline, meta.monitoringRange);

  const interpretations: Record<IndicatorKey, string> = {
    heartRate: 'Heart rate has been gradually trending above the personal reference over the last several days.',
    spo2: 'SpO₂ remains within the prototype monitoring range, with minor day-to-day variation.',
    temperature: 'Body temperature has stayed near the personal reference with slight upward drift.',
    sleep: 'Recent sleep duration is below the prototype personal reference on several days.',
    activity: 'Activity levels have declined steadily compared with the personal baseline.',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle
        title="Health Trends"
        subtitle="7-day simulated demonstration data with personal baseline reference"
      />

      <div className="flex flex-wrap gap-2">
        {INDICATORS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelected(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              selected === m.key
                ? 'border-[var(--accent-cyan)] bg-[rgba(56,217,217,0.1)] text-[var(--accent-cyan)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-panel)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{meta.label} — 7 Day Trend</h3>
            <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
              Simulated demonstration data · Personal reference: {baseline} {meta.unit}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-muted)]">Latest:</span>
            <span className="text-2xl font-bold tabular-nums text-[var(--text-primary)]">
              {latest.toFixed(meta.unit === '°C' || meta.unit === 'hrs' ? 1 : 0)} {meta.unit}
            </span>
            <StatusBadge status={status} />
          </div>
        </div>

        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TRENDS_7_DAY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2740" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#5a6b8a', fontSize: 11 }}
                axisLine={{ stroke: '#1a2740' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#5a6b8a', fontSize: 11 }}
                axisLine={{ stroke: '#1a2740' }}
                tickLine={false}
                domain={[
                  Math.min(...TRENDS_7_DAY.map((d) => d[selected])) - (meta.unit === '°C' ? 0.5 : 5),
                  Math.max(...TRENDS_7_DAY.map((d) => d[selected])) + (meta.unit === '°C' ? 0.5 : 5),
                ]}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(11,18,32,0.95)',
                  border: '1px solid #243352',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#8b9bb8' }}
                itemStyle={{ color: CHART_COLORS[selected] }}
              />
              <ReferenceLine
                y={baseline}
                stroke="#38d9d9"
                strokeDasharray="5 5"
                label={{
                  value: 'Baseline',
                  fill: '#38d9d9',
                  fontSize: 10,
                  position: 'right',
                }}
              />
              <Line
                type="monotone"
                dataKey={selected}
                stroke={CHART_COLORS[selected]}
                strokeWidth={2.5}
                dot={{ fill: CHART_COLORS[selected], r: 4 }}
                activeDot={{ r: 6 }}
                name={meta.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel p-5">
        <div className="tech-label mb-2">Interpretation</div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {interpretations[selected]}
        </p>
        <div className="mt-4">
          <Disclaimer>
            Trend data is simulated for demonstration. This interpretation is not a medical diagnosis.
          </Disclaimer>
        </div>
      </div>
    </div>
  );
}
