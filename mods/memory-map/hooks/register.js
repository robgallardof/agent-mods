/** Observe section metadata only; never retain or rewrite the memory text. */
export function register(on) {
  let sections = new Map();
  on('session.start', async ($, e, next) => {
    sections = new Map();
    await $.command.register({ name: 'memory-map', description: 'Show metadata of observed memory prompt sections' });
    return next(e);
  });
  on('prompt.section', async ($, e, next) => {
    const answer = await next(e);
    if (/memory|instruction/i.test(e.name)) {
      // Measure the final forwarded section, including another mod's changes.
      if (typeof answer.text === 'string' && (sections.has(e.name) || sections.size < 64)) sections.set(e.name, answer.text.length);
      else sections.delete(e.name);
      $.ui.invalidate('ui.render');
    }
    return answer;
  });
  on('command.run', { command: 'memory-map' }, () => ({ text: sections.size
    ? 'Observed memory sections (characters, not tokens):\n' + [...sections].slice(0, 50).map(([name, length]) => `${name.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80)}: ${length}`).join('\n')
    : 'No memory sections observed since this mod loaded. This does not mean no memory is configured.' }));
  on('ui.render', { component: 'Spinner' }, ($, e, next) => next({ ...e, props: { ...e.props, suffix: (e.props.suffix || '') + ` · memory sections observed: ${sections.size}` } }));
}
