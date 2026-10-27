/** Exercise the production parser against a real Git repository, not canned status. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseStatus } from '../mods/git-lens/hooks/register.js';
test('actual Git status in an unborn branch and tracked dirty repository', () => {
  const dir = mkdtempSync(join(tmpdir(), 'agent-mods-git-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' } });
  try {
    git('init', '-b', 'codex/fixture');
    writeFileSync(join(dir, 'file.txt'), 'initial');
    assert.equal(parseStatus(git('status', '--porcelain=v2', '--branch')), 'Git codex/fixture · 1 changed entries');
    git('add', 'file.txt');
    git('-c', 'user.name=Agent Mods Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-m', 'Create test fixture');
    writeFileSync(join(dir, 'file.txt'), 'changed');
    assert.equal(parseStatus(git('status', '--porcelain=v2', '--branch')), 'Git codex/fixture · 1 changed entries');
    git('checkout', '--detach');
    assert.equal(parseStatus(git('status', '--porcelain=v2', '--branch')), 'Git (detached) · 1 changed entries');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
