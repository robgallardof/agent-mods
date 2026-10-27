Choose one mod or combine the ones you need. First, try a local mod without installing anything:

```sh
git clone https://github.com/robgallardof/agent-mods.git
cd agent-mods
claude --plugin-dir ./mods/session-vitals
```

Type `/vitals` inside Claude Code. Context and cost also appear above the prompt. The other mods append compact information to the working spinner and offer a command you can run while idle. They do not create model turns.
