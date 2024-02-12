import { fillLocalStorageAndRedirectUser } from './fillLocalStorageAndRedirectUser';
import { saveLocalStorageGameInDB } from './saveLocalStorageGameInDB';
import { showModal } from './showModal';

export function openGame(gameData: string, teams: string) {
	const local_storage_game = localStorage.getItem(teams);

	if (local_storage_game == null) {
		fillLocalStorageAndRedirectUser(teams, gameData);
	} else {
		showModal(
			'<b>Oops!</b> Looks like your Storage is full. <br> Do you want to delete it?',
			() => {
				// Yes button callback
				localStorage.removeItem(teams);
				fillLocalStorageAndRedirectUser(teams, gameData);
			},
			() => {
				// Save the Game in the Database button callback
				saveLocalStorageGameInDB(teams);
				setTimeout(() => {
					fillLocalStorageAndRedirectUser(teams, gameData);
				}, 100);
			},
			() => {
				// No button callback
				// No further action
			}
		);
	}
}
