import { generateRandomNumber } from './generateRandomNumber';
import type { Team } from './types';

export function resetGame(
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
	for (const team of teams) {
		team.points = point;
	}

	range = 150;
	currentTeamIndex = 0;
	color = teams[currentTeamIndex].color;
	currentTeam = teams[currentTeamIndex];
	MetersToPlay = generateRandomNumber(range, lower_range, upper_range);

	return { range, currentTeamIndex, color, currentTeam, MetersToPlay };
}
