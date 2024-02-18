import type { Achievements } from '../../interface/Achievements';

//! Requires 1024 played games
export function check_gold_requirements(
	total_games: number,
	achievements: Achievements[],
	gameId: string
) {
	if (total_games == 1024) {
		if (achievements) {
			const game_master = achievements.find((achievement) => achievement.title === 'Game Master');

			if (game_master?.history) {
				game_master.is_unlocked.gold_unlocked = true;
				game_master.history.gold_unlocked_date = new Date();
				game_master.history.gold_unlocked_game = gameId;
			}
		}
	}
}
