Add the marketplace once, then select individual mods:

```text
/plugin marketplace add robgallardof/agent-mods
/plugin install session-vitals@agent-mods
/plugin install quota-compass@agent-mods
```

Repeat the second command with another catalog name. Use `/plugin` to disable or remove a mod. Follow the host's trust and scope prompts. This repository never edits user-wide agent settings for you.

| Host | Status |
| --- | --- |
| Claude Code 2.1.311, Windows | Native validation, event contract tests and command probes run |
| Claude Code 2.1.311, Linux | Native validation, event contract tests and real Git integration pass in CI |
| Claude Code 2.1.287+ | Documented API baseline; versions older than 2.1.311 not run |
| Claude Code desktop / VS Code | Depends on the component; live paint not checked |
| Codex, OpenCode | No adapter: do not install these mods there |
| DeepSeek | A model provider does not supply the Claude Code mods runtime |

<!-- kit:compat-links -->
<!-- /kit:compat-links -->
