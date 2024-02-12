import { open_dialog } from '$lib/components/Global/Dialog.svelte';
import { fillLocalStorageAndRedirectUser } from './fillLocalStorageAndRedirectUser';
import { saveLocalStorageGameInDB } from './saveLocalStorageGameInDB';

export function openGame(gameData: string, teams: string) {
	const local_storage_game = localStorage.getItem(teams);

	if (local_storage_game == null) {
		fillLocalStorageAndRedirectUser(teams, gameData);
	} else {
		open_dialog({
			text: 'Your storage is full. You have to decide.',
			modal: true,
			confirm: {
				text: 'Delete unsaved game?',
				action: () => {
					localStorage.removeItem(teams);
					fillLocalStorageAndRedirectUser(teams, gameData);
				}
			},
			save: {
				text: 'Save in Database',
				action: async () => {
					saveLocalStorageGameInDB(teams);
					setTimeout(() => {
						fillLocalStorageAndRedirectUser(teams, gameData);
					}, 100);
				}
			},
			cancel: {
				text: 'Stay here.',
				action: () => {}
			}
		});
	}
}
