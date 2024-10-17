import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { resetFlashcardTimers } from 'utils/resetFlashcardTimers';

interface PluginSettings {
	flashcardPath: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
	flashcardPath: '.',
}

export default class MyPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();
		const folder = this.settings.flashcardPath;

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('clock', 'Reset Flashcards', async (evt: MouseEvent) => {
			try {
				await resetFlashcardTimers(this.app.vault, folder);
				new Notice('Flashcards reset!');
			} catch (e) {
				new Notice(e);
			}
		});


		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'reset-flashcards',
			name: 'Reset Flashcards',
			callback: async () => {
				try {
					await resetFlashcardTimers(this.app.vault, folder);
					new Notice('Flashcards reset!');
				} catch (e) {
					new Notice(`Error resetting flashcards: ${e}`);
				}
			}
		});
		
		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Flashcards Path')
			.setDesc('Path to where your flashcards are stored')
			.addText(text => text
				.setPlaceholder('flashcards/')
				.setValue(this.plugin.settings.flashcardPath)
				.onChange(async (value) => {
					this.plugin.settings.flashcardPath = value;
					await this.plugin.saveSettings();
					new Notice('Settings saved');
					await this.plugin.onload();
				}));
	}
}
