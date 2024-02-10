import { checkWinner } from './checkWinner';
import type { Team } from './types';

export function deductPoints(
	MetersToPlay: number,
	currentTeam: Team,
	changeTeam: () => void,
	teams: Team[],
	point: number,
	range: number,
	lower_range: number,
	upper_range: number,
	currentTeamIndex: number,
	color: string
) {
	const difference: number = MetersToPlay - currentTeam.distance;
	const pointsToDeduct = Math.abs(difference);
	currentTeam.points -= pointsToDeduct;
	changeTeam();
	checkWinner(
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

	return { difference, pointsToDeduct, currentTeam };
}
