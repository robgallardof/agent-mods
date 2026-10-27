/** Validate the native load surface, manifests and marketplace catalog. */
import { readFileSync, readdirSync } from 'node:fs';
import { runClaude } from './claude.mjs';
const catalog = JSON.parse(readFileSync('.claude-plugin/marketplace.json', 'utf8'));
let failed = false;
const dirs = readdirSync('mods');
if (catalog.plugins.length !== dirs.length || new Set(catalog.plugins.map(p => p.name)).size !== dirs.length) throw Error('Marketplace must list each mod exactly once');
for (const name of dirs) {
  if (!catalog.plugins.some(p => p.name === name && p.source === `./mods/${name}`)) throw Error(`Missing catalog source: ${name}`);
  const result = runClaude(['plugin', 'validate', `mods/${name}`, '--strict', '--json'], { encoding: 'utf8' });
  if (result.error) throw result.error;
  const report = JSON.parse(result.stdout);
  const blocking = report.directory?.findings?.filter(f => f.blocking) || [];
  console.log(`${name}: ${report.success && !blocking.length ? 'PASS' : 'FAIL'}`);
  if (!report.success || result.status !== 0 || blocking.length) { failed = true; console.error(result.stdout, result.stderr); }
}
process.exitCode = failed ? 1 : 0;
