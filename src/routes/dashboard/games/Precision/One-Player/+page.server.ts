import { User_Model } from "$lib/server/models";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
  const email = event.cookies.get("email");

  const user = await User_Model.findOne({ "user.email": email });

  if (!user) {
    return { status: 400, error: new Error("User could not be found") };
  } else {
    const measurement_unit = user.user?.measurement_units;
    return { measurement_unit };
  }
};

export const actions: Actions = {
  get_add_highscore: async (event) => {
    const email = event.cookies.get("email");
    const data = await event.request.formData();
    const highscore = data.get("shots") as unknown as number;

    console.log(highscore);

    try {
      const user = await User_Model.findOne({ "user.email": email });

      if (!user) {
        return {
          status: 404,
          error: "User not found",
        };
      }

      const periods = ["daily", "weekly", "monthly", "yearly", "all_time"];

      if (user.one_player_precision_highscore) {
        const currentTime = new Date();

        for (const period of periods) {
          const highscoreData =
            user.one_player_precision_highscore[
              period as keyof typeof user.one_player_precision_highscore
            ];

          if (!highscoreData || !highscoreData.lastUpdated) {
            user.one_player_precision_highscore[
              period as keyof typeof user.one_player_precision_highscore
            ] = {
              value: highscore,
              lastUpdated: currentTime,
            };
          } else {
            const timeElapsed =
              currentTime.getTime() -
              new Date(highscoreData.lastUpdated).getTime();
            const timeThreshold = getTimeThreshold(period);

            if (
              highscoreData.value < highscore ||
              timeElapsed > timeThreshold
            ) {
              // Update highscore if the incoming highscore is greater
              user.one_player_precision_highscore[
                period as keyof typeof user.one_player_precision_highscore
              ] = {
                value: highscore,
                lastUpdated: currentTime,
              };
            } else {
              throw new Error(
                `The Highscore is smaller than the ${period} highscore`
              );
            }
          }
        }

        // Save the user after updating all highscores
        await user.save();
      }

      function getTimeThreshold(period: string): number {
        switch (period) {
          case "daily":
            return 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          case "weekly":
            return 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
          case "monthly":
            return 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds
          case "yearly":
            return 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds
          default:
            return 0;
        }
      }

      await user.save();
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        error: error,
      };
    }
  },
};
