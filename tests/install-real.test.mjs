/** Exercise selective installation using isolated host config and a real local catalog. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runClaude } from '../scripts/claude.mjs';

test('native marketplace installs only the selected mod and uninstalls it', () => {
  const scratch = mkdtempSync(join(tmpdir(), 'agent-mods-install-'));
  const workspace = join(scratch, 'workspace');
  mkdirSync(workspace);
  const source = fileURLToPath(new URL('..', import.meta.url));
  const run = (...args) => {
    const result = runClaude(args, { cwd: workspace, env: { ...process.env, CLAUDE_CONFIG_DIR: join(scratch, 'config') }, encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.error?.message || result.stderr || result.stdout);
    return result.stdout;
  };
  try {
    run('plugin', 'marketplace', 'add', source, '--scope', 'project');
    run('plugin', 'install', 'session-vitals@agent-mods', '--scope', 'project');
    const settings = JSON.parse(readFileSync(join(workspace, '.claude', 'settings.json'), 'utf8'));
    assert.deepEqual(Object.keys(settings.enabledPlugins), ['session-vitals@agent-mods']);
    assert.equal(settings.enabledPlugins['session-vitals@agent-mods'], true);
    run('plugin', 'uninstall', 'session-vitals@agent-mods', '--scope', 'project');
    const after = JSON.parse(readFileSync(join(workspace, '.claude', 'settings.json'), 'utf8'));
    assert.notEqual(after.enabledPlugins?.['session-vitals@agent-mods'], true);
  } finally { rmSync(scratch, { recursive: true, force: true }); }
});
