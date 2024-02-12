import { open_dialog } from '$lib/components/Global/Dialog.svelte';
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
	color: string,
	changeTeam: () => void
) {
	showNumberofClicks(hitCounts, numberOfClicks);

	open_dialog({
		text: `Cell ${cellId} has been hit four times by ${teamColor} team! </br> Do you want to restart the game?`,
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
