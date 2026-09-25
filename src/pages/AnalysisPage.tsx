import { useState } from 'react';
import { Loader2, RotateCcw, Zap, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { SectionTitle, Disclaimer, StatusBadge } from '@/components/IndicatorCard';
import { validateInputs, analyzeHealth } from '@/utils/analysis';
import { PERSONAL_BASELINE } from '@/data/healthData';
import type { HealthReading, IndicatorKey, AnalysisResult } from '@/types';

const FIELDS: { key: IndicatorKey; label: string; unit: string; placeholder: string }[] = [
  { key: 'heartRate', label: 'Heart Rate', unit: 'BPM', placeholder: '72' },
  { key: 'spo2', label: 'SpO₂', unit: '%', placeholder: '97' },
  { key: 'temperature', label: 'Temperature', unit: '°C', placeholder: '36.5' },
  { key: 'sleep', label: 'Sleep Hours', unit: 'hrs', placeholder: '7.2' },
  { key: 'activity', label: 'Activity', unit: '%', placeholder: '78' },
];

const DEFAULT_INPUT: HealthReading = {
  heartRate: 82,
  spo2: 97,
  temperature: 36.7,
  sleep: 6.1,
  activity: 64,
};

export function AnalysisPage() {
  const [input, setInput] = useState<HealthReading>(DEFAULT_INPUT);
  const [errors, setErrors] = useState<Partial<Record<IndicatorKey, string>>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: IndicatorKey, value: string) => {
    const num = value === '' ? NaN : parseFloat(value);
    setInput((prev) => ({ ...prev, [key]: num }));
  };

  const handleAnalyze = () => {
    const validation = validateInputs(input);
    setErrors(validation.errors);
    if (!validation.isValid) {
      setResult(null);
      return;
    }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeHealth(input));
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setInput(DEFAULT_INPUT);
    setErrors({});
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle
        title="AI-Assisted Health Analysis"
        subtitle="Transparent baseline-deviation logic for prototype demonstration"
      />

      <div className="panel p-4 border-l-2 border-l-[var(--accent-cyan)]">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-[var(--accent-cyan)] mt-0.5 shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">
            This prototype uses transparent baseline-deviation logic to demonstrate how health
            indicators could be analyzed during a mission. No external AI model is running.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="panel p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
            Enter Health Indicators
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4 font-mono">
            Personal reference — HR: {PERSONAL_BASELINE.heartRate} · SpO₂: {PERSONAL_BASELINE.spo2} · Temp: {PERSONAL_BASELINE.temperature} · Sleep: {PERSONAL_BASELINE.sleep} · Activity: {PERSONAL_BASELINE.activity}
          </p>

          <div className="space-y-3">
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    {field.label}
                  </span>
                  <span className="tech-label">{field.unit}</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={Number.isNaN(input[field.key]) ? '' : input[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2.5 rounded-lg bg-[var(--bg-panel-2)] border text-sm text-[var(--text-primary)] font-mono outline-none transition-colors ${
                    errors[field.key]
                      ? 'border-[var(--status-high)]'
                      : 'border-[var(--border-subtle)] focus:border-[var(--accent-cyan)]'
                  }`}
                  aria-label={field.label}
                />
                {errors[field.key] && (
                  <p className="mt-1 text-xs text-[var(--status-high)] flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-cyan)] text-[var(--bg-deep)] font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin-fast" />
              ) : (
                <Zap size={16} />
              )}
              {loading ? 'ANALYZING...' : 'ANALYZE HEALTH'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-strong)] text-[var(--text-secondary)] font-medium text-sm transition-colors hover:bg-[var(--bg-panel-2)] disabled:opacity-50"
            >
              <RotateCcw size={16} />
              RESET
            </button>
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
            Analysis Result
          </h3>
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Info size={32} className="text-[var(--text-muted)] mb-3" />
              <p className="text-sm text-[var(--text-muted)]">
                Enter values and click <span className="text-[var(--accent-cyan)] font-medium">Analyze Health</span> to see the prototype analysis.
              </p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 size={28} className="text-[var(--accent-cyan)] animate-spin-fast mb-3" />
              <p className="text-sm text-[var(--text-muted)] font-mono">Running baseline-deviation analysis...</p>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="tech-label">Monitoring Status</span>
                <StatusBadge status={result.status} label={result.statusLabel} />
              </div>

              {result.factors.length > 0 ? (
                <div>
                  <div className="tech-label mb-2">Detected Factors</div>
                  <ul className="space-y-2">
                    {result.factors.map((factor) => (
                      <li key={factor.key} className="flex items-start gap-2 text-sm">
                        <span
                          className="mt-1 shrink-0"
                          style={{
                            color:
                              factor.severity === 'alert'
                                ? 'var(--status-high)'
                                : factor.severity === 'warning'
                                ? 'var(--status-moderate)'
                                : 'var(--accent-cyan)',
                          }}
                        >
                          {factor.severity === 'alert' ? (
                            <AlertTriangle size={14} />
                          ) : factor.severity === 'warning' ? (
                            <AlertTriangle size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                        </span>
                        <div>
                          <div className="text-[var(--text-primary)] font-medium">{factor.label}</div>
                          <div className="text-xs text-[var(--text-muted)] mt-0.5">{factor.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-[var(--status-normal)]">
                  <CheckCircle2 size={16} />
                  All indicators within personal reference range.
                </div>
              )}

              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <div className="tech-label mb-2">Explanation</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              <div>
                <div className="tech-label mb-2">Suggested Monitoring Actions</div>
                <ul className="space-y-1.5">
                  {result.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-cyan)] mt-0.5">›</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Disclaimer>
        Prototype monitoring categories only — not medical diagnoses. Health decisions should follow established mission medical protocols and qualified medical guidance.
      </Disclaimer>
    </div>
  );
}
