# Scoring Methodology

## Bottleneck Index (BI)

The BI is a 0–100 composite score measuring how much a process step contributes to overall inefficiency.

### Components

| Weight | Dimension | Rationale |
|--------|-----------|-----------|
| 35% | Duration | Time is the most visible cost to clients and stakeholders |
| 30% | Error rate | Errors drive rework, delay, and reputational risk |
| 20% | Handoffs | Each handoff adds coordination overhead and drop-off risk |
| 15% | (1 − Automation) | Manual steps are the highest-effort, lowest-leverage work |

### Normalisation

Each dimension is min-max normalised within the current dataset so scores are relative to the process being analysed rather than fixed industry benchmarks. This ensures the tool is useful even for niche processes without public benchmarking data.

### Severity tiers

| BI Score | Tier | Recommended action |
|----------|------|-------------------|
| 65 – 100 | Critical | Immediate redesign or automation |
| 40 – 64  | Moderate | Monitor; schedule improvement sprint |
| 0 – 39   | Healthy | Document as best practice |

## Limitations

- Weights are configurable but default to the values above based on standard process-improvement frameworks (Lean, Six Sigma).
- The tool does not account for strategic importance of a step — a low-BI step might still warrant attention if it sits on the critical path.
