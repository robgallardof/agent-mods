# Compatibility and data boundaries

These packages implement the [official native Mods API](https://code.claude.com/docs/en/plugins/mods/overview). The plugin system supplies discovery, trust, installation and removal. There is no separate installer and no MCP server.

| Host | Status |
| --- | --- |
| Claude Code 2.1.311 on Windows | Native validation, event contract tests and command probes executed |
| Claude Code 2.1.311 on Linux | Native validation, event contract tests and real Git integration passed in CI |
| Claude Code 2.1.287+ | Documented API baseline; older versions than 2.1.311 NOT EXECUTED |
| Claude Code desktop / VS Code surfaces | Native UI availability depends on component; live paint NOT EXECUTED |
| Codex | No adapter implemented; do not install these as Codex plugins |
| OpenCode | No adapter implemented; do not install these as OpenCode plugins |
| DeepSeek | A model/provider does not supply Claude Code's mods runtime |

`session-vitals` uses AbovePrompt. The other mods preserve and append to the existing Spinner suffix. Their commands provide an idle view in the transcript. These are compact displays, not a full-screen dashboard. In narrow windows, select fewer spinner mods. No background timer runs; UI values refresh on host events or explicit commands. Quota reset times are absolute UTC to avoid a countdown freezing while idle.

| Mod | Source and refresh | Limits |
| --- | --- | --- |
| Session Vitals | `session.measure`, explicit `session.usage()`; host clock on start/command | Context tokens are current-window input, not total billed tokens. Uptime starts when the mod loads, including reloads, rather than original session creation. Missing values are unknown. |
| Quota Compass | Same native measurement and usage methods | Account windows may be absent. Values above 100 remain visible. Reset timestamps do not guarantee uninterrupted remaining time. |
| Git Lens | Read-only `git status --porcelain=v2 --branch` at start, completed turn, and explicit command | 3-second timeout; Git must exist. Untracked directories count as entries, not all nested files. Host output limit can truncate very large status. A branch changed outside the agent needs refresh. |
| MCP Radar | `tool.list()` at start, completed turn, and `/radar` | Lists tools currently available to the model, not all configured servers, transport states, or connection checks. Names only; no descriptions, arguments or secrets. If the host read fails, availability is unknown. |
| Memory Map | Final forwarded `prompt.section` answer for names containing memory/instruction | Keeps section name and character count, up to 64 section keys. Does not retain text. No historical/configured-memory inventory or claim that every memory file was loaded. |
| Tool Pulse | `tool.call`, native host clock | Preserves event, return value, denial and thrown error. Cumulative durations overlap for concurrent tools. Missing clock means timing unknown. Counters reset on reload/session start. |

No mod calls the model, sends prompts, changes permissions, reads settings/authentication stores, connects MCP transports, or transmits analytics. A native usage read does not request the paid `breakdown: full` operation. Git Lens alone invokes a child process through an explicit argument vector without a shell, disables optional locks and filesystem monitors, and never writes repository data.

## Tests and source review

The official `claude plugin test` harness loads the actual hooks. Tests explicitly supply host answers for usage, clocks and process output: those tests validate contracts, not real account usage. Separate Node integration tests use a real temporary Git repository and the actual native marketplace installer. Installation checks select one mod and remove it inside a disposable project with isolated host configuration. Noninteractive native command probes verify actual mod loading without requesting model inference. These checks do not replace visual review in a live terminal.

Validation is not approval by Anthropic's plugin directory. Marketplace publication here is a Git repository catalog; no directory submission is claimed. An organization can block mods with managed policy; follow the host's normal approval process.
