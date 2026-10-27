import { expect, test } from 'claude-code/testing';
import { formatUsage } from '../hooks/register.js';

test('missing usage is unknown, never fabricated zero', () => {
  expect(formatUsage(undefined)).toContain('unknown');
  expect(formatUsage(undefined)).not.toContain('$0.0000');
});
test('native command reads the host ledger', async ($, on) => {
  on('session.usage', () => ({ value: { context: { tokens: 2500, window: 200000, percent: 1 }, rateLimits: [], cost: { usd: 0.125 } } }));
  const answer = await $.command.run({ command: 'vitals', args: '' });
  expect(answer.text).toContain('2,500');
  expect(answer.text).toContain('$0.1250');
});
test('terminal UI renders within narrow prompt width', async ($, on) => {
  on('ui.render', () => ({ type: 'Text', props: {}, children: [] }));
  const ui = await $.ui.mount({ plugin: 'session-vitals', surface: 'terminal', component: 'AbovePrompt', props: { hasSurvey: false, isWorking: false, maxRows: 2, bodyColumns: 30 } as any });
  const rows = await ui.findAll({ type: 'Text' });
  expect(rows.length).toBeGreaterThan(0);
  expect(rows[rows.length - 1].text.length).toBeLessThanOrEqual(30);
  await ui.unmount();
});
