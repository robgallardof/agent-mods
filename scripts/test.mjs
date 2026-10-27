/** Run every native mod test; never hide a failing child behind the last exit code. */
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
let failed = false;
for (const name of readdirSync(new URL('../mods/', import.meta.url))) {
  const result = spawnSync('claude', ['plugin', 'test', `mods/${name}`], { stdio: 'inherit', shell: false });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) failed = true;
}
process.exitCode = failed ? 1 : 0;
