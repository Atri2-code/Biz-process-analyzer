function normalize(value, min, max) {
  if (max === min) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function scoreSteps(steps) {
  const durations   = steps.map(s => s.avg_duration_mins);
  const errors      = steps.map(s => s.error_rate_pct);
  const handoffs    = steps.map(s => s.handoffs);
  const automations = steps.map(s => s.automation_pct);
  const ranges = {
    duration:   { min: Math.min(...durations),   max: Math.max(...durations) },
    error:      { min: Math.min(...errors),       max: Math.max(...errors) },
    handoff:    { min: Math.min(...handoffs),     max: Math.max(...handoffs) },
    automation: { min: Math.min(...automations),  max: Math.max(...automations) },
  };
  return steps.map(step => {
    const nd = normalize(step.avg_duration_mins, ranges.duration.min,   ranges.duration.max);
    const ne = normalize(step.error_rate_pct,    ranges.error.min,      ranges.error.max);
    const nh = normalize(step.handoffs,          ranges.handoff.min,    ranges.handoff.max);
    const na = normalize(step.automation_pct,    ranges.automation.min, ranges.automation.max);
    const bi = Math.round((0.35*nd + 0.30*ne + 0.20*nh + 0.15*(1-na)) * 100);
    const severity = bi >= 65 ? 'critical' : bi >= 40 ? 'moderate' : 'healthy';
    return { ...step, bottleneck_index: bi, severity };
  }).sort((a, b) => b.bottleneck_index - a.bottleneck_index);
}
module.exports = { scoreSteps };
