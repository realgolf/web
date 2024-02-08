import { restartGame } from './restartGame';
import type { Team, winCombination } from './types';

export function checkWin(
	winCombinations: winCombination[],
	currentTeam: Team,
	teams: Team[],
	hitCounts: Record<string, number>,
	numberOfClicks: string,
	color: string,
	currentTeamIndex: number
) {
	for (const combination of winCombinations) {
		const { cells } = combination;
		const teamData = currentTeam.data;
		let isWinningCombination = true;

		for (const cell of cells) {
			const { outerIndex, innerIndex } = cell;
			const cellId = `${outerIndex}-${innerIndex}`;

			if (!teamData.includes(cellId)) {
				isWinningCombination = false;
				break;
			}
		}

		if (isWinningCombination) {
			const confirmed = confirm(`Team ${currentTeam.color} wins! Do you want to restart the game?`);

			if (confirmed) {
				restartGame(teams, hitCounts, numberOfClicks, currentTeamIndex, currentTeam, color);
			}
		}
	}

	return false;
}
