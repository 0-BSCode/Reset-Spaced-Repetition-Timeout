import { Notice, TFile, TFolder, Vault } from "obsidian";

/**
 * Removes all of Spaced Repetition's flashcard timers to review all the cards again.
 */
export async function resetFlashcardTimers(vault: Vault, folderPath: string) {
    const folder = vault.getAbstractFileByPath(folderPath);

    new Notice(folder?.name || "Nothing");
    // Check if folder exists
    if (!(folder instanceof TFolder)) {
        throw new Error(`Folder not found at '${folderPath}'`);
    }

    // Loop through the folder's contents
    for (const child of folder.children) {
        if (child instanceof TFile) {
            // This is a file inside the folder
            console.log(`File in folder: ${child.name}`);

            // Read file content
            const content = await vault.read(child);
            const updatedContent = content.replace(/<!--SR:.*?-->/g, '');
            await vault.modify(child, updatedContent);
        }
    }


    // const files = vault.getFiles();

    // for (const file of files) {
    //     const content = await vault.read(file);
    //     const updatedContent = content.replace(/<!--SR:.*?-->/g, '');
    //     await vault.modify(file, updatedContent);
    // }

  }