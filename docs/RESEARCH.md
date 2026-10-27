# Research notes: useful native agent mods

Research date: 2026-10-26. Community posts are qualitative requests and anecdotes, not verified measurements or proof of an API capability. Some recommendations are self-promotion. We do not claim these ideas are unique.

## Recurring needs and initial choices

| Need | Community reference | Initial response |
| --- | --- | --- |
| Session and weekly quota readings disappear or are hard to find | [Reddit: missing session/weekly usage](https://www.reddit.com/r/ClaudeCode/comments/1wrj6ka/usage_stopped_showing_the_session_and_weekly/) | Quota Compass reads native account windows, labels missing data and shows UTC reset timestamps. |
| One glance at context, cost and repository state | [Reddit: status line discussion](https://www.reddit.com/r/claude/comments/1x89kg4/rate_my_claude_status_line/) | Session Vitals and Git Lens; inspiration from statuslines, implemented using native mods. |
| Usage dashboards with clear limits on what is actually measured | [Reddit: project showcase](https://www.reddit.com/r/ClaudeCode/comments/1wg0ux6/weekly_showcase_thread_what_are_you_building_with/) | Avoid estimates disguised as account facts; expose source and refresh behavior. |
| Budget awareness before a session becomes expensive | [Reddit: usage estimation tool](https://www.reddit.com/r/ClaudeCode/comments/1s4el4m/i_built_a_tool_that_estimates_your_claude_code/) | Display actual host cost ledger first. Budget alerts are future work, not implemented. |
| Distinguish activity from useful progress | [Reddit: autonomous pipeline experience](https://www.reddit.com/r/ClaudeAI/comments/1x1cltw/i_ran_an_autonomous_coding_pipeline_for_two_weeks/) | Tool Pulse measures calls, timing and failures; it does not infer productivity or completion. |

MCP Radar and Memory Map address the requested visibility into available tools and memory loading. The native API can show tool availability and observed prompt sections. It does not justify claiming a complete MCP transport-health dashboard or an inventory of every memory file.

## Existing alternatives

- [What's Agent Doing](https://claude-mods.com/whats-agent-doing/) offers native activity visibility.
- [Agent Flow](https://www.claudemod.com/mods/agent-flow) explores native agent dashboards.
- [Native mod catalog](https://claudecodemods.dev/mods) and [Claude Mods](https://claudemods.chat/) contain existing choices worth comparing.
- [claude-config](https://github.com/aidan-nunn-sys/claude-config) includes another HUD approach.

The goal here is a small, independently selectable, inspectable catalog with explicit data boundaries and native tests. Existing dashboards are a reference, not code copied into this project. Compatibility and continued availability of third-party packages have not been tested.

## Primary implementation references

- [Mods overview and runtime requirements](https://code.claude.com/docs/en/plugins/mods/overview)
- [Creating a mod and local loading](https://code.claude.com/docs/en/plugins/mods/create)
- [Native test harness and its host fixtures](https://code.claude.com/docs/en/plugins/mods/test)
- [Mods API reference](https://code.claude.com/docs/en/plugins/mods/reference)
- [Official type declarations](https://github.com/anthropics/claude-code/blob/main/mods/types/claude-code.d.ts)

## Future ideas, not shipped features

User-configured budget alerts, a combined docked dashboard, explicit MCP health signals if the host exposes them, cache efficiency when source data is available, workspace switching, and a compatibility doctor. Native ports to other hosts require their own APIs and real integration tests; there is no automatic cross-host claim.
