/**
 * Finds the winner among the given teams based on their points.
 * If there is a tie, the function returns 'Tie'.
 *
 * @param teams - An array of Team objects representing the teams.
 * @returns The color of the winning team or 'Tie' if there is a tie.
 */
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
