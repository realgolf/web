import { User_Model } from "$lib/server/models";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event: {
  params: { name: string };
}) => {
  const param_name: string = event.params.name;

  const user = await User_Model.findOne({
    "user.username": { $regex: new RegExp(param_name, "i") },
  });

  console.log(user);

  if (!user) {
    return { status: 404, error: "User could not be found" };
  }

  const user_name = user.user?.name;
  const user_username = user.user?.username;
  const user_registration_date = user.user?.registration_date;
  const user_last_login_date = user.user?.last_login_date;
  const user_handicap = user.user?.handicap;
  const user_one_player_precision_highscore =
    user.one_player_precision_highscore;
  const user_games = user.games;

  const user_daily = {
    value: user_one_player_precision_highscore?.daily?.value,
    lastUpdated: user_one_player_precision_highscore?.daily?.lastUpdated,
  };

  const user_weekly = {
    value: user_one_player_precision_highscore?.weekly?.value,
    lastUpdated: user_one_player_precision_highscore?.weekly?.lastUpdated,
  };

  const user_monthly = {
    value: user_one_player_precision_highscore?.monthly?.value,
    lastUpdated: user_one_player_precision_highscore?.monthly?.lastUpdated,
  };

  const user_yearly = {
    value: user_one_player_precision_highscore?.yearly?.value,
    lastUpdated: user_one_player_precision_highscore?.yearly?.lastUpdated,
  };

  const user_all_time = {
    value: user_one_player_precision_highscore?.all_time?.value,
    lastUpdated: user_one_player_precision_highscore?.all_time?.lastUpdated,
  };

  const games = user_games.map((game) => {
    const gameCopy = JSON.parse(JSON.stringify(game));
    delete gameCopy._id; // Remove the _id field
    return gameCopy;
  });

  console.log(user_username);

  return {
    user_name,
    user_username,
    user_registration_date,
    user_last_login_date,
    user_handicap,
    user_daily,
    user_weekly,
    user_monthly,
    user_yearly,
    user_all_time,
    games,
  };
};
