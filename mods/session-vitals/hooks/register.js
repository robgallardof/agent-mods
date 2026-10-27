/** Native, read-only usage display. No polling or paid token-count requests. */
export function formatUsage(usage) {
  const number = value => Number.isFinite(value) && value >= 0 ? value.toLocaleString('en-US') : 'unknown';
  const context = usage?.context;
  const cost = usage?.cost?.usd;
  return `Context ${number(context?.tokens)} / ${number(context?.window)} tokens · ${number(context?.percent)}% used · session cost ${Number.isFinite(cost) && cost >= 0 ? '$' + cost.toFixed(4) : 'unknown'}`;
}

export function register(on) {
  let usage;
  let startedAt;
  on('session.start', async ($, e, next) => {
    usage = undefined;
    try { startedAt = await $.clock.now(); } catch { startedAt = undefined; }
    await $.command.register({ name: 'vitals', description: 'Show native context usage and session cost' });
    try { usage = await $.session.usage(); } catch { usage = undefined; }
    return next(e);
  });
  on('session.measure', ($, e, next) => {
    usage = e;
    $.ui.invalidate('ui.render');
    return next(e);
  });
  on('command.run', { command: 'vitals' }, async ($) => {
    try { usage = await $.session.usage(); } catch { usage = undefined; }
    let uptime = 'unknown';
    try { const now = await $.clock.now(); if (Number.isFinite(startedAt) && Number.isFinite(now)) uptime = Math.floor(Math.max(0, now - startedAt) / 1000) + ' seconds'; } catch { /* Preserve usage if the clock is unavailable. */ }
    return { text: formatUsage(usage) + '\nTime since mod loaded: ' + uptime + '\nHost cost ledger; this is not a subscription invoice.' };
  });
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey || e.props.maxRows < 1) return next(e);
    const { Box, Text } = $.ui.resolve(e);
    const existing = await next(e);
    // Preserve earlier bands instead of replacing another mod's interface.
    return Box({ flexDirection: 'column', children: [existing, Text({ children: formatUsage(usage).slice(0, Math.max(0, e.props.bodyColumns)) })] });
  });
}
