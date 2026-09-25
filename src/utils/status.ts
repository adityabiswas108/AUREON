import type { StatusLevel } from '@/types';

export function getStatusColor(status: StatusLevel): string {
  switch (status) {
    case 'normal':
      return 'var(--status-normal)';
    case 'moderate':
      return 'var(--status-moderate)';
    case 'high':
      return 'var(--status-high)';
  }
}

export function getStatusBg(status: StatusLevel): string {
  switch (status) {
    case 'normal':
      return 'rgba(52, 211, 153, 0.12)';
    case 'moderate':
      return 'rgba(251, 191, 36, 0.12)';
    case 'high':
      return 'rgba(248, 113, 113, 0.12)';
  }
}

export function getStatusBorder(status: StatusLevel): string {
  switch (status) {
    case 'normal':
      return 'rgba(52, 211, 153, 0.3)';
    case 'moderate':
      return 'rgba(251, 191, 36, 0.3)';
    case 'high':
      return 'rgba(248, 113, 113, 0.3)';
  }
}

export function getIndicatorStatusColor(
  value: number,
  baseline: number,
  range: [number, number],
): StatusLevel {
  if (value < range[0] || value > range[1]) return 'high';
  const diff = Math.abs(value - baseline);
  const tolerance = (range[1] - range[0]) * 0.15;
  if (diff > tolerance * 2) return 'high';
  if (diff > tolerance) return 'moderate';
  return 'normal';
}
