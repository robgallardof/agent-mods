Requires Node.js 22+, Git, and the official Claude Code CLI. Mods themselves need no Node.js runtime, dependencies, bundler, or build step.

```sh
npm run check
npm test
npm run test:git
```

The native test harness loads the real mod event chain with explicit host fixtures. The Git integration test creates and changes a real temporary repository. [Test status](docs/STATUS.md) records what ran; [research](docs/RESEARCH.md) records community needs and existing alternatives. Read [AGENTS.md](AGENTS.md) before contributing. Commit messages are in English.

READMEs use [readme-builder](https://github.com/robgallardof/readme-builder), local SVG assets and the shared RG signature. Rebuild with `python scripts/prepare-docs.py` followed by `readme-builder build readme.json --output .`.
