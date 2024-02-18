import type { Achievements } from '../../interface/Achievements';

//! Requires 2 played games
export function check_first_unlock(
	total_games: number,
	achievements: Achievements[],
	user_name: string,
	gameId: string
) {
	if (total_games == 2) {
		achievements.push({
			title: 'Game Master',
			description: `${user_name} played games that have been saved`,
			first_unlocked: new Date(),
			is_unlocked: {
				bronze_unlocked: false,
				silver_unlocked: false,
				gold_unlocked: false,
				platinum_unlocked: false
			},
			history: {
				first_unlocked_date: new Date(),
				first_unlocked_game: gameId
			}
		});

		return achievements;
	} else {
		return '';
	}
}
