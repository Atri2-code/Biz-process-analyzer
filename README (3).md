# biz-process-analyzer

> Diagnose business process inefficiencies and surface prioritised improvement actions — from a single CSV or JSON input.

Built as a portfolio piece for management consulting roles. Demonstrates structured problem-solving, data synthesis, and clear communication of insights.

---

## What it does

1. **Ingests** process data (step name, owner, avg duration, error rate, handoff count)
2. **Scores** each step against efficiency benchmarks using a composite bottleneck index
3. **Ranks** pain points by business impact
4. **Generates** a Markdown report with an executive summary, process map, and action plan

---

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/biz-process-analyzer.git
cd biz-process-analyzer
npm install
node src/analyze.js --input data/samples/onboarding.json --output reports/
```

---

## Input format

```json
{
  "process": "Client Onboarding",
  "steps": [
    {
      "id": "S01",
      "name": "Initial intake form",
      "owner": "Sales",
      "avg_duration_mins": 45,
      "error_rate_pct": 12,
      "handoffs": 2,
      "automation_pct": 20
    }
  ]
}
```

---

## Bottleneck Index formula

Each step is scored 0–100:

```
BI = 0.35 × NormDuration + 0.30 × NormErrorRate + 0.20 × NormHandoffs + 0.15 × (1 − NormAutomation)
```

Steps scoring > 65 are flagged as **critical**, 40–65 as **moderate**.

---

## Sample output (excerpt)

```
## Executive Summary
3 of 8 steps are critical bottlenecks, accounting for ~68% of total process delay.

## Top Actions
1. [S03] Contract review — automate redline detection (saves ~3.2 hrs/cycle)
2. [S05] Finance approval — reduce approval chain from 4 → 2 signatories
3. [S07] System provisioning — integrate SSO to cut manual steps
```

---

## Project structure

```
biz-process-analyzer/
├── src/
│   ├── analyze.js          # Main CLI entry point
│   ├── scorer.js           # Bottleneck Index logic
│   ├── reporter.js         # Markdown report generator
│   └── visualizer.js       # ASCII process map
├── data/
│   └── samples/
│       ├── onboarding.json
│       └── procurement.json
├── reports/                # Generated output (gitignored)
├── docs/
│   └── methodology.md      # Full scoring methodology
└── package.json
```

---

## Skills demonstrated

| Consulting competency | Implementation |
|---|---|
| Structured problem decomposition | Modular src/ architecture |
| Quantitative analysis | Weighted bottleneck scoring model |
| Stakeholder communication | Auto-generated exec summary |
| Process optimisation | Ranked action recommendations |
| Data-driven storytelling | Visual process map + severity tiers |

---

## Roadmap

- [ ] Excel/XLSX input support
- [ ] Web dashboard (Express + Chart.js)
- [ ] Benchmarking against industry averages (via public datasets)
- [ ] PDF report export

---

## License

MIT
