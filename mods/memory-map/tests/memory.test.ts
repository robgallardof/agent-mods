import { expect, test } from 'claude-code/testing';
test('memory observation preserves the section and stores only character counts', async ($, on) => {
  on('prompt.section', ($, e) => ({ text: e.text }));
  const result = await $.prompt.section({ name: 'memory', text: 'private memory' });
  expect(result.text).toBe('private memory');
  const answer = await $.command.run({ command: 'memory-map', args: '' });
  expect(answer.text).toContain('memory: 14');
  expect(answer.text).not.toContain('private memory');
});
test('no observed sections does not imply no configured memory', async $ => {
  const answer = await $.command.run({ command: 'memory-map', args: '' });
  expect(answer.text).toContain('does not mean');
});
