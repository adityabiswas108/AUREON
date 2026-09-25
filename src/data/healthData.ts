import type { IndicatorMeta, TrendPoint } from '@/types';

export const PERSONAL_BASELINE = {
  heartRate: 72,
  spo2: 97,
  temperature: 36.5,
  sleep: 7.2,
  activity: 78,
} as const;

export const INDICATORS: IndicatorMeta[] = [
  {
    key: 'heartRate',
    label: 'Heart Rate',
    unit: 'BPM',
    icon: 'HeartPulse',
    baseline: PERSONAL_BASELINE.heartRate,
    monitoringRange: [50, 110],
  },
  {
    key: 'spo2',
    label: 'SpO₂',
    unit: '%',
    icon: 'Activity',
    baseline: PERSONAL_BASELINE.spo2,
    monitoringRange: [90, 100],
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°C',
    icon: 'Thermometer',
    baseline: PERSONAL_BASELINE.temperature,
    monitoringRange: [35.5, 37.8],
  },
  {
    key: 'sleep',
    label: 'Sleep',
    unit: 'hrs',
    icon: 'Moon',
    baseline: PERSONAL_BASELINE.sleep,
    monitoringRange: [4, 10],
  },
  {
    key: 'activity',
    label: 'Activity',
    unit: '%',
    icon: 'Footprints',
    baseline: PERSONAL_BASELINE.activity,
    monitoringRange: [0, 100],
  },
];

export const CURRENT_READING = {
  heartRate: 82,
  spo2: 97,
  temperature: 36.7,
  sleep: 6.1,
  activity: 64,
} as const;

export const TRENDS_7_DAY: TrendPoint[] = [
  { day: 'Day 141', heartRate: 74, spo2: 98, temperature: 36.5, sleep: 7.4, activity: 80 },
  { day: 'Day 142', heartRate: 76, spo2: 98, temperature: 36.6, sleep: 6.8, activity: 75 },
  { day: 'Day 143', heartRate: 78, spo2: 97, temperature: 36.6, sleep: 6.5, activity: 70 },
  { day: 'Day 144', heartRate: 80, spo2: 97, temperature: 36.7, sleep: 6.2, activity: 68 },
  { day: 'Day 145', heartRate: 81, spo2: 96, temperature: 36.7, sleep: 5.9, activity: 65 },
  { day: 'Day 146', heartRate: 83, spo2: 97, temperature: 36.8, sleep: 6.0, activity: 62 },
  { day: 'Day 147', heartRate: 82, spo2: 97, temperature: 36.7, sleep: 6.1, activity: 64 },
];

export const NASA_RESOURCES = [
  {
    title: 'NASA Open Science Data Repository (OSDR)',
    description: 'The central archive for NASA biological and physical science data, including spaceflight experiments.',
    url: 'https://osdr.nasa.gov/',
  },
  {
    title: 'NASA OSDR Overview',
    description: 'Overview of NASA’s Open Science Data Repository and its role in space life sciences.',
    url: 'https://science.nasa.gov/biological-physical/data/osdr/',
  },
  {
    title: 'NASA Open Data',
    description: 'NASA’s open data portal with datasets across missions and scientific domains.',
    url: 'https://data.nasa.gov/',
  },
  {
    title: 'NASA API Portal',
    description: 'Public NASA APIs for imagery, Mars weather, APOD, and more.',
    url: 'https://api.nasa.gov/',
  },
  {
    title: 'NASA Inspiration4 Mission Data',
    description: 'OSDR data from the SpaceX Inspiration4 civilian orbital mission.',
    url: 'https://osdr.nasa.gov/bio/repo/data/missions/SpaceX%20Inspiration4',
  },
  {
    title: 'NASA OSDR Cardiovascular Physiology (OS-766)',
    description: 'Example cardiovascular physiology experiment available through the OSDR.',
    url: 'https://osdr.nasa.gov/bio/repo/data/experiments/OS-766',
  },
] as const;

export const MISSION_INFO = {
  astronaut: 'Crew Member 01',
  mission: 'Long Duration Mission',
  missionDay: 147,
  lastUpdated: 'Day 147 · 14:32 UTC',
};
