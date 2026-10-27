# session-vitals

Context tokens, window fill, session cost and time since this mod loaded. This is a native Claude Code mod, distributed through the plugin marketplace. It observes session data without making model requests or changing tool permissions. Requires Claude Code 2.1.287 or newer; validation and native tests currently run on 2.1.311.

## Try it

```sh
claude --plugin-dir ./mods/session-vitals
```

Inside Claude Code, use `/vitals`. The display appears in **above the prompt**. Statistics are limited to the current mod lifetime unless explicitly read from the host ledger. Unknown data stays unknown. No authentication files, tool arguments, memory contents, or telemetry are stored or transmitted.

## Install independently

```text
/plugin marketplace add robgallardof/agent-mods
/plugin install session-vitals@agent-mods
```

Enable, disable, or remove it with Claude Code's `/plugin` interface. Local `--plugin-dir` previews do not install the mod. See the repository's [compatibility and limits](../../docs/COMPATIBILITY.md) before relying on a measurement.
