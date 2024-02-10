import type { Team } from './types';

export function updatePoints(teams: Team[]) {
	let points;
	teams.map((team) => {
		const storedData = localStorage.getItem(`exact_${teams.length}_teams`);
		const parsedData = storedData ? JSON.parse(storedData) : {};
		points = parsedData[team.color] ? parsedData[team.color].points : team.points;
		team.points = points;
	});

	return teams;
}
