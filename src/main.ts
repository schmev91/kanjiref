import { MarkdownView, Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, KanjiRefSettings, KanjiRefSettingTab } from './settings';
import { extractKanji } from './utils/kanji';

export default class KanjiRefPlugin extends Plugin {
	settings: KanjiRefSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new KanjiRefSettingTab(this.app, this));

		this.addCommand({
			id: 'fill-kanji-property',
			name: 'Fill kanji property from filename',
			checkCallback: (checking: boolean) => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!view) return false;
				if (!checking) {
					const file = view.file;
					if (!file) return;
					const kanji = extractKanji(file.basename);
					this.app.fileManager.processFrontMatter(file, (fm) => {
						fm['kanji'] = kanji.map(k => `[[${k}]]`);
					});
					new Notice(
						kanji.length
							? `Added ${kanji.length} kanji.`
							: 'No kanji found in filename.'
					);
				}
				return true;
			}
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<KanjiRefSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
