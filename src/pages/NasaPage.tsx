import { useState, type ReactNode } from 'react';
import { ExternalLink, Database, FlaskConical, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionTitle, Disclaimer } from '@/components/IndicatorCard';
import { NASA_RESOURCES } from '@/data/healthData';

export function NasaPage() {
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle
        title="NASA Data & Science"
        subtitle="Scientific foundation, data provenance, and official NASA resources"
      />

      <div className="panel p-5 border-l-2 border-l-[var(--accent-cyan)]">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          AUREON is designed around NASA's space-life-science research and open-data ecosystem.
          NASA space-life-science datasets provide a scientific and data foundation for understanding
          physiological responses relevant to spaceflight. The current AUREON dashboard uses
          simulated values for demonstration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database size={18} className="text-[var(--accent-cyan)]" />
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Data Provenance</h3>
          </div>
          <div className="space-y-3">
            <ProvenanceRow label="Current Dashboard" value="SIMULATED DEMONSTRATION DATA" highlight />
            <ProvenanceRow
              label="Scientific Foundation"
              value="NASA space-life-science research and open-data resources"
            />
            <ProvenanceRow
              label="Future Integration"
              value="Verified NASA datasets can be processed and mapped to appropriate monitoring indicators when compatible data are available."
            />
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={18} className="text-[var(--accent-blue)]" />
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Challenge Context</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            <span className="text-[var(--text-primary)] font-medium">
              "Create Health Monitoring Software for Astronauts on Space Missions"
            </span>
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Long-duration missions expose astronauts to multiple environmental and operational
            stresses. Astronauts may need to monitor changes in their own health during missions.
            AUREON provides a prototype interface for monitoring, trend visualization, personal
            baseline comparison, transparent analysis, and health monitoring actions.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical size={18} className="text-[var(--accent-cyan)]" />
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Official NASA Resources
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NASA_RESOURCES.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover p-4 flex items-start gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[rgba(56,217,217,0.08)] text-[var(--accent-cyan)] shrink-0">
                <ExternalLink size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                  {resource.title}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {resource.description}
                </p>
                <div className="text-xs text-[var(--text-muted)] font-mono mt-2 truncate">
                  {resource.url}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="panel p-5">
        <button
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="flex items-center justify-between w-full"
          aria-expanded={showArchitecture}
        >
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            Project Architecture
          </h3>
          {showArchitecture ? <ChevronUp size={18} className="text-[var(--text-muted)]" /> : <ChevronDown size={18} className="text-[var(--text-muted)]" />}
        </button>
        {showArchitecture && (
          <div className="mt-4 animate-fade-in">
            <div className="space-y-1">
              {[
                { label: 'Astronaut', note: '' },
                { label: 'AUREON Dashboard', note: '' },
                { label: 'Health Indicators', note: '' },
                { label: 'Personal Baseline', note: '' },
                { label: 'Trend Analysis', note: '' },
                { label: 'Prototype Decision-Support Logic', note: '' },
                { label: 'Monitoring Recommendations', note: '' },
              ].map((step, i, arr) => (
                <div key={step.label}>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--bg-panel-2)] border border-[var(--border-subtle)]">
                    <span className="w-6 h-6 rounded-full bg-[rgba(56,217,217,0.1)] text-[var(--accent-cyan)] flex items-center justify-center text-xs font-mono font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-primary)]">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <span className="text-[var(--text-muted)]">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[rgba(77,142,255,0.06)] border border-[rgba(77,142,255,0.2)]">
                <span className="w-6 h-6 rounded-full bg-[rgba(77,142,255,0.15)] text-[var(--accent-blue)] flex items-center justify-center text-xs font-mono font-bold">
                  ★
                </span>
                <span className="text-sm text-[var(--text-primary)]">
                  NASA Research / Open Data → Scientific Foundation
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Disclaimer>
                The current prototype uses simulated demonstration data. NASA resources provide the scientific foundation, not the live dashboard values.
              </Disclaimer>
            </div>
          </div>
        )}
      </div>

      <div className="panel p-5">
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
          About the Project
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <AboutRow label="Project" value="AUREON" />
          <AboutRow label="Event" value="NASA Space Apps Challenge 2026" />
          <AboutRow
            label="Challenge"
            value="Create Health Monitoring Software for Astronauts on Space Missions"
          />
          <AboutRow label="Team" value="Team AUREON" />
          <AboutRow label="Team Leader" value="Aditya Biswas Joy" />
        </div>
      </div>
    </div>
  );
}

function ProvenanceRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="tech-label">{label}</span>
      <span
        className={`text-sm font-mono ${highlight ? 'text-[var(--status-moderate)]' : 'text-[var(--text-secondary)]'}`}
      >
        {value}
      </span>
    </div>
  );
}

function AboutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-lg bg-[var(--bg-panel-2)] border border-[var(--border-subtle)]">
      <span className="tech-label">{label}</span>
      <span className="text-[var(--text-primary)] font-medium">{value}</span>
    </div>
  );
}
