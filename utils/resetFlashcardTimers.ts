import { Vault } from "obsidian";

/**
 * Removes all of Spaced Repetition's flashcard timers to review all the cards again.
 */
export async function resetFlashcardTimers(vault: Vault, folderPath: string) {
    const files = vault.getFiles();

    for (const file of files) {
        const content = await vault.read(file);
        const updatedContent = content.replace(/<!--SR:.*?-->/g, '');
        await vault.modify(file, updatedContent);
    }

  }