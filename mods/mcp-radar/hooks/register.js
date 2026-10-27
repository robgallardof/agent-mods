/** Read tool availability without exposing arguments, credentials or descriptions. */
export function formatTools(tools) {
  if (!Array.isArray(tools)) return 'MCP tool availability unknown';
  const names = tools.filter(tool => tool.mcp === true).map(tool => String(tool.name).replace(/[^a-zA-Z0-9_.:-]/g, '').slice(0, 100));
  return `${names.length} MCP tools available` + (names.length ? '\n' + names.slice(0, 100).join('\n') : '') + '\nAvailable tools do not prove every configured server is connected.';
}
export function register(on) {
  let tools;
  on('session.start', async ($, e, next) => {
    tools = undefined;
    await $.command.register({ name: 'radar', description: 'List available MCP tools without secrets or configuration contents' });
    try { tools = await $.tool.list(); } catch { tools = undefined; }
    return next(e);
  });
  on('turn.complete', async ($, e, next) => {
    try { tools = await $.tool.list(); } catch { tools = undefined; }
    $.ui.invalidate('ui.render');
    return next(e);
  });
  on('command.run', { command: 'radar' }, async $ => {
    try { tools = await $.tool.list(); } catch { tools = undefined; }
    return { text: formatTools(tools) };
  });
  on('ui.render', { component: 'Spinner' }, ($, e, next) => next({ ...e, props: { ...e.props, suffix: (e.props.suffix || '') + ' · ' + formatTools(tools).split('\n')[0] } }));
}
