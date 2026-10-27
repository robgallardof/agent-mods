# Working on Agent Mods

These are native Claude Code mods. The plugin marketplace is their distribution mechanism. Do not replace them with MCP servers, shell statusline scripts, prompts, or ordinary hook executables.

- Keep every mod self-contained under `mods/<name>` and independently installable.
- Use the official Mods API and validate against the installed host. Never claim compatibility with another agent because its model name is similar.
- Observe session, prompt and tool events without changing their inputs, permissions, outputs, or errors. Never invoke a model or read authentication/configuration secrets.
- Missing host statistics remain unknown. Label estimates, reset timestamps, observed metadata and available tools accurately.
- No background polling. Read-only Git uses an argument vector, timeout, and optional locks disabled.
- Run `npm run check`, `npm test`, `npm run test:git`, and `npm run test:install`. Native host fixtures verify contracts; they do not prove live account data, connected MCP transport health, or visual rendering in a real terminal. Installer tests must use isolated host configuration and a disposable workspace.
- Keep test evidence in `docs/STATUS.md`. Unrun checks are `NOT EXECUTED`.
- All commits must be in English. No co-author trailers.
