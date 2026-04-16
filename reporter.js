const ICON = { critical: 'CRITICAL', moderate: 'MODERATE', healthy: 'HEALTHY' };

function generateReport(processName, scoredSteps) {
  const critical = scoredSteps.filter(s => s.severity === 'critical');
  const moderate = scoredSteps.filter(s => s.severity === 'moderate');
  const totalMins = scoredSteps.reduce((a, s) => a + s.avg_duration_mins, 0);
  const critMins  = critical.reduce((a, s) => a + s.avg_duration_mins, 0);
  const delayShare = totalMins > 0 ? Math.round((critMins / totalMins) * 100) : 0;

  const lines = [
    `# Process Analysis Report: ${processName}`,
    `*Generated: ${new Date().toLocaleDateString('en-GB', { dateStyle: 'long' })}*`,
    '', '---', '',
    '## Executive Summary', '',
    `**${critical.length}** of **${scoredSteps.length}** steps are critical bottlenecks, ` +
    `accounting for ~**${delayShare}%** of total process duration.`,
    `**${moderate.length}** steps are moderate concerns.`,
    '', '---', '',
    '## Step Analysis', '',
    '| # | Step | Owner | Dur (min) | Error % | Handoffs | Auto % | BI | Status |',
    '|---|------|-------|-----------|---------|----------|--------|----|--------|',
    ...scoredSteps.map((s, i) =>
      `| ${i+1} | ${s.name} | ${s.owner} | ${s.avg_duration_mins} | ${s.error_rate_pct} | ${s.handoffs} | ${s.automation_pct} | **${s.bottleneck_index}** | ${ICON[s.severity]} |`
    ),
    '', '---', '', '## Priority Action Plan', '',
    ...critical.flatMap((s, i) => [
      `### ${i+1}. ${s.name} (BI: ${s.bottleneck_index})`,
      `- **Owner**: ${s.owner}`,
      `- **Signals**: ${s.error_rate_pct}% error rate, ${s.handoffs} handoffs, ${s.avg_duration_mins} min avg`,
      `- **Recommended**: Audit manual steps; target automation lift from ${s.automation_pct}% → 60%+; reduce handoffs`, '',
    ]),
    '---', '', '## BI Formula',
    '```', 'BI = 0.35×NormDuration + 0.30×NormErrorRate + 0.20×NormHandoffs + 0.15×(1−NormAutomation)', '```',
  ];
  return lines.join('\n');
}
module.exports = { generateReport };
