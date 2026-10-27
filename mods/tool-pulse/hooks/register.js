/** Observe calls and host elapsed time while preserving every result and error. */
export function register(on) {
  let calls = 0;
  let failed = 0;
  let active = 0;
  let elapsedMs = 0;
  let timed = 0;
  const summary = () => `Tools: ${calls} calls · ${active} active · ${failed} failed · ${timed ? Math.round(elapsedMs) + ' ms cumulative (' + timed + ' timed)' : 'timing unknown'}`;
  on('session.start', async ($, e, next) => {
    calls = failed = active = elapsedMs = 0;
    timed = 0;
    await $.command.register({ name: 'pulse', description: 'Show observed tool calls, failures and cumulative tool time' });
    return next(e);
  });
  on('tool.call', async ($, e, next) => {
    let start;
    try { start = await $.clock.now(); } catch { /* An absent clock must never stop a tool. */ }
    calls++;
    active++;
    $.ui.invalidate('ui.render');
    try {
      const answer = await next(e);
      if (answer.deny || answer.isError) failed++;
      return answer;
    } catch (error) { failed++; throw error; }
    finally {
      active--;
      try { const end = await $.clock.now(); if (Number.isFinite(start) && Number.isFinite(end)) { elapsedMs += Math.max(0, end - start); timed++; } } catch { /* Preserve original tool result. */ }
      $.ui.invalidate('ui.render');
    }
  });
  on('command.run', { command: 'pulse' }, () => ({ text: summary() + '\nCumulative tool time may overlap; it is not session wall time.' }));
  on('ui.render', { component: 'Spinner' }, ($, e, next) => next({ ...e, props: { ...e.props, suffix: (e.props.suffix || '') + ' · ' + summary() } }));
}
