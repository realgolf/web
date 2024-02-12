import type { Data, filteredGames } from './types';

export function applyFilters(
	searchTerm: string,
	filteredGames: filteredGames,
	data: Data,
	selectedTeam: string
) {
	console.log('Run');
	if (searchTerm !== '') {
		filteredGames = data.games.filter((game) => {
			if (game.name) {
				return (
					game.name.includes(searchTerm) ||
					new Date(game.date as string).toLocaleDateString().includes(searchTerm)
				);
			}
		});
	} else if (selectedTeam !== '') {
		filteredGames = data.games.filter((game) => game.teams === selectedTeam);
	} else {
		filteredGames = data.games;
	}

	console.log(filteredGames);

	return filteredGames;
}
