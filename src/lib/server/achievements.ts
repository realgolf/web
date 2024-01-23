import type { User } from "./interface";
import type { Achievements } from "./interface/Achievements";

export async function check_achievement(user: User, gameId: string) {
  const achievements = user.achievements;
  const total_games = user.total_games;
  const user_name = user.user.username;

  check_first_unlock(total_games, achievements, user_name, gameId);
  check_bronze_requirements(total_games, achievements, gameId);

  user.achievements = achievements;
}

function check_first_unlock(
  total_games: number,
  achievements: Achievements[],
  user_name: string,
  gameId: string
) {
  if (total_games == 2) {
    achievements.push({
      title: "Game Master",
      description: `${user_name} played games that have been saved`,
      first_unlocked: new Date(),
      is_unlocked: {
        bronze_unlocked: false,
        silver_unlocked: false,
        gold_unlocked: false,
        platinum_unlocked: false,
      },
      history: {
        first_unlocked_date: new Date(),
        first_unlocked_game: gameId,
      },
    });

    return achievements;
  } else {
    return "";
  }
}

function check_bronze_requirements(
  total_games: number,
  achievements: Achievements[],
  gameId: string
) {
  if (total_games == 16) {
    if (achievements) {
      const game_master = achievements.find(
        (achievement) => achievement.title === "Game Master"
      );

      if (game_master?.history) {
        game_master.is_unlocked.bronze_unlocked = true;
        game_master.history.bronze_unlocked_date = new Date();
        game_master.history.bronze_unlocked_game = gameId;
      }
    }
  }
}
