import { App, PluginSettingTab } from 'obsidian';
import KanjiRefPlugin from './main';

export interface KanjiRefSettings {
	// placeholder for future settings
}

export const DEFAULT_SETTINGS: KanjiRefSettings = {};

export class KanjiRefSettingTab extends PluginSettingTab {
	plugin: KanjiRefPlugin;

	constructor(app: App, plugin: KanjiRefPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();
	}
}
