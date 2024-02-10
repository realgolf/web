import type { Team } from './types';
import { updateTeamTurn } from './updateTeamTurn';

export function restartGame(
	teams: Team[],
	hitCounts: number | Record<string, number>,
	numberOfClicks: string,
	currentTeamIndex: number,
	currentTeam: Team,
	color: string,
	changeTeam: () => void
) {
	const input = document.getElementById('distance') as HTMLInputElement;

	if (input) {
		input.value = '';
	}

	localStorage.removeItem(`4winning_${teams.length}_teams`);

	teams.forEach((team) => {
		team.data = [];
	});

	const cells = document.querySelectorAll('.meters');
	cells.forEach((cell) => {
		(cell as HTMLElement).style.backgroundColor = '';
	});

	hitCounts = {};
	numberOfClicks = undefined as unknown as string;
	currentTeamIndex = 0;
	currentTeam = teams[currentTeamIndex];
	color = currentTeam.color;
	changeTeam();
	updateTeamTurn(color);

	return { hitCounts, numberOfClicks, currentTeamIndex, currentTeam, color };
}
