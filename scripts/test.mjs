/** Run every native mod test; never hide a failing child behind the last exit code. */
import { readdirSync } from 'node:fs';
import { runClaude } from './claude.mjs';
let failed = false;
for (const name of readdirSync(new URL('../mods/', import.meta.url))) {
  const result = runClaude(['plugin', 'test', `mods/${name}`], { stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) failed = true;
}
process.exitCode = failed ? 1 : 0;
