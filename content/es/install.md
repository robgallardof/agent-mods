Agrega el catálogo y selecciona los mods que necesites:

```text
/plugin marketplace add robgallardof/agent-mods
/plugin install session-vitals@agent-mods
/plugin install quota-compass@agent-mods
```

Cambia el nombre por otro del catálogo. Usa `/plugin` para desactivar o desinstalar. Respeta las preguntas de confianza y alcance del anfitrión; este proyecto no modifica tu configuración global.

| Anfitrión | Estado |
| --- | --- |
| Claude Code 2.1.311, Windows | Validación nativa, pruebas de contrato de eventos y pruebas de comandos ejecutadas |
| Claude Code 2.1.311, Linux | Validación nativa, pruebas de contrato e integración real con Git pasan en CI |
| Claude Code 2.1.287+ | Base documentada de la API; versiones anteriores a 2.1.311 sin probar |
| Claude Code escritorio / VS Code | Depende del componente; el dibujado en vivo no se revisó |
| Codex, OpenCode | Sin adaptador: no instales estos mods ahí |
| DeepSeek | Un proveedor de modelos no trae el runtime de mods de Claude Code |

<!-- kit:compat-links -->
<!-- /kit:compat-links -->
