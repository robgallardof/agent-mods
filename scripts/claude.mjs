/** Resolve native and npm-installed Windows hosts without invoking a shell shim. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

export function resolveClaude(pathValue = process.env.PATH || '') {
  if (process.platform !== 'win32') return 'claude';
  for (const entry of pathValue.split(';')) {
    const directory = entry.replace(/^"|"$/g, '');
    if (!directory) continue;
    for (const candidate of [join(directory, 'claude.exe'), join(directory, 'node_modules', '@anthropic-ai', 'claude-code', 'bin', 'claude.exe')]) {
      if (existsSync(candidate)) return candidate;
    }
  }
  throw Error('Claude Code native executable not found on PATH. Install the official Claude Code CLI.');
}

export function runClaude(args, options = {}) {
  return spawnSync(resolveClaude(), args, { ...options, shell: false });
}
