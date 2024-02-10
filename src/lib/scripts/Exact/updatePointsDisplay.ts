import type { Team } from './types';

export function updatePointsDisplay(teams: Team[]) {
	const display = document.querySelector('#points_display');
	if (display) {
		const displayContent = teams
			.map((team) => {
				const storedData = localStorage.getItem(`exact_${teams.length}_teams`);
				const parsedData = storedData ? JSON.parse(storedData) : {};
				const points = parsedData[team.color] ? parsedData[team.color].points : team.points;
				return `${team.color} team points: ${points}`;
			})
			.join('<br>');
		display.innerHTML = displayContent;
	}

	return display?.innerHTML;
}
