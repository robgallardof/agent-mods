import { expect, test } from 'claude-code/testing';
import { formatQuota } from '../hooks/register.js';
test('missing quota is not unlimited or zero', () => {
  expect(formatQuota({ rateLimits: [] })).toContain('unavailable');
});
test('exceeded quota stays exceeded and invalid reset is unknown', () => {
  expect(formatQuota({ rateLimits: [{ kind: 'spend_limit', percentUsed: 125, resetsAt: 'bad' }] })).toContain('125% used; resets unknown');
});
test('native quota command reads reported windows', async ($, on) => {
  on('session.usage', () => ({ value: { context: { window: 200000 }, rateLimits: [{ kind: 'five_hour', percentUsed: 35, resetsAt: '2026-10-26T18:00:00Z' }] } }));
  const answer = await $.command.run({ command: 'quota', args: '' });
  expect(answer.text).toContain('35% used');
  expect(answer.text).toContain('2026-10-26T18:00:00.000Z');
});
