import { restartGame } from './restartGame';
import { showNumberofClicks } from './showNumberOfClicks';
import type { Team } from './types';

export function FourTimesWin(
	cellId: string,
	teamColor: string,
	hitCounts: number | Record<string, number>,
	teams: Team[],
	numberOfClicks: string,
	currentTeamIndex: number,
	currentTeam: Team,
	color: string
) {
	showNumberofClicks(hitCounts, numberOfClicks);
	const confirmed = confirm(`Cell ${cellId} has been hit four times by ${teamColor} team!`);

	if (confirmed) {
		const confirmed2 = confirm(`Do you want to restart the game?`);

		if (confirmed2) {
			restartGame(teams, hitCounts, numberOfClicks, currentTeamIndex, currentTeam, color);
		}
	}
}
