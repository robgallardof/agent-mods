# Release status

2026-10-26 — initial native mod catalog, version 0.1.0.

## Shipped

Six independently installable native Claude Code mods: Session Vitals, Quota Compass, Git Lens, MCP Radar, Memory Map and Tool Pulse. A Git marketplace manifest, local preview instructions, English/Spanish READMEs generated with readme-builder, matching RG header/footer assets, source rules and research notes are included.

## Executed locally

Environment: Windows, Claude Code 2.1.311, Node.js 24.18.0, Python 3.14, real Git.

| Check | Result |
| --- | --- |
| `npm run check` | PASS: all 6 mods pass strict native manifest/module validation and catalog checks |
| `npm test` | PASS: 19 native tests across 11 files; explicit host fixtures, event forwarding and native UI tree validation |
| `npm run test:git` | PASS: 1 integration test with a real temporary Git repository, unborn/tracked/dirty/detached states |
| `npm run test:install` | PASS: actual native marketplace add, selective project installation and uninstall, using a temporary workspace and isolated host config |
| Individual native CLI command probes | PASS: `/vitals`, `/quota`, `/git-lens`, `/radar`, `/memory-map`, `/pulse`, each loaded by its own `--plugin-dir` |
| Parent-directory loading | PASS: `/vitals` with `--plugin-dir ./mods` loaded alongside the other catalog mods |
| README-builder audit and deterministic rebuild | PASS: 8 READMEs, 0 findings, 40 generated files with no drift |

CLI probes used empty strict MCP configuration, no settings sources, and no session persistence. They did not request model inference. The real host reported a 1,000,000-token window, absent context fill, a $0 session ledger, unavailable account windows, zero available MCP tools, an observed memory section and the actual Git branch. None of these empty-session readings is presented as proof of a paid account or live MCP transport integration.

Native validation reports a nonblocking missing listing icon advisory. These are Git-marketplace packages; no Anthropic directory submission or approval is claimed.

## Hosted CI

[Run 40454399178](https://github.com/robgallardof/agent-mods/actions/runs/40454399178) passed on Windows and Linux for commit `09c56aa`. Both jobs ran native validation, 19 native tests and the real Git integration test. The initial Windows run exposed an npm shim lookup issue; the scripts now resolve the native executable directly without a shell.

[Run 40454511058](https://github.com/robgallardof/agent-mods/actions/runs/40454511058) also passed on Windows and Linux for commit `a2e9f94`, including the new isolated installation/uninstallation integration test: **19 native tests plus 2 real integration tests per operating system**. All validation and test steps passed in both jobs.

## NOT EXECUTED

- Live terminal/Desktop/VS Code visual paint and interactive layout review. Native tests validate the returned element trees, not platform paint.
- Real subscription quota changes, billing reconciliation, network-backed MCP health checks or model inference.
- Other Claude Code versions, macOS, Codex or OpenCode integrations.

This repository changes no Rekora code or configuration. The Rekora Rust workspace checks do not apply to this separate JavaScript/native-mod project and were not rerun for this work.
