import { Moon, Footprints, Activity, ShieldCheck, BookOpen } from 'lucide-react';
import { SectionTitle, Disclaimer } from '@/components/IndicatorCard';
import type { ReactNode } from 'react';

interface ActionGroup {
  title: string;
  icon: ReactNode;
  color: string;
  items: string[];
}

const ACTION_GROUPS: ActionGroup[] = [
  {
    title: 'Rest & Recovery',
    icon: <Moon size={20} />,
    color: 'var(--accent-cyan)',
    items: [
      'Review recent sleep duration against personal baseline',
      'Maintain appropriate rest periods consistent with mission schedule',
      'Continue monitoring recovery patterns over the following days',
    ],
  },
  {
    title: 'Activity',
    icon: <Footprints size={20} />,
    color: 'var(--status-normal)',
    items: [
      'Review recent activity trends and note changes from personal baseline',
      'Monitor for sustained declines in activity levels',
      'Compare activity with rest and recovery patterns',
    ],
  },
  {
    title: 'Continuous Monitoring',
    icon: <Activity size={20} />,
    color: 'var(--accent-blue)',
    items: [
      'Continue tracking all health indicators regularly',
      'Compare current values with personal reference rather than isolated readings',
      'Review trends over multiple days to identify patterns',
    ],
  },
];

export function ActionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle
        title="Health Action Center"
        subtitle="Translate detected monitoring patterns into understandable next steps"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACTION_GROUPS.map((group) => (
          <div key={group.title} className="panel panel-hover p-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${group.color}15`, color: group.color }}
              >
                {group.icon}
              </div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {group.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="text-[var(--text-muted)] mt-0.5 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="panel p-5 border-l-2 border-l-[var(--accent-blue)]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(77,142,255,0.1)] text-[var(--accent-blue)] shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              Mission Protocol
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Health decisions should follow established mission medical protocols and qualified
              medical guidance. The suggestions above are prototype monitoring recommendations,
              not medical prescriptions.
            </p>
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(56,217,217,0.1)] text-[var(--accent-cyan)] shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              How to Use This Center
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Use the Health Analysis tool to identify which indicators differ from the personal
              baseline, then refer to the relevant action group above. These are general monitoring
              suggestions for a prototype system — they do not replace mission medical protocols.
            </p>
          </div>
        </div>
      </div>

      <Disclaimer>
        Prototype decision-support recommendations only. Not medical prescriptions. Not a replacement for mission medical protocols.
      </Disclaimer>
    </div>
  );
}
