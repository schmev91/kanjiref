# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Obsidian community plugin (folder name: `kanjiref`). The plugin's actual purpose — kanji reference functionality — has not yet been implemented; the codebase is currently the Obsidian sample plugin boilerplate. `manifest.json` still uses the sample plugin's id/name/description and should be updated when building real features.

See `AGENTS.md` for detailed conventions on architecture, security, manifest rules, UX copy, and release process.

## Commands

```bash
npm install          # install dependencies
npm run dev          # watch mode — compiles src/main.ts → main.js on change
npm run build        # type-check + production bundle (minified, no sourcemaps)
npm run lint         # ESLint via eslint.config.mts
```

No test runner is configured. Testing is manual: copy `main.js`, `manifest.json`, and `styles.css` into `<Vault>/.obsidian/plugins/<plugin-id>/`, then reload Obsidian and enable the plugin under **Settings → Community plugins**.

## Architecture

- **Entry point**: `src/main.ts` — should stay minimal (lifecycle only: `onload`, `onunload`, `addCommand` calls). All feature logic belongs in separate modules.
- **Settings**: `src/settings.ts` exports the settings interface, defaults, and the settings tab class. Persist with `this.loadData()` / `this.saveData()`.
- **Build**: esbuild bundles everything into a single `main.js` at the repo root. `obsidian`, `electron`, and all `@codemirror/*` / `@lezer/*` packages are externals (provided by Obsidian at runtime).
- **Output format**: CommonJS (`format: "cjs"`), targeting ES2018.

Recommended source layout as the plugin grows:

```
src/
  main.ts        # lifecycle only
  settings.ts    # settings interface, defaults, tab
  commands/      # one file per command
  ui/            # modals, views, leaf types
  utils/         # pure helpers
  types.ts       # shared interfaces
```

## Key constraints

- Register all DOM events, workspace events, and intervals with `this.registerDomEvent`, `this.registerEvent`, and `this.registerInterval` so they are cleaned up on unload.
- Never commit `main.js` or `node_modules/` — they are gitignored.
- Release artifacts (uploaded to GitHub Releases): `main.js`, `manifest.json`, `styles.css`. Tag must exactly match `manifest.json`'s `version` with no leading `v`.
- Keep `manifest.json`'s `id` stable after first release.
