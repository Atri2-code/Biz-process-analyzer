#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');
const { scoreSteps }     = require('./scorer');
const { generateReport } = require('./reporter');

const inputPath = process.argv[2] || 'data/samples/onboarding.json';
const outputDir = process.argv[3] || 'reports/';

const raw    = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const scored = scoreSteps(raw.steps);
const report = generateReport(raw.process, scored);

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
const outFile = path.join(outputDir, `${raw.process.replace(/\s+/g,'_').toLowerCase()}_report.md`);
fs.writeFileSync(outFile, report);

console.log(`\nbiz-process-analyzer`);
console.log(`${'─'.repeat(36)}`);
console.log(`Steps: ${scored.length} | Critical: ${scored.filter(s=>s.severity==='critical').length} | Moderate: ${scored.filter(s=>s.severity==='moderate').length} | Healthy: ${scored.filter(s=>s.severity==='healthy').length}`);
console.log(`\nTop bottlenecks:`);
scored.slice(0,3).forEach((s,i) => console.log(`  ${i+1}. [${s.id}] ${s.name} — BI: ${s.bottleneck_index} (${s.severity})`));
console.log(`\nReport saved → ${outFile}\n`);
