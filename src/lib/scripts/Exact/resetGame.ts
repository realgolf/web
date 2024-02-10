import type { Team } from './types';
import { updatePointsDisplay } from './updatePointsDisplay';
import { updateTeamTurn } from './updateTeamTurn';

export function resetGame(
	teams: Team[],
	pointsByTeam: Record<string, any>,
	userInput: number,
	clickedCellsCount: number,
	currentTeamIndex: number,
	currentTeam: Team,
	color: string
) {
	localStorage.removeItem(`exact_${teams.length}_teams`);
	for (const team of teams) {
		team.data = [];
		team.points = 0;
		pointsByTeam[team.color].set(0); // Setzen Sie die Punkte für jedes Team auf 0 im Store
	}

	userInput = 20;
	clickedCellsCount = 0;
	currentTeamIndex = 0;
	currentTeam = teams[currentTeamIndex];
	color = currentTeam.color;

	const cells = document.querySelectorAll('.meters');
	cells.forEach((cell) => {
		(cell as HTMLElement).style.backgroundColor = '';
	});

	updatePointsDisplay(teams);
	updateTeamTurn(color);

	return { userInput, clickedCellsCount, currentTeamIndex, currentTeam, color, cells };
}
