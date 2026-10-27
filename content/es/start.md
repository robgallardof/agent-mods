Elige los mods que quieras. Prueba primero uno de forma local:

```sh
git clone https://github.com/robgallardof/agent-mods.git
cd agent-mods
claude --plugin-dir ./mods/session-vitals
```

Dentro de Claude Code escribe `/vitals`. Verás contexto y coste encima del prompt. Los otros mods añaden información al indicador de trabajo y ofrecen comandos para consultarla en reposo, sin iniciar turnos del modelo.
