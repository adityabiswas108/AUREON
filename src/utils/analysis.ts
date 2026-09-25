import type {
  AnalysisFactor,
  AnalysisResult,
  HealthReading,
  IndicatorKey,
  StatusLevel,
  ValidationResult,
} from '@/types';
import { PERSONAL_BASELINE } from '@/data/healthData';

export function validateInputs(input: HealthReading): ValidationResult {
  const errors: Partial<Record<IndicatorKey, string>> = {};

  const checks: { key: IndicatorKey; test: (v: number) => boolean; msg: string }[] = [
    { key: 'heartRate', test: (v) => !Number.isFinite(v), msg: 'Heart rate is required.' },
    { key: 'heartRate', test: (v) => v < 30 || v > 220, msg: 'Enter a heart rate between 30 and 220 BPM.' },
    { key: 'spo2', test: (v) => !Number.isFinite(v), msg: 'SpO₂ is required.' },
    { key: 'spo2', test: (v) => v < 0 || v > 100, msg: 'SpO₂ must be between 0 and 100%.' },
    { key: 'temperature', test: (v) => !Number.isFinite(v), msg: 'Temperature is required.' },
    { key: 'temperature', test: (v) => v < 30 || v > 45, msg: 'Enter a temperature between 30 and 45 °C.' },
    { key: 'sleep', test: (v) => !Number.isFinite(v), msg: 'Sleep hours are required.' },
    { key: 'sleep', test: (v) => v < 0 || v > 24, msg: 'Sleep must be between 0 and 24 hours.' },
    { key: 'activity', test: (v) => !Number.isFinite(v), msg: 'Activity is required.' },
    { key: 'activity', test: (v) => v < 0 || v > 100, msg: 'Activity must be between 0 and 100%.' },
  ];

  for (const { key, test, msg } of checks) {
    if (test(input[key]) && !errors[key]) {
      errors[key] = msg;
    }
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}

function heartRateFactor(value: number): AnalysisFactor | null {
  const baseline = PERSONAL_BASELINE.heartRate;
  const diff = value - baseline;
  if (Math.abs(diff) <= 5) return null;
  if (diff > 15 || diff < -15) {
    return {
      key: 'heartRate',
      label: 'Elevated heart rate compared with baseline',
      detail: `Heart rate is ${diff > 0 ? '+' : ''}${diff.toFixed(0)} BPM vs. personal reference of ${baseline} BPM.`,
      severity: 'alert',
    };
  }
  return {
    key: 'heartRate',
    label: diff > 0 ? 'Heart rate above personal baseline' : 'Heart rate below personal baseline',
    detail: `Heart rate is ${diff > 0 ? '+' : ''}${diff.toFixed(0)} BPM vs. personal reference of ${baseline} BPM.`,
    severity: 'warning',
  };
}

function spo2Factor(value: number): AnalysisFactor | null {
  if (value >= 95) return null;
  if (value < 90) {
    return {
      key: 'spo2',
      label: 'SpO₂ below prototype monitoring range',
      detail: `SpO₂ of ${value.toFixed(0)}% is below the prototype monitoring range of 90–100%.`,
      severity: 'alert',
    };
  }
  return {
    key: 'spo2',
    label: 'SpO₂ below personal baseline',
    detail: `SpO₂ of ${value.toFixed(0)}% is below the personal reference of ${PERSONAL_BASELINE.spo2}%.`,
    severity: 'warning',
  };
}

function temperatureFactor(value: number): AnalysisFactor | null {
  if (value >= 36.0 && value <= 37.2) return null;
  if (value < 35.5 || value > 37.8) {
    return {
      key: 'temperature',
      label: 'Temperature outside prototype monitoring range',
      detail: `Temperature of ${value.toFixed(1)} °C is outside the prototype monitoring range of 35.5–37.8 °C.`,
      severity: 'alert',
    };
  }
  return {
    key: 'temperature',
    label: value > 37.2 ? 'Temperature above personal baseline' : 'Temperature below personal baseline',
    detail: `Temperature of ${value.toFixed(1)} °C differs from the personal reference of ${PERSONAL_BASELINE.temperature} °C.`,
    severity: 'warning',
  };
}

function sleepFactor(value: number): AnalysisFactor | null {
  const baseline = PERSONAL_BASELINE.sleep;
  const diff = value - baseline;
  if (diff >= -0.5) return null;
  if (diff <= -2) {
    return {
      key: 'sleep',
      label: 'Significantly reduced sleep',
      detail: `Sleep of ${value.toFixed(1)} hrs is ${Math.abs(diff).toFixed(1)} hrs below the personal reference of ${baseline} hrs.`,
      severity: 'alert',
    };
  }
  return {
    key: 'sleep',
    label: 'Reduced sleep compared with baseline',
    detail: `Sleep of ${value.toFixed(1)} hrs is ${Math.abs(diff).toFixed(1)} hrs below the personal reference of ${baseline} hrs.`,
    severity: 'warning',
  };
}

function activityFactor(value: number): AnalysisFactor | null {
  const baseline = PERSONAL_BASELINE.activity;
  const diff = value - baseline;
  if (diff >= -10) return null;
  if (diff <= -30) {
    return {
      key: 'activity',
      label: 'Significantly reduced activity',
      detail: `Activity of ${value.toFixed(0)}% is ${Math.abs(diff).toFixed(0)}% below the personal reference of ${baseline}%.`,
      severity: 'alert',
    };
  }
  return {
    key: 'activity',
    label: 'Reduced activity compared with baseline',
    detail: `Activity of ${value.toFixed(0)}% is ${Math.abs(diff).toFixed(0)}% below the personal reference of ${baseline}%.`,
    severity: 'warning',
  };
}

export function analyzeHealth(input: HealthReading): AnalysisResult {
  const factors: AnalysisFactor[] = [
    heartRateFactor(input.heartRate),
    spo2Factor(input.spo2),
    temperatureFactor(input.temperature),
    sleepFactor(input.sleep),
    activityFactor(input.activity),
  ].filter((f): f is AnalysisFactor => f !== null);

  const alertCount = factors.filter((f) => f.severity === 'alert').length;
  const warningCount = factors.filter((f) => f.severity === 'warning').length;

  let status: StatusLevel = 'normal';
  let statusLabel = 'NORMAL';
  if (alertCount >= 1 || warningCount >= 3) {
    status = 'high';
    statusLabel = 'HIGH ATTENTION';
  } else if (warningCount >= 1) {
    status = 'moderate';
    statusLabel = 'MODERATE ATTENTION';
  }

  let explanation: string;
  if (status === 'normal') {
    explanation =
      'All monitored indicators are within the prototype personal reference range. Continue routine monitoring.';
  } else if (status === 'moderate') {
    explanation =
      'Several indicators differ from the recent personal reference. The pattern should be monitored over time.';
  } else {
    explanation =
      'Multiple indicators show meaningful deviation from the personal reference. Continued monitoring and review of rest and recovery are recommended.';
  }

  const actions: string[] = [];
  if (factors.some((f) => f.key === 'sleep')) {
    actions.push('Review recent rest and recovery periods');
  }
  if (factors.some((f) => f.key === 'activity')) {
    actions.push('Review recent activity trends and changes from personal baseline');
  }
  if (factors.some((f) => f.key === 'heartRate')) {
    actions.push('Continue monitoring heart rate and review recent trends');
  }
  if (factors.some((f) => f.key === 'spo2' || f.key === 'temperature')) {
    actions.push('Monitor the affected indicator closely and compare with recent trends');
  }
  actions.push('Continue tracking all health indicators');
  actions.push('Review trends instead of isolated readings');
  actions.push('Follow established mission health protocols where applicable');

  return { status, statusLabel, factors, explanation, actions };
}
