import type { Team } from './types';

export function updatePointsDisplay(teams: Team[]) {
	const display = document.querySelector('#points_display');
	if (display) {
		display.innerHTML = teams.map((t) => `${t.color} team points: ${t.points}`).join('<br>');
	}

	return display?.innerHTML;
}
