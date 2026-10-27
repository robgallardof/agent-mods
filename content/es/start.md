Elige los mods que quieras. Prueba primero uno de forma local:

```sh
git clone https://github.com/robgallardof/agent-mods.git
cd agent-mods
claude --plugin-dir ./mods/session-vitals
```

Dentro de Claude Code escribe `/vitals`. Verás contexto y coste encima del prompt. Los otros mods añaden información al indicador de trabajo y ofrecen comandos para consultarla en reposo, sin iniciar turnos del modelo.

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/readme/diagrams/how-mods-work-es-dark.svg" /><img src="assets/readme/diagrams/how-mods-work-es-light.svg" alt="Cómo llega un mod a tu sesión: agregar el catálogo, instalar un mod, el host manda eventos, el mod muestra una vista compacta y un comando da la vista en pausa" width="100%" /></picture></p>
