import { expect, test } from 'claude-code/testing';
test('spinner preserves the existing suffix and host word', async ($, on) => {
  on('ui.render', ($, e) => ({ type: 'Text', props: {}, children: [e.props.word + e.props.suffix] }));
  const ui = await $.ui.mount({ plugin: 'memory-map', surface: 'terminal', component: 'Spinner', props: { word: 'Working', message: '', suffix: ' prior-mod', mode: 'thinking' } as any });
  expect(await ui.find({ type: 'Text', text: /Working prior-mod/ })).toBeDefined();
  await ui.unmount();
});
