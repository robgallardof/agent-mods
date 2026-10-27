/** Account windows are host readings, never inferred from session cost. */
export function formatQuota(usage) {
  const windows = usage?.rateLimits;
  if (!Array.isArray(windows) || !windows.length) return 'Quota unavailable: no account window reported';
  return windows.slice(0, 8).map(window => {
    const kind = String(window.kind).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
    const used = Number.isFinite(window.percentUsed) && window.percentUsed >= 0 ? `${window.percentUsed}% used` : 'usage unknown';
    const date = typeof window.resetsAt === 'string' ? new Date(window.resetsAt) : new Date(NaN);
    const reset = Number.isFinite(date.getTime()) ? date.toISOString() : 'unknown';
    return `${kind}: ${used}; resets ${reset}`;
  }).join('\n');
}
export function register(on) {
  let usage;
  on('session.start', async ($, e, next) => {
    usage = undefined;
    await $.command.register({ name: 'quota', description: 'Show reported account quota windows and UTC reset times' });
    return next(e);
  });
  on('session.measure', ($, e, next) => {
    usage = e;
    $.ui.invalidate('ui.render');
    return next(e);
  });
  on('command.run', { command: 'quota' }, async $ => {
    try { usage = await $.session.usage(); } catch { usage = undefined; }
    return { text: formatQuota(usage) + '\nReset timestamps are host readings, not a guarantee of remaining work time.' };
  });
  on('ui.render', { component: 'Spinner' }, ($, e, next) => next({ ...e, props: { ...e.props, suffix: (e.props.suffix || '') + ' · ' + formatQuota(usage).split('\n')[0] } }));
}
