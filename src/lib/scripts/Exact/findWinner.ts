import type { Team } from './types';

export function findWinner(teams: Team[]): string {
	let maxPoints = -Infinity;
	let winner = 'Tie';

	for (const team of teams) {
		if (team.points > maxPoints) {
			maxPoints = team.points;
			winner = team.color;
		} else if (team.points === maxPoints) {
			// Handle tie condition
			winner = 'Tie';
		}
	}

	return winner;
}
