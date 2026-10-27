import { expect, test } from 'claude-code/testing';
import { formatTools } from '../hooks/register.js';
test('only MCP tool names are exposed', () => {
  const text = formatTools([{ name: 'Read', mcp: false, description: 'private' }, { name: 'mcp__demo__find', mcp: true, description: 'secret' }]);
  expect(text).toContain('1 MCP tools available');
  expect(text).not.toContain('secret');
  expect(text).not.toContain('private');
});
test('native tool list command distinguishes availability from connection health', async ($, on) => {
  on('tool.list', () => ({ value: [] }));
  const answer = await $.command.run({ command: 'radar', args: '' });
  expect(answer.text).toContain('0 MCP tools available');
  expect(answer.text).toContain('do not prove');
});
