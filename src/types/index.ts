export type StatusLevel = 'normal' | 'moderate' | 'high';

export type IndicatorKey = 'heartRate' | 'spo2' | 'temperature' | 'sleep' | 'activity';

export interface HealthReading {
  heartRate: number;
  spo2: number;
  temperature: number;
  sleep: number;
  activity: number;
}

export interface TrendPoint {
  day: string;
  heartRate: number;
  spo2: number;
  temperature: number;
  sleep: number;
  activity: number;
}

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  unit: string;
  icon: string;
  baseline: number;
  monitoringRange: [number, number];
}

export interface AnalysisFactor {
  key: IndicatorKey;
  label: string;
  detail: string;
  severity: 'info' | 'warning' | 'alert';
}

export interface AnalysisResult {
  status: StatusLevel;
  statusLabel: string;
  factors: AnalysisFactor[];
  explanation: string;
  actions: string[];
}

export interface ValidationResult {
  errors: Partial<Record<IndicatorKey, string>>;
  isValid: boolean;
}
