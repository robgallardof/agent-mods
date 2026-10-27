"""Author deterministic catalog metadata and README-builder inputs, without network access."""
import json
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
MODS = [
    ('session-vitals', 'vitals', 'Context tokens, window fill, session cost and time since this mod loaded.', 'Above the prompt'),
    ('quota-compass', 'quota', 'Reported account usage windows and their UTC reset timestamps.', 'Spinner'),
    ('git-lens', 'git-lens', 'Current branch and changed Git entries, including detached HEAD.', 'Spinner'),
    ('mcp-radar', 'radar', 'Available MCP tool names; refresh with /radar.', 'Spinner'),
    ('memory-map', 'memory-map', 'Character counts of memory sections observed after loading.', 'Spinner'),
    ('tool-pulse', 'pulse', 'Observed tool calls, active calls, failures and cumulative timing.', 'Spinner'),
]
(ROOT / '.claude-plugin').mkdir(exist_ok=True)
(ROOT / '.claude-plugin/marketplace.json').write_text(json.dumps({
    'name': 'agent-mods', 'owner': {'name': 'Roberto Gallardo'},
    'plugins': [{'name': name, 'source': f'./mods/{name}', 'description': desc, 'version': '0.1.0'} for name, command, desc, location in MODS]
}, indent=2) + '\n', encoding='utf-8')
for name, command, desc, location in MODS:
    (ROOT / f'mods/{name}/README.md').write_text(f'''# {name}

{desc} This is a native Claude Code mod, distributed through the plugin marketplace. It observes session data without making model requests or changing tool permissions. Requires Claude Code 2.1.287 or newer; validation and native tests currently run on 2.1.311.

## Try it

```sh
claude --plugin-dir ./mods/{name}
```

Inside Claude Code, use `/{command}`. The display appears in **{location.lower()}**. Statistics are limited to the current mod lifetime unless explicitly read from the host ledger. Unknown data stays unknown. No authentication files, tool arguments, memory contents, or telemetry are stored or transmitted.

## Install independently

```text
/plugin marketplace add robgallardof/agent-mods
/plugin install {name}@agent-mods
```

Enable, disable, or remove it with Claude Code's `/plugin` interface. Local `--plugin-dir` previews do not install the mod. See the repository's [compatibility and limits](../../docs/COMPATIBILITY.md) before relying on a measurement.
''', encoding='utf-8')
(ROOT / 'assets/brand').mkdir(parents=True, exist_ok=True)
logo = ROOT.parent / 'readme-builder/assets/brand/rg-logo.jpg'
if logo.exists():
    shutil.copyfile(logo, ROOT / 'assets/brand/rg-logo.jpg')

for language in ('en', 'es'):
    (ROOT / f'content/{language}').mkdir(parents=True, exist_ok=True)
catalog = '| Mod | Command | What you see | Display |\n| --- | --- | --- | --- |\n' + '\n'.join(f'| [{name}](mods/{name}) | `/{command}` | {desc} | {location} |' for name, command, desc, location in MODS)
sections = {
    'start': '''Choose one mod or combine the ones you need. First, try a local mod without installing anything:

```sh
git clone https://github.com/robgallardof/agent-mods.git
cd agent-mods
claude --plugin-dir ./mods/session-vitals
```

Type `/vitals` inside Claude Code. Context and cost also appear above the prompt. The other mods append compact information to the working spinner and offer a command you can run while idle. They do not create model turns.
''',
    'catalog': catalog + '\n\nStart with one or two spinner mods on a narrow terminal. Each preserves the existing spinner suffix; installing all of them can make that line long. All commands remain available without installing the other mods.\n',
    'install': '''Add the marketplace once, then select individual mods:

```text
/plugin marketplace add robgallardof/agent-mods
/plugin install session-vitals@agent-mods
/plugin install quota-compass@agent-mods
```

Repeat the second command with another catalog name. Use `/plugin` to disable or remove a mod. Follow the host's trust and scope prompts. This repository never edits user-wide agent settings for you.
''',
    'limits': '''**Native Claude Code mods.** Anthropic distributes them through the plugin system, but their implementation uses in-process function hooks and native UI. These packages are not MCP servers or shell statusline scripts.

Claude Code 2.1.287+ is the documented API baseline. This release is validated on Windows with Claude Code **2.1.311**. Native contract tests do not paint the real terminal. Codex and OpenCode compatibility is **not implemented**; DeepSeek is a model/provider, not a compatible native mods host.

Costs come from the host ledger and do not represent your subscription invoice. Quotas may be absent and their reset time is not a work-time guarantee. MCP tool availability does not certify every server's transport health. Memory counts describe observed prompt sections, not every configured file or stored memory. Tool timings can overlap.

No model requests, paid token-count requests, background polling, analytics, or secret/configuration reads. Only Git Lens starts a process: a bounded, read-only `git status` without a shell. See [compatibility and data boundaries](docs/COMPATIBILITY.md).
''',
    'develop': '''Requires Node.js 22+, Git, and the official Claude Code CLI. Mods themselves need no Node.js runtime, dependencies, bundler, or build step.

```sh
npm run check
npm test
npm run test:git\nnpm run test:install
```

The native test harness loads the real mod event chain with explicit host fixtures. The Git integration test creates and changes a real temporary repository. [Test status](docs/STATUS.md) records what ran; [research](docs/RESEARCH.md) records community needs and existing alternatives. Read [AGENTS.md](AGENTS.md) before contributing. Commit messages are in English.

READMEs use [readme-builder](https://github.com/robgallardof/readme-builder), local SVG assets and the shared RG signature. Rebuild with `python scripts/prepare-docs.py` followed by `readme-builder build readme.json --output .`.
'''
}
spanish = {
    'start': 'Elige los mods que quieras. Prueba primero uno de forma local:\n\n```sh\ngit clone https://github.com/robgallardof/agent-mods.git\ncd agent-mods\nclaude --plugin-dir ./mods/session-vitals\n```\n\nDentro de Claude Code escribe `/vitals`. Verás contexto y coste encima del prompt. Los otros mods añaden información al indicador de trabajo y ofrecen comandos para consultarla en reposo, sin iniciar turnos del modelo.\n',
    'catalog': catalog + '\n\nCada mod se instala por separado. En terminales estrechas empieza con uno o dos: sus textos se suman al indicador de trabajo.\n',
    'install': 'Agrega el catálogo y selecciona los mods que necesites:\n\n```text\n/plugin marketplace add robgallardof/agent-mods\n/plugin install session-vitals@agent-mods\n/plugin install quota-compass@agent-mods\n```\n\nCambia el nombre por otro del catálogo. Usa `/plugin` para desactivar o desinstalar. Respeta las preguntas de confianza y alcance del anfitrión; este proyecto no modifica tu configuración global.\n',
    'limits': '**Mods nativos de Claude Code.** Se distribuyen mediante plugins, pero usan funciones dentro del agente y su interfaz nativa. La API documentada requiere 2.1.287+; esta versión se comprueba en Windows con **2.1.311**. Codex y OpenCode no están implementados. DeepSeek es un modelo/proveedor, no un anfitrión compatible con estos mods.\n\nLos datos ausentes aparecen como desconocidos. El coste no es tu factura de suscripción; la fecha de reinicio de cuota no promete tiempo disponible. Herramientas MCP disponibles no equivalen a verificar todas las conexiones. La memoria muestra secciones observadas y sus caracteres, no todos los archivos configurados. Los tiempos de herramientas pueden solaparse.\n\nNo se hacen peticiones al modelo, conteos de tokens de pago, sondeos, telemetría ni lecturas de credenciales. Solo Git Lens ejecuta un proceso: Git de lectura, sin shell y con límite de tiempo. [Compatibilidad y límites](docs/COMPATIBILITY.md).\n',
    'develop': 'Para desarrollar necesitas Node.js 22+, Git y el CLI oficial de Claude Code. Los mods no necesitan Node.js, dependencias ni compilación para funcionar.\n\n```sh\nnpm run check\nnpm test\nnpm run test:git\nnpm run test:install\n```\n\nLas pruebas nativas cargan la cadena real de eventos con datos explícitos del anfitrión; la prueba de Git usa un repositorio temporal real. Consulta el [estado de pruebas](docs/STATUS.md), la [investigación](docs/RESEARCH.md) y [AGENTS.md](AGENTS.md). Los commits se escriben en inglés.\n\nLa presentación usa [readme-builder](https://github.com/robgallardof/readme-builder), SVG locales y la firma RG.\n'
}
for lang, contents in [('en', sections), ('es', spanish)]:
    for key, text in contents.items():
        (ROOT / f'content/{lang}/{key}.md').write_text(text, encoding='utf-8')
titles = {
    'en': ['See your session clearly', 'Choose your mods', 'Install only what you need', 'Know what the numbers mean', 'Build and verify'],
    'es': ['Entiende tu sesión', 'Elige tus mods', 'Instala solo lo que necesitas', 'Qué significan los datos', 'Desarrolla y comprueba']
}
documents = []
for lang in ('en', 'es'):
    documents.append({'file': 'README.md' if lang == 'en' else 'README.es.md', 'language': lang, 'label': 'English' if lang == 'en' else 'Español',
        'eyebrow': 'NATIVE CLAUDE CODE MODS', 'tagline': 'Your session, in view.' if lang == 'en' else 'Tu sesión, a la vista.',
        'features': [{'title': 'Choose', 'text': 'Six independently installable mods.', 'icon': 'layers'}, {'title': 'Observe', 'text': 'Native data. Honest limits. No model calls.', 'icon': 'shield'}, {'title': 'Understand', 'text': 'Context, cost, quotas, Git and tools.', 'icon': 'code'}],
        'sections': [{'id': key, 'title': title, 'icon': icon, 'source': f'content/{lang}/{key}.md', 'stage': stage} for key, title, icon, stage in zip(sections, titles[lang], ['rocket', 'layers', 'download', 'shield', 'code'], ['start', 'use', 'use', 'advanced', 'contribute'])]})
(ROOT / 'readme.json').write_text(json.dumps({'version': 1, 'name': 'agent-mods', 'theme': 'aurora', 'motion': 'subtle', 'branding': {'author': 'Roberto Gallardo', 'logo': 'assets/brand/rg-logo.jpg', 'profile': 'https://github.com/robgallardof'}, 'diagram_preference': 'archify', 'documents': documents}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
