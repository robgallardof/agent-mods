import { expect, test } from 'claude-code/testing';
test('tool results and errors pass through unchanged', async ($, on) => {
  let time = 0;
  on('clock.now', () => ({ value: time += 10 }));
  on('tool.call', () => ({ result: 'original', isError: true }));
  const result = await $.tool.call({ tool: 'Bash', command: 'example' });
  expect(result.result).toBe('original');
  expect(result.isError).toBe(true);
  const answer = await $.command.run({ command: 'pulse', args: '' });
  expect(answer.text).toContain('1 calls · 0 active · 1 failed · 10 ms');
});
