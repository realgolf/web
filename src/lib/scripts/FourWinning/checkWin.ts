import { open_dialog } from '$lib/components/Global/Dialog.svelte';
import { restartGame } from './restartGame';
import type { Team, winCombination } from './types';

export function checkWin(
	winCombinations: winCombination[],
	currentTeam: Team,
	teams: Team[],
	hitCounts: Record<string, number>,
	numberOfClicks: string,
	color: string,
	currentTeamIndex: number,
	changeTeam: () => void
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
			open_dialog({
				text: `Team ${currentTeam.color} wins! Do you want to restart the game?`,
				modal: true,
				confirm: {
					text: 'Yes',
					action: () => {
						restartGame(
							teams,
							hitCounts,
							numberOfClicks,
							currentTeamIndex,
							currentTeam,
							color,
							changeTeam
						);
					}
				},
				cancel: {
					text: 'No',
					action: () => {}
				}
			});
		}
	}

	return false;
}
