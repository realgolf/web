import { resetGame } from './resetGame';
import type { Team } from './types';

export function checkWinner(
	teams: Team[],
	point: number,
	range: number,
	lower_range: number,
	upper_range: number,
	currentTeamIndex: number,
	color: string,
	currentTeam: Team,
	MetersToPlay: number
) {
	const teamsWithPoints = teams.filter((t) => t.points > 0);
	if (teamsWithPoints.length === 1) {
		const winner = teamsWithPoints[0].color;
		const confirmed = confirm(`The winner is Team ${winner}!`);

		if (confirmed) {
			resetGame(
				teams,
				point,
				range,
				lower_range,
				upper_range,
				currentTeamIndex,
				color,
				currentTeam,
				MetersToPlay
			);
		}
	}
}
