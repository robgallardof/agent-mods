/** Git runs read-only, without a shell, in the current session directory. */
export function clean(value) {
  return String(value).replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '').replace(/[\x00-\x1f\x7f-\x9f\u202a-\u202e\u2066-\u2069]/g, '').slice(0, 100);
}
export function parseStatus(output) {
  let branch = 'unknown';
  let changed = 0;
  for (const line of output.split('\n')) {
    if (line.startsWith('# branch.head ')) branch = clean(line.slice(14));
    else if (/^[12u?] /.test(line)) changed++;
  }
  return `Git ${branch} · ${changed} changed entries`;
}
async function readGit($) {
      try {
        const result = await $.process.run(['git', '--no-optional-locks', '-c', 'core.fsmonitor=false', 'status', '--porcelain=v2', '--branch', '--untracked-files=normal'], { timeoutMs: 3000, env: { GIT_OPTIONAL_LOCKS: '0' } });
        return result.exitCode === 0 ? parseStatus(result.stdout) : 'Git unavailable in this directory';
      } catch { return 'Git unavailable (missing command or timed out)'; }
}
export function register(on) {
  let summary = 'Git not measured';
  on('session.start', async ($, e, next) => {
    summary = 'Git not measured';
    await $.command.register({ name: 'git-lens', description: 'Refresh and show the current Git branch and change count' });
    summary = await readGit($);
    return next(e);
  });
  on('turn.complete', async ($, e, next) => {
    // Never block forwarding a completed turn on a background timer.
    summary = await readGit($);
    $.ui.invalidate('ui.render');
    return next(e);
  });
  on('command.run', { command: 'git-lens' }, async $ => { summary = await readGit($); return { text: summary }; });
  on('ui.render', { component: 'Spinner' }, ($, e, next) => next({ ...e, props: { ...e.props, suffix: (e.props.suffix || '') + ' · ' + summary } }));
}
