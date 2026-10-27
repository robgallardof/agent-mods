**Native Claude Code mods.** Anthropic distributes them through the plugin system, but their implementation uses in-process function hooks and native UI. These packages are not MCP servers or shell statusline scripts.

Claude Code 2.1.287+ is the documented API baseline. This release is validated on Windows with Claude Code **2.1.311**. Native contract tests do not paint the real terminal. Codex and OpenCode compatibility is **not implemented**; DeepSeek is a model/provider, not a compatible native mods host.

Costs come from the host ledger and do not represent your subscription invoice. Quotas may be absent and their reset time is not a work-time guarantee. MCP tool availability does not certify every server's transport health. Memory counts describe observed prompt sections, not every configured file or stored memory. Tool timings can overlap.

No model requests, paid token-count requests, background polling, analytics, or secret/configuration reads. Only Git Lens starts a process: a bounded, read-only `git status` without a shell. See [compatibility and data boundaries](docs/COMPATIBILITY.md).
