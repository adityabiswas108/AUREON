# AUREON — Astronaut Health Monitoring & Decision Support System

**NASA Space Apps Challenge 2026**

**Challenge:** Create Health Monitoring Software for Astronauts on Space Missions

**Team Name:** Team AUREON  **Team Leader:** Aditya Biswas Joy

---

## Overview

AUREON is a prototype astronaut health monitoring and decision-support system designed to help astronauts monitor changes in health indicators during long-duration space missions. The system follows a **Monitor → Understand → Act** workflow:

- **Monitor** — collect health indicators (heart rate, SpO₂, temperature, sleep, activity)
- **Understand** — compare values against a personal baseline, visualize trends, identify deviations
- **Act** — translate detected patterns into understandable monitoring recommendations

> AUREON is a **prototype decision-support system**. It is NOT a medical diagnostic system, a replacement for doctors, a replacement for mission medical protocols, or a real-time astronaut telemetry system. It never claims to diagnose diseases.

---

## Problem

Long-duration missions expose astronauts to multiple environmental and operational stresses — space radiation, isolation and confinement, altered gravity, closed spacecraft environments, cardiovascular changes, and sleep/activity disruption. Astronauts may need to monitor changes in their own health during missions.

## Solution

AUREON provides a prototype interface for:

- Health indicator monitoring with personal baseline comparison
- 7-day trend visualization
- Transparent baseline-deviation analysis
- Health monitoring action center
- NASA scientific/data context with data provenance

---

## Key Features

1. **Mission Dashboard** — health indicator cards, overall monitoring status, detected factors, mission overview
2. **Health Trends** — interactive 7-day charts for heart rate, SpO₂, sleep, and activity with personal baseline reference lines
3. **AI-Assisted Prototype Analysis** — browser-side baseline-deviation logic with live input validation, monitoring status (NORMAL / MODERATE ATTENTION / HIGH ATTENTION), detected factors, explanation, and suggested actions
4. **Health Action Center** — rest & recovery, activity, continuous monitoring, and mission protocol guidance
5. **NASA Data & Science** — official NASA resource links, data provenance, challenge context, project architecture, and about/team info

---

## Technology Stack

- **React 18** — UI framework
- **Vite** — build tool and dev server
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Recharts** — lightweight charting
- **Lucide React** — icons

No database, authentication, backend server, or external API keys required. The application runs as a self-contained frontend prototype with all data and analysis logic in the browser.

---

## NASA Data / Research Sources

AUREON is designed around NASA's space-life-science research and open-data ecosystem. The dashboard uses **simulated demonstration data** — NASA resources provide the scientific foundation, not the live dashboard values.

- [NASA Open Science Data Repository (OSDR)](https://osdr.nasa.gov/)
- [NASA OSDR Overview](https://science.nasa.gov/biological-physical/data/osdr/)
- [NASA Open Data](https://data.nasa.gov/)
- [NASA API Portal](https://api.nasa.gov/)
- [NASA Inspiration4 Mission Data](https://osdr.nasa.gov/bio/repo/data/missions/SpaceX%20Inspiration4)
- [NASA OSDR Cardiovascular Physiology (OS-766)](https://osdr.nasa.gov/bio/repo/data/experiments/OS-766)

---

## Data Provenance

| Source | Type |
|---|---|
| Current Dashboard | Simulated demonstration data |
| Scientific Foundation | NASA space-life-science research and open-data resources |
| Future Integration | Verified NASA datasets can be processed and mapped to monitoring indicators when compatible data are available |

---

## Important Simulated-Data Disclaimer

All values shown in this prototype are **simulated demonstration data** unless explicitly identified as a NASA source. The prototype does not claim a machine-learning model exists (none is implemented). It does not invent scientific findings or use fabricated NASA astronaut health measurements. The analysis uses transparent baseline-deviation logic only.

---

## How to Run

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
  components/    # Reusable UI (Layout, IndicatorCard, badges)
  pages/         # Page-level views (Dashboard, Trends, Analysis, Actions, Nasa)
  data/          # Simulated health data, baselines, NASA resources
  utils/         # Analysis logic, status helpers
  types/         # TypeScript types and interfaces
  App.tsx        # Root component with navigation
  main.tsx       # Entry point
```

---

## Future Improvements

- Integration with verified NASA OSDR datasets when compatible data are available
- Real-time telemetry ingestion from astronaut wearable sensors
- Expanded indicator set (radiation exposure, bone density, fluid shifts)
- Multi-crew comparative monitoring
- Offline-capable PWA for spacecraft network constraints
- Mission medical protocol integration

---

## License / Attribution

Built for the NASA Space Apps Challenge 2026. NASA resource links point to official public NASA websites. All simulated data is clearly labeled. No fabricated NASA data is presented.
