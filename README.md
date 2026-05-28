# KanjiRef

An [Obsidian](https://obsidian.md) plugin that fills a note's `kanji` frontmatter property with wikilinks extracted from its filename.

## How it works

Run the command **"Fill kanji property from filename"** on any open note. The plugin reads the kanji characters in the file's basename, writes them as `[[wikilinks]]` into the `kanji` frontmatter property, and shows a notice with the count.

Example: a file named `日本語.md` gets:

```yaml
---
kanji:
  - "[[日]]"
  - "[[本]]"
  - "[[語]]"
---
```

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest [GitHub Release](../../releases).
2. Copy them into `<Vault>/.obsidian/plugins/kanjiref/`.
3. Reload Obsidian and enable **KanjiRef** under **Settings → Community plugins**.

## Development

```bash
npm install       # install dependencies
npm run dev       # watch mode — compiles src/main.ts → main.js on change
npm run build     # type-check + production bundle
npm run lint      # ESLint
```

Requires Node.js v16+.

## Releasing

1. Update `version` in `manifest.json` (and `minAppVersion` if needed).
2. Run `npm version patch|minor|major` to sync `package.json` and `versions.json`.
3. Create a GitHub Release tagged with the exact version number (no leading `v`).
4. Attach `main.js`, `manifest.json`, and `styles.css` as release assets.

## API docs

See [https://docs.obsidian.md](https://docs.obsidian.md).
