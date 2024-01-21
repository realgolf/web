import type { User } from "./interface";
import type { Achievements } from "./interface/achievements";

export async function check_achievement(user: User, gameId: string) {
  const achievements = user.achievements;
  const total_games = user.total_games;
  const user_name = user.user.username;

  check_first_unlock(total_games, achievements, user_name, gameId);
  // check_bronze_requirements(total_games, achievements, user_name, gameId);

  user.achievements = achievements;

  console.log(user);
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
        bronze_unlocked_date: new Date(),
        bronze_unlocked_game: gameId,
      },
    });

    return achievements;
  } else {
    return "";
  }
}

// function check_bronze_requirements(
//   total_games: number,
//   achievements: Achievements[],
//   user_name: string,
//   gameId: string
// ) {
//   if (total_games == 16) {
//     achievements.push({
//       title: "Game Master",
//       description: `${user_name} played games that have been saved`,
//       first_unlocked: new Date(),
//       is_unlocked: {
//         bronze_unlocked: true,
//         silver_unlocked: false,
//         gold_unlocked: false,
//         platinum_unlocked: false,
//       },
//       history: {
//         bronze_unlocked_date: new Date(),
//         bronze_unlocked_game: gameId,
//       },
//     });

//     return achievements;
//   } else {
//     return "";
//   }
// }

// function check_silver_requirements(total_games: number, achievements: Achievements, user_name: string, gameId: string) {
//   if(total_games == 128) {

//   }
// }