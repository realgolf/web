import { redirect } from './redirect';

export function fillLocalStorageAndRedirectUser(teams: string, gameData: string) {
	localStorage.setItem(teams, gameData);
	if (teams == '4winning_2_teams') {
		redirect('/dashboard/games/4Winning/Two-Players');
	} else if (teams == '4winning_3_teams') {
		redirect('/dashboard/games/4Winning/Three-Players');
	} else if (teams == '4winning_4_teams') {
		redirect('/dashboard/games/4Winning/Four-Players');
	} else if (teams == 'exact_2_teams') {
		redirect('/dashboard/games/Exact/Two-Players');
	} else if (teams == 'exact_3_teams') {
		redirect('/dashboard/games/Exact/Three-Players');
	} else if (teams == 'exact_4_teams') {
		redirect('/dashboard/games/Exact/Four-Players');
	}
}
