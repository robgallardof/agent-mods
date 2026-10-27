import { expect, test } from 'claude-code/testing';
import { clean, parseStatus } from '../hooks/register.js';
test('porcelain v2 handles detached branch, conflicts and untracked entries', () => {
  expect(parseStatus('# branch.head (detached)\nu conflict\n? new-file\n')).toBe('Git (detached) · 2 changed entries');
});
test('untrusted branch labels cannot inject terminal or bidi controls', () => {
  expect(clean('\x1b[31mfeature\u202ereverse\n')).toBe('featurereverse');
});
test('native process call uses a bounded read-only Git argument vector', async ($, on) => {
  on('process.run', ($, e) => {
    expect(e.argv[0]).toBe('git');
    expect(e.argv).toContain('--no-optional-locks');
    return { value: { exitCode: 0, stdout: '# branch.head codex/demo\n? a\n', stderr: '' } };
  });
  const answer = await $.command.run({ command: 'git-lens', args: '' });
  expect(answer.text).toBe('Git codex/demo · 1 changed entries');
});
