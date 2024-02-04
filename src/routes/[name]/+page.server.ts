import { User_Model } from "$lib/server/models";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const param_name: string = event.params.name;

  const user = await User_Model.findOne({
    "user.username": { $regex: new RegExp(param_name, "i") },
  });
  const cookie_username = event.cookies.get("username");

  let sameUser: boolean;

  if (!user) {
    return { status: 404, error: "User could not be found" };
  }

  if (cookie_username === user.user?.username) {
    sameUser = true;
  } else {
    sameUser = false;
  }

  const user_name = user.user?.name;
  const user_username = user.user?.username;
  const user_registration_date = user.user?.registration_date;
  const user_last_login_date = user.user?.last_login_date;
  const user_handicap = user.user?.handicap;
  const user_one_player_precision_highscore =
    user.one_player_precision_highscore;
  const user_games = user.games;
  const user_bio = user.user?.bio;
  const total_games = user.total_games;

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

  const badges = user.user?.badges.map((badge) => {
    const badgeCopy = JSON.parse(JSON.stringify(badge));
    delete badgeCopy._id; // Remove the _id field
    return badgeCopy;
  });

  const achievements = user.achievements.map((achievement) => {
    const achievementCopy = JSON.parse(JSON.stringify(achievement));
    delete achievementCopy._id; // Remove the _id field
    return achievementCopy;
  });

  const socials = user.user?.socials.map((social) => {
    const socialCopy = JSON.parse(JSON.stringify(social));
    delete socialCopy._id;
    return socialCopy;
  });

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
    user_bio,
    sameUser,
    badges,
    achievements,
    total_games,
    socials,
  };
};

export const actions: Actions = {
  edit_profile: async (event) => {
    const email = event.cookies.get("email");
    const user = await User_Model.findOne({ "user.email": email });
    const data = await event.request.formData();
    const bio = data.get("bio") as string;
    const socials_input = data.get("socials") as string;
    const socials_input_cleaned = socials_input.replace(/\r/g, "");

    console.log(socials_input_cleaned);

    if (user?.user && socials_input_cleaned) {
      const socials = user.user?.socials;

      const socials_array = socials_input_cleaned
        .split("\n")
        .filter((social) => social.length > 0);

      socials_array.forEach((social) => {
        const [platform, link] = social.split(":");
        socials.push({ platform, link });
      });

      user.user.socials = socials_array;
      await user.save();
    }

    if (user?.user) {
      if (user.user.bio !== bio) {
        user.user.bio = bio;
      } else {
        return {
          status: 500,
          error: "The Bio didn't get modified!",
        };
      }
      await user.save();
    }
  },
};
